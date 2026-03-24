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
window.exportarDatos = function() {
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

window.importarDatos = function() {
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


// algunas constantes
const tonalidades = ['alteraciones0', 'sostenido1', 'bemol1', 'sostenido2', 'bemol2', 'sostenido3', 'bemol3', 'sostenido4', 'bemol4', 'sostenido5', 'bemol5', 'sostenido6', 'bemol6', 'sostenido7', 'bemol7'];
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

let escalasSesionOriginal = [];

function ejecutarSesion(cantidad_hoy) {
    if (isNaN(cantidad_hoy) || cantidad_hoy <= 0) cantidad_hoy = 3;

    const tonalidadesKeys = Object.keys(datos);
    // Ordenar por días sin tocarla (descendente)
    const ordenadas = [...tonalidadesKeys].sort((a, b) => {
        return (datos[b].dias_sin_tocarla || 0) - (datos[a].dias_sin_tocarla || 0);
    });

    const mitadAntigua = Math.floor(cantidad_hoy / 2);
    const mitadAleatoria = cantidad_hoy - mitadAntigua;

    const antiguas = ordenadas.slice(0, mitadAntigua);
    const disponiblesAzar = ordenadas.slice(mitadAntigua);

    // Shuffle disponiblesAzar
    for (let i = disponiblesAzar.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [disponiblesAzar[i], disponiblesAzar[j]] = [disponiblesAzar[j], disponiblesAzar[i]];
    }

    const aleatorias = disponiblesAzar.slice(0, mitadAleatoria);
    let escalasHoy = antiguas.concat(aleatorias);

    // Shuffle escalasHoy
    for (let i = escalasHoy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [escalasHoy[i], escalasHoy[j]] = [escalasHoy[j], escalasHoy[i]];
    }

    escalasSesionOriginal = [...escalasHoy];
    console.log("Escalas para hoy:", escalasHoy);
    iniciarEstudio(escalasHoy);
}

let colaEscalas = [];
let escalaActual = null;
let apartadoActualIdx = 0;
let apartadosKeys = [];

function iniciarEstudio(escalas) {
    colaEscalas = escalas;
    proximaEscala();
}

function proximaEscala() {
    if (colaEscalas.length === 0) {
        finalizarSesion();
        return;
    }
    escalaActual = colaEscalas.shift();
    apartadosKeys = Object.keys(datos[escalaActual].apartados);
    apartadoActualIdx = 0;
    proximoApartado();
}

function proximoApartado() {
    if (apartadoActualIdx >= apartadosKeys.length) {
        datos[escalaActual].dias_sin_tocarla = 0;
        proximaEscala();
        return;
    }

    const nombreApartado = apartadosKeys[apartadoActualIdx];
    const info = datos[escalaActual].apartados[nombreApartado];

    if (info[0] === true) {
        mostrarInterfazEstudio(escalaActual, nombreApartado, info[1]);
    } else {
        apartadoActualIdx++;
        proximoApartado();
    }
}

function mostrarInterfazEstudio(tonalidad, nombreApartado, stats) {
    const container = document.body;
    container.innerHTML = `
        <div style="text-align: center; font-family: sans-serif; padding: 20px;">
            <h1 style="font-size: 80pt; color: magenta;">${formatearTonalidad(tonalidad)}</h1>
            <h2 style="font-size: 30pt;">${nombreApartado.slice(0, -6)}: Toca a ${stats.v}</h2>
            <p style="font-size: 20pt; color: green;">¿Cómo te ha salido?</p>
            <div style="display: flex; justify-content: center; gap: 20px;">
                <button onclick="registrarResultado('p')" style="font-size: 20pt; padding: 10px 20px;">Perfecto</button>
                <button onclick="registrarResultado('b')" style="font-size: 20pt; padding: 10px 20px;">Bien</button>
                <button onclick="registrarResultado('m')" style="font-size: 20pt; padding: 10px 20px;">Mal</button>
            </div>
        </div>
    `;
}

function formatearTonalidad(t) {
    const num = t.match(/\d+/)[0];
    const tipo = t.replace(num, "");
    let s = "";
    if (tipo === "alteraciones") s = "b/#";
    else if (tipo === "bemol") s = "b";
    else if (tipo === "sostenido") s = "#";
    return num + s;
}

window.registrarResultado = function(ejecucion) {
    const nombreApartado = apartadosKeys[apartadoActualIdx];
    const stats = datos[escalaActual].apartados[nombreApartado][1];

    agregarAlHistorial(escalaActual, nombreApartado, ejecucion);

    if (ejecucion === 'p') {
        stats.d--;
    } else if (ejecucion === 'm') {
        stats.d++;
    }

    if (stats.d <= 0) {
        cambiarVelocidad(escalaActual, nombreApartado, true);
        stats.d = 5;
    } else if (stats.d >= 8) {
        cambiarVelocidad(escalaActual, nombreApartado, false);
        stats.d = 5;
    }

    saveData(datos);
    apartadoActualIdx++;
    proximoApartado();
}

function finalizarSesion() {
    const tonalidadesKeys = Object.keys(datos);
    tonalidadesKeys.forEach(t => {
        if (!escalasSesionOriginal.includes(t)) {
            datos[t].dias_sin_tocarla = (datos[t].dias_sin_tocarla || 0) + 1;
        }
    });

    saveData(datos);
    alert("¡Sesión terminada!");
    location.href = 'estudiador-escalas.html';
}

