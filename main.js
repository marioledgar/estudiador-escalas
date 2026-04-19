const DATA_KEY = "estudiador_datos";
const SETTINGS_KEY = "estudiador_settings";
const HISTORY_KEY = "estudiador_historial";

const DEFAULT_SETTINGS = {
    "language": "spanish",
    "speeds": "discretas"
};

const DEFAULT_DATA = {
    "alteraciones0": {
        "key": "0♭/♯",
        "alteraciones": "ninguna",
        "cantidad": 0,
        "mayor": "Do",
        "menor": "La",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_menor": [true, { "v": 80, "d": 5 }],
            "melódica_menor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "sostenido1": {
        "key": "1♯",
        "alteraciones": "sostenidos",
        "cantidad": 1,
        "mayor": "Sol",
        "menor": "Mi",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_menor": [true, { "v": 80, "d": 5 }],
            "melódica_menor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "bemol1": {
        "key": "1♭",
        "alteraciones": "bemoles",
        "cantidad": 1,
        "mayor": "Fa",
        "menor": "Re",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "sostenido2": {
        "key": "2♯",
        "alteraciones": "sostenidos",
        "cantidad": 2,
        "mayor": "Re",
        "menor": "Si",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "bemol2": {
        "key": "2♭",
        "alteraciones": "bemoles",
        "cantidad": 2,
        "mayor": "Sib",
        "menor": "Sol",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "sostenido3": {
        "key": "3♯",
        "alteraciones": "sostenidos",
        "cantidad": 3,
        "mayor": "La",
        "menor": "Fa#",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "bemol3": {
        "key": "3♭",
        "alteraciones": "bemoles",
        "cantidad": 3,
        "mayor": "Mib",
        "menor": "Do",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "sostenido4": {
        "key": "4♯",
        "alteraciones": "sostenidos",
        "cantidad": 4,
        "mayor": "Mi",
        "menor": "Do#",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "bemol4": {
        "key": "4♭",
        "alteraciones": "bemoles",
        "cantidad": 4,
        "mayor": "Lab",
        "menor": "Fa",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "sostenido5": {
        "key": "5♯",
        "alteraciones": "sostenidos",
        "cantidad": 5,
        "mayor": "Si",
        "menor": "Sol#",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "bemol5": {
        "key": "5♭",
        "alteraciones": "bemoles",
        "cantidad": 5,
        "mayor": "Reb",
        "menor": "Sib",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "sostenido6": {
        "key": "6♯",
        "alteraciones": "sostenidos",
        "cantidad": 6,
        "mayor": "Fa#",
        "menor": "Re#",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "bemol6": {
        "key": "6♭",
        "alteraciones": "bemoles",
        "cantidad": 6,
        "mayor": "Solb",
        "menor": "Mib",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "sostenido7": {
        "key": "7♯",
        "alteraciones": "sostenidos",
        "cantidad": 7,
        "mayor": "Do#",
        "menor": "La#",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    },
    "bemol7": {
        "key": "7♭",
        "alteraciones": "bemoles",
        "cantidad": 7,
        "mayor": "Dob",
        "menor": "Lab",
        "sections": {
            "normal_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_mayor": [true, { "v": 80, "d": 5 }],
            "cuartas_mayor": [true, { "v": 80, "d": 5 }],
            "arpegio_mayor": [true, { "v": 80, "d": 5 }],
            "armónica_mayor": [true, { "v": 80, "d": 5 }],
            "melódica_mayor": [true, { "v": 80, "d": 5 }],
            "terceras_menor": [true, { "v": 80, "d": 5 }],
            "cuartas_menor": [true, { "v": 80, "d": 5 }],
            "arpegio_menor": [true, { "v": 80, "d": 5 }]
        },
        "dias_sin_tocarla": 0,
        "cambios_recientes": false
    }
};

let data;
let settings;
let historyData;
let tonalities;
let amountToday;
let tonalitiesToday;
let activeForm = 0;

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
function loadSettings() {
    const localSettings = localStorage.getItem(SETTINGS_KEY);
    if (localSettings) {
        try {
            return JSON.parse(localSettings);
        } catch (e) {
            console.error("Error parsing local settings:", e);
        }
    }

    // Default if not in localStorage
    const settings = { ...DEFAULT_SETTINGS };
    saveSettings(settings);
    return settings;
}

function saveSettings(newSettings) {
    settings = newSettings;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function loadData() {
    const localData = localStorage.getItem(DATA_KEY);
    if (localData) {
        try {
            let parsedData = JSON.parse(localData);
            let migrado = false;
            // Migración: Asegurar que todas las tonalityes tengan la propiedad 'key'
            Object.keys(parsedData).forEach(t => {
                if (!parsedData[t].key) {
                    const cant = parsedData[t].cantidad;
                    const alt = parsedData[t].alteraciones;
                    parsedData[t].key = cant === 0 ? "0♭/♯" : (cant + (alt === "sostenidos" ? "♯" : "♭"));
                    migrado = true;
                }
            });
            if (migrado) {
                data = parsedData;
                localStorage.setItem(DATA_KEY, JSON.stringify(data));
            }
            return parsedData;
        } catch (e) {
            console.error("Error parsing local data:", e);
        }
    }

    const template = { ...DEFAULT_DATA };
    saveData(template);
    return template;
}

function saveData(newData) {
    data = newData;
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function loadHistory() {
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

function saveHistory(newHistory) {
    historyData = newHistory;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historial));
}

function addToHistory(tonality, section, execution) {
    const stats = data[tonality].sections[section][1];
    const nuevoEvento = {
        fecha: new Date().toISOString().split('T')[0],
        tonality: tonality,
        section: section,
        velocidad: stats.v,
        dificultad: stats.d,
        execution: execution
    };
    historyData.push(nuevoEvento);
    saveHistory(historyData);
}

function restoreValues() {
    if (confirm("¿Estás seguro de que deseas restaurar los valores predeterminados? Se perderá todo el progreso.")) {
        localStorage.removeItem(DATA_KEY);
        localStorage.removeItem(SETTINGS_KEY);
        localStorage.removeItem(HISTORY_KEY);

        saveData(DEFAULT_DATA);
        alert("Valores restaurados correctamente.");
        location.reload();
    }
}

function exportData() {
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

function importData() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const backup = JSON.parse(event.target.result);
                if (backup.data) localStorage.setItem(DATA_KEY, JSON.stringify(backup.data));
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
const discreteSpeeds = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144];
const symbols = { "ninguna": "♭/♯", "bemoles": "♭", "sostenidos": "♯" };
// fin de constantes

//sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');

    if (!sidebar || !hamburger) return;

    const isOpen = sidebar.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    if (overlay) overlay.classList.toggle('visible', isOpen);
}

//cambiar velocidad
function changeSpeed(tonality, section, aumentar = true) {
    let v = data[tonality].sections[section][1].v;
    if (aumentar) {
        if (v < 144) {
            if (settings.speeds === 'discretas') {
                if (!discreteSpeeds.includes(v)) {
                    v = discreteSpeeds.find(x => x >= v);
                } else {
                    v = discreteSpeeds[discreteSpeeds.indexOf(v) + 1];
                }
            } else { v++; }
        }
    } else {
        if (v > 30) {
            if (settings.speeds === 'discretas') {
                if (!discreteSpeeds.includes(v)) {
                    v = discreteSpeeds.findLast(x => x <= v);
                } else {
                    v = discreteSpeeds[discreteSpeeds.indexOf(v) - 1];
                }
            } else { v--; }
        }
    }
    data[tonality].sections[section][1].v = v;
    data[tonality].sections[section][1].d = 5;
}
//fin cambiar velocidad

function initialScreen() {
    document.getElementById("container").innerHTML += /*html*/`
    <div id="initial-screen">
        <button id="play-button" onclick="pantallaPreguntarCantidad()" type="button">Tocar</button>
    </div>
    `;
}

function askAmountScreen() {
    document.getElementById("initial-screen").remove();
    document.getElementById("container").innerHTML += /*html*/`
    <div id="ask-amount-container"><form id="ask-amount-form" novalidate>
        <label id="ask-amount-text">¿Cuántas escalas quieres tocar?</label>
        <div class="amount-stepper">
            <button type="button" class="amount-stepper-btn" onclick="cambiarCantidad(-1)">−</button>
            <input id="ask-amount-input" type="number" name="cantidadHoy" min="1" value="2">
            <button type="button" class="amount-stepper-btn" onclick="cambiarCantidad(1)">+</button>
        </div>
        <span id="amount-error" class="error-message"></span>
        <button type="button" id="ask-amount-button" onclick="tocar()">Empezar</button>
    </form></div>
    `;
}

function changeAmount(delta) {
    const input = document.getElementById("ask-amount-input");
    let val = parseInt(input.value) || 1;
    val = Math.max(1, val + delta);
    input.value = val;
    clearErrorCantidad();
}

function clearAmountError() {
    const stepper = document.querySelector(".amount-stepper");
    const errorSpan = document.getElementById("amount-error");
    if (stepper) stepper.classList.remove("input-error");
    if (errorSpan) errorSpan.textContent = "";
}

async function play() {
    const inputElement = document.querySelector("#ask-amount-input");
    const raw = inputElement ? inputElement.value.trim() : "";
    amountToday = parseInt(raw);

    if (!raw || isNaN(amountToday) || cantidadHoy < 1) {
        const stepper = document.querySelector(".amount-stepper");
        const errorSpan = document.getElementById("amount-error");
        if (stepper) stepper.classList.add("input-error");
        if (errorSpan) errorSpan.textContent = !raw ? "Introduce un número." : "El valor debe ser al menos 1.";
        return;
    }
    settings = await loadSettings();
    data = await loadData();
    if (!data) {
        alert("No se pudieron cargar los datos.");
        return;
    }
    historyData = loadHistory();

    tonalities = Object.keys(data);
    tonalitiesToday = chooseScales();

    document.getElementById("ask-amount-container").remove();
    tonalities.forEach(tonality => { data[tonality].dias_sin_tocarla++ });
    playTonality(tonalitiesToday[0]);
}

function chooseScales() {
    // TODO: añadir un user prompt para confirmar si quiere tocar demasiadas escalas (y tendría q repetir algunas)
    let tonalitiesToday = [];
    let resto = amountToday;
    while (tonalities.length < resto) {
        resto -= tonalities.length;
        tonalitiesToday.push(...tonalities);
    }
    let mitadAntigua = Math.floor(resto / 2);
    let mitadAleatoria = resto - mitadAntigua;
    const ordenadas = Object.keys(data).sort((a, b) => data[b].dias_sin_tocarla - data[a].dias_sin_tocarla);
    const antiguas = ordenadas.slice(0, mitadAntigua);
    tonalitiesToday.push(...antiguas);
    const disponiblesAzar = ordenadas.filter(x => !antiguas.includes(x));
    tonalitiesToday.push(...pickRandom(disponiblesAzar, mitadAleatoria));
    tonalitiesToday.sort(() => Math.random() - 0.5);
    return tonalitiesToday;
}

function playTonality(tonalityActual) {
    document.getElementById("container").innerHTML = /*html*/`
    <div id="${tonalityActual}">
    <h3 class="tonality-header">${data[tonalityActual].key}</h3>
    <div id="forms-execution"></div></div>
    `;
    Object.keys(data[tonalityActual].sections).forEach(section => {
        if (data[tonalityActual].sections[section][0]) {
            playSection(tonalityActual, section);
        }
    });
    if (tonalitiesToday[tonalitiesToday.length - 1] !== tonalityActual) {
        document.getElementById(`${tonalityActual}`).innerHTML += /*html*/`
        <button class="next-button" onclick="finishTonality('${tonalityActual}'); nextTonality('${tonalityActual}')">Siguiente</button>`
    } else {
        document.getElementById(`${tonalityActual}`).innerHTML += /*html*/`
        <button class="next-button" onclick="finishTonality('${tonalityActual}'); finishSession()">Acabar sesión</button>`
    }
}

function playSection(tonality, section) {
    const v = data[tonality].sections[section][1].v;
    document.getElementById("forms-execution").innerHTML += /*html*/`
        <div class="div-section">
            <!-- <h2>Toca ${section} a ${v} BPM</h2>
                <input class="execution-input" type="radio" name="execution" value="mal" id="mal-${section}">
                <label for="mal-${section}">Mal</label>
                <input class="execution-input" type="radio" name="execution" value="bien" id="bien-${section}" checked>
                <label for="bien-${section}">Bien</label>
                <input class="execution-input" type="radio" name="execution" value="perfecto" id="perf-${section}">
                <label for="perf-${section}">Perfecto</label>
            </form> -->

            <fieldset class="r-pill-form-fieldset">
            <legend>Toca ${section} a ${v} BPM</legend>
            <div class="r-pill-form-group">
                <form class="execution-form" id="formEjecucion${section}">
	                <input class="execution-input" type="radio" name="execution" value="mal" id="mal-${section}">
                    <label class="r-pill-form-item-bad" for="mal-${section}">Mal</label>

                    <input class="execution-input" type="radio" name="execution" value="bien" id="bien-${section}" checked>
                    <label class="r-pill-form-item-good" for="bien-${section}">Bien</label>

                    <input class="execution-input" type="radio" name="execution" value="perfecto" id="perf-${section}">
                    <label class="r-pill-form-item-perfect" for="perf-${section}">Perfecto</label>
                </form>
            </div>
            </fieldset>
        </div>
    `;
}

function finishTonality(tonality) {
    Object.keys(data[tonality].sections).forEach(section => {
        if (data[tonality].sections[section][0]) {
            const formulario = document.getElementById(`formEjecucion${section}`);
            if (formulario) {
                const data = new FormData(formulario);
                const execution = data.get('execution'); // Obtiene el "value" del radio seleccionado
                addToHistory(tonality, section, execution);
                if (execution === 'perfecto') {
                    data[tonality].sections[section][1].d--;
                } else if (execution === 'mal') { data[tonality].sections[section][1].d++; }
                if (data[tonality].sections[section][1].d === 8) { changeSpeed(tonality, section, false); }
                else if (data[tonality].sections[section][1].d === 0) { changeSpeed(tonality, section, true); }
            }
        }
    });
    data[tonality].dias_sin_tocarla = 0;
    document.getElementById(`${tonality}`).remove();
}
function nextTonality(tonality) {
    let i = tonalitiesToday.indexOf(tonality);
    playTonality(tonalitiesToday[i + 1]);
}

function finishSession() {
    alert('Sesión guardada con éxito');
    //document.body.innerHTML =;
    saveData(data);
    initialScreen();
}


document.addEventListener('keydown', function (event) {
    if (!document.getElementById("forms-execution")) { return }; //hay q estar en la pantalla de tocar

    const forms = document.querySelectorAll('.execution-form');
    if (forms.length === 0) return;

    const form = forms[activeForm]; // grab the currently active form
    const radios = Array.from(form.querySelectorAll('input[type="radio"]'));

    // Find which radio is currently checked
    let indiceActual = radios.findIndex(r => r.checked);
    if (indiceActual === -1) indiceActual = 1; // default to "bien" if none checked

    if (event.key === 'ArrowLeft') {
        // Move left, but don't go below 0
        const nuevoIndice = Math.max(0, indiceActual - 1);
        radios[nuevoIndice].checked = true;

    } else if (event.key === 'ArrowRight') {
        // Move right, but don't go past the last option
        const nuevoIndice = Math.min(radios.length - 1, indiceActual + 1);
        radios[nuevoIndice].checked = true;

    } else if (event.key === 'Enter') {
        if (activeForm === forms.length - 1) {
            document.querySelector('.next-button').click();
        } else {
            activeForm = Math.min(forms.length - 1, activeForm + 1);
            /*if (event.key === 'ArrowDown') 
            if (event.key === 'ArrowUp') activeForm = Math.max(0, activeForm - 1);*/
        }
    }
});