const STORAGE_KEY = "data";
let datos;
let settings;
// FILE HANDLING
async function loadJSON(filePath) {
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
    let settings = await loadJSON('settings.json');
    if (!settings) {
        console.warn("User settings not found, loading defaults.");
        settings = await loadJSON('settings_default.json');
    }
    return settings;
}

async function loadData() {
    // ¿Tiene el usuario datos guardados en su navegador?
    const localData = localStorage.getItem(STORAGE_KEY);

    if (localData) {
        try {
            // Usuario recurrente: usa sus datos personales
            return JSON.parse(localData);
        } catch (error) {
            console.error("Error parsing local data:", error);
            // Si los datos locales están corruptos, continuamos para cargar la plantilla
        }
    }

    // Primera vez o error en datos locales: descarga la plantilla del servidor
    const template = await loadJSON('data_template.json');

    if (template) {
        // Y la guarda en su navegador para la próxima vez
        saveData(template);
    }

    return template;
}

function saveData(data) {
    if (!data) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

async function restaurarValores() {
    if (confirm("¿Estás seguro de que deseas restaurar los valores predeterminados? Se perderá todo el progreso.")) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("historial");

        const template = await loadJSON('data_template.json');
        if (template) {
            saveData(template);
            alert("Valores restaurados correctamente.");
            location.reload();
        } else {
            alert("Error al cargar la plantilla de datos.");
        }
    }
}
// FIN DE FILE HANDLING

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
    saveData(datos);
}

async function main() {
    const inputElement = document.getElementById("cantidad_hoy");
    const cantidad_hoy = inputElement ? inputElement.value : null;

    // Load settings
    settings = await loadSettings();
    if (settings) {
        console.log("Settings loaded:", settings);
    } else {
        console.error("Failed to load settings.");
    }

    // Load data
    datos = await loadData();

    if (!datos) {
        console.error("No se pudieron cargar los datos de las escalas.");
        return;
    }

    console.log("Datos cargados correctamente:", datos);

    if (cantidad_hoy) {
        console.log(`El usuario quiere tocar ${cantidad_hoy} escalas.`);
        // TODO: Implementar la lógica de selección de escalas aquí usando 'data' y 'settings'
    }
}
