const DATA_KEY = "estudiador_datos";
const SETTINGS_KEY = "estudiador_settings";
const HISTORY_KEY = "estudiador_historial";

const DEFAULT_SETTINGS = {
    "idioma": "spanish",
    "velocidades": "discretas"
};

const DEFAULT_DATA = {
    "alteraciones0": {
        "alteraciones": "ninguna",
        "cantidad": 0,
        "mayor": "Do",
        "menor": "La",
        "apartados": {
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
        "alteraciones": "sostenidos",
        "cantidad": 1,
        "mayor": "Sol",
        "menor": "Mi",
        "apartados": {
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
        "alteraciones": "bemoles",
        "cantidad": 1,
        "mayor": "Fa",
        "menor": "Re",
        "apartados": {
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
        "alteraciones": "sostenidos",
        "cantidad": 2,
        "mayor": "Re",
        "menor": "Si",
        "apartados": {
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
        "alteraciones": "bemoles",
        "cantidad": 2,
        "mayor": "Sib",
        "menor": "Sol",
        "apartados": {
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
        "alteraciones": "sostenidos",
        "cantidad": 3,
        "mayor": "La",
        "menor": "Fa#",
        "apartados": {
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
        "alteraciones": "bemoles",
        "cantidad": 3,
        "mayor": "Mib",
        "menor": "Do",
        "apartados": {
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
        "alteraciones": "sostenidos",
        "cantidad": 4,
        "mayor": "Mi",
        "menor": "Do#",
        "apartados": {
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
        "alteraciones": "bemoles",
        "cantidad": 4,
        "mayor": "Lab",
        "menor": "Fa",
        "apartados": {
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
        "alteraciones": "sostenidos",
        "cantidad": 5,
        "mayor": "Si",
        "menor": "Sol#",
        "apartados": {
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
        "alteraciones": "bemoles",
        "cantidad": 5,
        "mayor": "Reb",
        "menor": "Sib",
        "apartados": {
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
        "alteraciones": "sostenidos",
        "cantidad": 6,
        "mayor": "Fa#",
        "menor": "Re#",
        "apartados": {
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
        "alteraciones": "bemoles",
        "cantidad": 6,
        "mayor": "Solb",
        "menor": "Mib",
        "apartados": {
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
        "alteraciones": "sostenidos",
        "cantidad": 7,
        "mayor": "Do#",
        "menor": "La#",
        "apartados": {
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
        "alteraciones": "bemoles",
        "cantidad": 7,
        "mayor": "Dob",
        "menor": "Lab",
        "apartados": {
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

let datos;
let settings;
let historial;
let tonalidades;
let cantidadHoy;
let tonalidadesHoy;
let formActivo = 0;

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
            return JSON.parse(localData);
        } catch (e) {
            console.error("Error parsing local data:", e);
        }
    }

    const template = { ...DEFAULT_DATA };
    saveData(template);
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

function restaurarValores() {
    if (confirm("¿Estás seguro de que deseas restaurar los valores predeterminados? Se perderá todo el progreso.")) {
        localStorage.removeItem(DATA_KEY);
        localStorage.removeItem(SETTINGS_KEY);
        localStorage.removeItem(HISTORY_KEY);

        saveData({ ...DEFAULT_DATA });
        alert("Valores restaurados correctamente.");
        location.reload();
    }
}

function exportarDatos() {
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

function importarDatos() {
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
    datos[tonalidad].apartados[apartado][1].d = 5;
}
//fin cambiar velocidad

function pantallaInicial() {
    document.getElementById("contenedor").innerHTML += /*html*/`
    <div id="pantalla-inicial">
        <button id="boton-tocar" onclick="pantallaPreguntarCantidad()" type="button">Tocar</button>
    </div>
    `;
}

function pantallaPreguntarCantidad() {
    document.getElementById("pantalla-inicial").remove();
    document.getElementById("contenedor").innerHTML += /*html*/`
    <div id="preguntar-cantidad"><form id="form-preguntar-cantidad" novalidate>
        <label id="texto-preguntar-cantidad">¿Cuántas escalas quieres tocar?</label>
        <div class="cantidad-stepper">
            <button type="button" class="cantidad-stepper-btn" onclick="cambiarCantidad(-1)">−</button>
            <input id="input-preguntar-cantidad" type="number" name="cantidadHoy" min="1" value="2">
            <button type="button" class="cantidad-stepper-btn" onclick="cambiarCantidad(1)">+</button>
        </div>
        <span id="error-cantidad" class="error-message"></span>
        <button type="button" id="boton-preguntar-cantidad" onclick="tocar()">Empezar</button>
    </form></div>
    `;
}

function cambiarCantidad(delta) {
    const input = document.getElementById("input-preguntar-cantidad");
    let val = parseInt(input.value) || 1;
    val = Math.max(1, val + delta);
    input.value = val;
    clearErrorCantidad();
}

function clearErrorCantidad() {
    const stepper = document.querySelector(".cantidad-stepper");
    const errorSpan = document.getElementById("error-cantidad");
    if (stepper) stepper.classList.remove("input-error");
    if (errorSpan) errorSpan.textContent = "";
}

async function tocar() {
    const inputElement = document.querySelector("#input-preguntar-cantidad");
    const raw = inputElement ? inputElement.value.trim() : "";
    cantidadHoy = parseInt(raw);

    if (!raw || isNaN(cantidadHoy) || cantidadHoy < 1) {
        const stepper = document.querySelector(".cantidad-stepper");
        const errorSpan = document.getElementById("error-cantidad");
        if (stepper) stepper.classList.add("input-error");
        if (errorSpan) errorSpan.textContent = !raw ? "Introduce un número." : "El valor debe ser al menos 1.";
        return;
    }
    settings = await loadSettings();
    datos = await loadData();
    if (!datos) {
        alert("No se pudieron cargar los datos.");
        return;
    }
    historial = loadHistorial();

    tonalidades = Object.keys(datos);
    tonalidadesHoy = elegirEscalas();

    document.getElementById("preguntar-cantidad").remove();
    tonalidades.forEach(tonalidad => { datos[tonalidad].dias_sin_tocarla++ });
    tocarTonalidad(tonalidadesHoy[0]);
}

function elegirEscalas() {
    // TODO: añadir un user prompt para confirmar si quiere tocar demasiadas escalas (y tendría q repetir algunas)
    let tonalidadesHoy = [];
    let resto = cantidadHoy;
    while (tonalidades.length < resto) {
        resto -= tonalidades.length;
        tonalidadesHoy.push(...tonalidades);
    }
    let mitadAntigua = Math.floor(resto / 2);
    let mitadAleatoria = resto - mitadAntigua;
    const ordenadas = Object.keys(datos).sort((a, b) => datos[b].dias_sin_tocarla - datos[a].dias_sin_tocarla);
    const antiguas = ordenadas.slice(0, mitadAntigua);
    tonalidadesHoy.push(...antiguas);
    const disponiblesAzar = ordenadas.filter(x => !antiguas.includes(x));
    tonalidadesHoy.push(...pickRandom(disponiblesAzar, mitadAleatoria));
    tonalidadesHoy.sort(() => Math.random() - 0.5);
    return tonalidadesHoy;
}

function tocarTonalidad(tonalidadActual) {
    document.getElementById("contenedor").innerHTML = /*html*/`
    <div id="${tonalidadActual}">
    <h3>${tonalidadActual}</h3>
    <div id="forms-ejecucion"></div></div>
    `;
    Object.keys(datos[tonalidadActual].apartados).forEach(apartado => {
        if (datos[tonalidadActual].apartados[apartado][0]) {
            tocarApartado(tonalidadActual, apartado);
        }
    });
    if (tonalidadesHoy[tonalidadesHoy.length - 1] !== tonalidadActual) {
        document.getElementById(`${tonalidadActual}`).innerHTML += /*html*/`
        <button class="boton-siguiente" onclick="acabarTonalidad('${tonalidadActual}'); siguienteTonalidad('${tonalidadActual}')">Siguiente</button>`
    } else {
        document.getElementById(`${tonalidadActual}`).innerHTML += /*html*/`
        <button class="boton-siguiente" onclick="acabarTonalidad('${tonalidadActual}'); acabarSesion()">Acabar sesión</button>`
    }
}

function tocarApartado(tonalidad, apartado) {
    const v = datos[tonalidad].apartados[apartado][1].v;
    document.getElementById("forms-ejecucion").innerHTML += /*html*/`
        <div class="div-apartado">
            <!-- <h2>Toca ${apartado} a ${v} BPM</h2>
                <input class="ejecucion-input" type="radio" name="ejecucion" value="mal" id="mal-${apartado}">
                <label for="mal-${apartado}">Mal</label>
                <input class="ejecucion-input" type="radio" name="ejecucion" value="bien" id="bien-${apartado}" checked>
                <label for="bien-${apartado}">Bien</label>
                <input class="ejecucion-input" type="radio" name="ejecucion" value="perfecto" id="perf-${apartado}">
                <label for="perf-${apartado}">Perfecto</label>
            </form> -->

            <fieldset class="r-pill-form-fieldset">
            <legend>Toca ${apartado} a ${v} BPM</legend>
            <div class="r-pill-form-group">
                <form class="ejecucion-form" id="formEjecucion${apartado}">
	                <input class="ejecucion-input" type="radio" name="ejecucion" value="mal" id="mal-${apartado}">
                    <label class="r-pill-form-item-mal" for="mal-${apartado}">Mal</label>

                    <input class="ejecucion-input" type="radio" name="ejecucion" value="bien" id="bien-${apartado}" checked>
                    <label class="r-pill-form-item-bien" for="bien-${apartado}">Bien</label>

                    <input class="ejecucion-input" type="radio" name="ejecucion" value="perfecto" id="perf-${apartado}">
                    <label class="r-pill-form-item-perf" for="perf-${apartado}">Perfecto</label>
                </form>
            </div>
            </fieldset>
        </div>
    `;
}

function acabarTonalidad(tonalidad) {
    Object.keys(datos[tonalidad].apartados).forEach(apartado => {
        if (datos[tonalidad].apartados[apartado][0]) {
            const formulario = document.getElementById(`formEjecucion${apartado}`);
            if (formulario) {
                const data = new FormData(formulario);
                const ejecucion = data.get('ejecucion'); // Obtiene el "value" del radio seleccionado
                agregarAlHistorial(tonalidad, apartado, ejecucion);
                if (ejecucion === 'perfecto') {
                    datos[tonalidad].apartados[apartado][1].d--;
                } else if (ejecucion === 'mal') { datos[tonalidad].apartados[apartado][1].d++; }
                if (datos[tonalidad].apartados[apartado][1].d === 8) { cambiarVelocidad(tonalidad, apartado, false); }
                else if (datos[tonalidad].apartados[apartado][1].d === 0) { cambiarVelocidad(tonalidad, apartado, true); }
            }
        }
    });
    datos[tonalidad].dias_sin_tocarla = 0;
    document.getElementById(`${tonalidad}`).remove();
}
function siguienteTonalidad(tonalidad) {
    let i = tonalidadesHoy.indexOf(tonalidad);
    tocarTonalidad(tonalidadesHoy[i + 1]);
}

function acabarSesion() {
    alert('Sesión guardada con éxito');
    //document.body.innerHTML =;
    saveData(datos);
    pantallaInicial();
}


document.addEventListener('keydown', function (event) {
    if (!document.getElementById("forms-ejecucion")) { return }; //hay q estar en la pantalla de tocar

    const forms = document.querySelectorAll('.ejecucion-form');
    if (forms.length === 0) return;

    const form = forms[formActivo]; // grab the currently active form
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
        if (formActivo === forms.length - 1) {
            document.querySelector('.boton-siguiente').click();
        } else {
            formActivo = Math.min(forms.length - 1, formActivo + 1);
            /*if (event.key === 'ArrowDown') 
            if (event.key === 'ArrowUp') formActivo = Math.max(0, formActivo - 1);*/
        }
    }
});