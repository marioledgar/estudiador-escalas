const STORAGE_KEY = "data";

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

async function main() {
    const inputElement = document.getElementById("cantidad_hoy");
    const cantidad_hoy = inputElement ? inputElement.value : null;

    let data = await loadData();

    if (!data) {
        console.error("No se pudieron cargar los datos de las escalas.");
        return;
    }

    console.log("Datos cargados correctamente:", data);

    if (cantidad_hoy) {
        console.log(`El usuario quiere tocar ${cantidad_hoy} escalas.`);
        // TODO: Implementar la lógica de selección de escalas aquí
    }

    // Solo llama a saveData(data) después de modificar 'data'.
}
