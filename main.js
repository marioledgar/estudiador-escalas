const DATA_KEY = "estudiador_datos";
const SETTINGS_KEY = "estudiador_settings";
const HISTORY_KEY = "estudiador_historial";

let datos;
let settings;
let historial;
let tonalidades;
let cantidadHoy;

// función importante
function pickRandom(array, n) {
    const copy = [...array];
    const result = [];
    for (let i = 0; i < n && copy.length > 0; i++) {
        const index = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(index, 1)[0]);
    }
    return result;
}
//

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

function elegirEscalas() {
    // TODO: añadir un user prompt para confirmar si quiere tocar demasiadas escalas (y tendría q repetir algunas)
    let escalasHoy = [];
    let resto = cantidadHoy;
    while (tonalidades.length < resto) {
        resto -= tonalidades.length;
        escalasHoy.push(...tonalidades);
    }
    let mitadAntigua = Math.floor(resto / 2);
    let mitadAleatoria = resto - mitadAntigua;
    const ordenadas = Object.keys(datos).sort((a, b) => datos[b].dias_sin_tocarla - datos[a].dias_sin_tocarla);
    const antiguas = ordenadas.slice(0, mitadAntigua);
    escalasHoy.push(...antiguas);
    const disponiblesAzar = ordenadas.filter(x => !antiguas.includes(x));
    escalasHoy.push(...pickRandom(disponiblesAzar, mitadAleatoria));
    escalasHoy.sort(() => Math.random() - 0.5);
    return escalasHoy;
}

function tocarApartado(tonalidad, apartado) {
    const v = datos[tonalidad].apartados[apartado][1].v;
    document.body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 50px;">
            <h2>Toca ${apartado} en ${tonalidad} a ${v} BPM</h2>
            <form id="formEjecucion" style="display: flex; flex-direction: column; gap: 10px;">
                <label><input type="radio" name="ejecucion" value="mal"> Mal</label>
                <label><input type="radio" name="ejecucion" value="regular"> Regular</label>
                <label><input type="radio" name="ejecucion" value="bien"> Bien</label>
                <label><input type="radio" name="ejecucion" value="perfecto"> Perfecto</label>
                <button type="button" onclick="siguienteApartado()" style="margin-top: 20px; padding: 10px;">Siguiente</button>
            </form>
        </div>
    `;
}

function ejecutarSesion(cantidad) {

}

function pantallaPreguntarCantidad() {
    document.getElementById("pantalla-inicial").remove();
    document.body.innerHTML = `
    <div><form style="display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 50px;">
        <label style="font-size: 20pt;">¿Cuántas escalas quieres tocar?</label>
        <input type="number" name="cantidadHoy" id="cantidadHoy" style="font-size: 20pt; width: 100px; text-align: center;">
        <input type="button" value="Empezar" onclick="tocar()" style="padding: 10px 40px; font-size: 15pt; cursor: pointer;">
    </form></div>
    `;
}

async function tocar() {
    const inputElement = document.getElementById("cantidadHoy");
    cantidadHoy = inputElement ? parseInt(inputElement.value) : 3;

    settings = await loadSettings();
    datos = await loadData();
    if (!datos) {
        alert("No se pudieron cargar los datos.");
        return;
    }
    historial = loadHistorial();

    tonalidades = Object.keys(datos);
    elegirEscalas();
}

function pantallaInicial() {
    document.body.innerHTML = `
    <div id="pantalla-inicial" style="display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 50px;">
        <button onclick="pantallaPreguntarCantidad()" type="button"
            style="height: 150px; width: 300px; font-size: 40pt; cursor: pointer;">Tocar</button>
        <div style="display: flex; gap: 10px;">
            <button onclick="restaurarValores()" style="padding: 10px; cursor: pointer;">Restaurar valores
                predeterminados</button>
            <button onclick="exportarDatos()" style="padding: 10px; cursor: pointer;">Exportar datos (JSON)</button>
            <button onclick="importarDatos()" style="padding: 10px; cursor: pointer;">Importar datos (JSON)</button>
        </div>
    </div>
    `;
}