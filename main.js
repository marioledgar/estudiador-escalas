const DATA_KEY = "estudiador_datos";
const SETTINGS_KEY = "estudiador_settings";
const HISTORY_KEY = "estudiador_historial";

let datos;
let settings;
let historial;

// FILE HANDLING
async function fetchJSON(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        return null;
    }
}

async function loadSettings() {
    const localSettings = localStorage.getItem(SETTINGS_KEY);
    if (localSettings) {
        try {
            return JSON.parse(localSettings);
        } catch (e) {
            console.error("Error parsing local settings:", e);
        }
    }

    // Default if not in localStorage
    let settings = await fetchJSON('settings_default.json');
    if (!settings) {
        settings = { "idioma": "spanish", "velocidades": "discretas" };
    }
    saveSettings(settings);
    return settings;
}

function saveSettings(newSettings) {
    settings = newSettings;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

async function loadData() {
    const localData = localStorage.getItem(DATA_KEY);
    if (localData) {
        try {
            return JSON.parse(localData);
        } catch (e) {
            console.error("Error parsing local data:", e);
        }
    }

    const template = await fetchJSON('data_template.json');
    if (template) {
        saveData(template);
    }
    return template;
}

function saveData(newData) {
    datos = newData;
    localStorage.setItem(DATA_KEY, JSON.stringify(datos));
}

function loadHistorial() {
    const localHistory = localStorage.getItem(HISTORY_KEY);
    if (localHistory) {
        try {
            return JSON.parse(localHistory);
        } catch (e) {
            console.error("Error parsing local history:", e);
        }
    }
    return [];
}

function saveHistorial(newHistory) {
    historial = newHistory;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historial));
}

function agregarAlHistorial(tonalidad, apartado, ejecucion) {
    const stats = datos[tonalidad].apartados[apartado][1];
    const nuevoEvento = {
        fecha: new Date().toISOString().split('T')[0],
        tonalidad: tonalidad,
        apartado: apartado,
        velocidad: stats.v,
        dificultad: stats.d,
        ejecucion: ejecucion
    };
    historial.push(nuevoEvento);
    saveHistorial(historial);
}

async function restaurarValores() {
    if (confirm("¿Estás seguro de que deseas restaurar los valores predeterminados? Se perderá todo el progreso.")) {
        localStorage.removeItem(DATA_KEY);
        localStorage.removeItem(SETTINGS_KEY);
        localStorage.removeItem(HISTORY_KEY);

        const template = await fetchJSON('data_template.json');
        if (template) {
            saveData(template);
            alert("Valores restaurados correctamente.");
            location.reload();
        } else {
            alert("Error al cargar la plantilla de datos.");
        }
    }
}

window.exportarDatos = function () {
    const backup = {
        datos: JSON.parse(localStorage.getItem(DATA_KEY)),
        settings: JSON.parse(localStorage.getItem(SETTINGS_KEY)),
        historial: JSON.parse(localStorage.getItem(HISTORY_KEY))
    };
    const blob = new Blob([JSON.stringify(backup, null, 4)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup_estudiador_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

window.importarDatos = function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const backup = JSON.parse(event.target.result);
                if (backup.datos) localStorage.setItem(DATA_KEY, JSON.stringify(backup.datos));
                if (backup.settings) localStorage.setItem(SETTINGS_KEY, JSON.stringify(backup.settings));
                if (backup.historial) localStorage.setItem(HISTORY_KEY, JSON.stringify(backup.historial));
                alert("Datos importados correctamente. La página se recargará.");
                location.reload();
            } catch (err) {
                alert("Error al importar el archivo: " + err.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}
//fin file handling

// algunas constantes
const velocidadesDiscretas = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144];
const simbolos = { "ninguna": "b/#", "bemol": "b", "sostenidos": "#" };
// fin de constantes

//cambiar velocidad
function cambiarVelocidad(tonalidad, apartado, aumentar = true) {
    let v = datos[tonalidad].apartados[apartado][1].v;
    if (aumentar) {
        if (v < 144) {
            if (settings.velocidades === 'discretas') {
                if (!velocidadesDiscretas.includes(v)) {
                    v = velocidadesDiscretas.find(x => x >= v);
                } else {
                    v = velocidadesDiscretas[velocidadesDiscretas.indexOf(v) + 1];
                }
            } else { v++; }
        }
    } else {
        if (v > 30) {
            if (settings.velocidades === 'discretas') {
                if (!velocidadesDiscretas.includes(v)) {
                    v = velocidadesDiscretas.findLast(x => x <= v);
                } else {
                    v = velocidadesDiscretas[velocidadesDiscretas.indexOf(v) - 1];
                }
            } else { v--; }
        }
    }
    datos[tonalidad].apartados[apartado][1].v = v;
}
//fin cambiar velocidad

async function main() {
    const inputElement = document.getElementById("cantidad_hoy");
    const cantidad_hoy = inputElement ? parseInt(inputElement.value) : 3;

    settings = await loadSettings();
    datos = await loadData();
    historial = loadHistorial();

    if (!datos) {
        alert("No se pudieron cargar los datos.");
        return;
    }

    ejecutarSesion(cantidad_hoy);
}