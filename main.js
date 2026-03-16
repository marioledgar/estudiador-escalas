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

async function main() {
    const cantidad_hoy = document.getElementById("cantidad_hoy").value;

    let data = await loadJSON('data.json');
    if (!data) {
        data = await loadJSON('data_template.json');
    }

    console.log(data);
}