const STORAGE_KEY = "data";

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

async function main() {
    const inputElement = document.getElementById("cantidad_hoy");
    const cantidad_hoy = inputElement ? inputElement.value : null;

    // Load settings
    const settings = await loadSettings();
    if (settings) {
        console.log("Settings loaded:", settings);
    } else {
        console.error("Failed to load settings.");
    }

    // Load data
    let data = await loadData();

    if (!data) {
        console.error("No se pudieron cargar los datos de las escalas.");
        return;
    }

    console.log("Datos cargados correctamente:", data);

    if (cantidad_hoy) {
        console.log(`El usuario quiere tocar ${cantidad_hoy} escalas.`);
        // TODO: Implementar la lógica de selección de escalas aquí usando 'data' y 'settings'
    }
}
