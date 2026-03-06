import json
import random
import sys
import os
import datetime as dt
import pyfiglet
import shutil
import tempfile
import platform

VERDE = "\033[92m"
MAGENTA = "\033[35m"
ROJO = "\033[31m"
AMARILLO = "\033[93m"
RESET = "\033[0m"

################################
## FUNCIONES Y COSAS BASICAS  ##
################################

# importar datos
if not os.path.exists("data.json"):
    if os.path.exists("data_template.json"):
        shutil.copy("data_template.json", "data.json")
        print(f"{VERDE}Se ha creado un nuevo archivo data.json desde la plantilla.{RESET}")
    else:
        print(f"{ROJO}Error crítico: No existe data.json ni data_template.json.{RESET}")
        sys.exit()
try:
    with open("data.json", "r", encoding="utf-8") as data_json:
        datos = json.load(data_json)
except Exception as e:
    print(f"{ROJO}Error al leer data.json: {e}{RESET}")
    sys.exit()

try:
    with open("historial.json", "r", encoding="utf-8") as f:
        historia = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
        historia = []

#texto grande
def print_big(texto, COLOR=None, _justify=None, _font="block"):
    grande = pyfiglet.figlet_format(texto, justify=_justify, font=_font)
    print(f"{COLOR}{grande}{RESET}")

# settings
try:
    with open("settings.json", "r", encoding="utf-8") as settings_json:
        settings = json.load(settings_json)
except:
    settings = {"idioma": "spanish", "velocidades": "discretas"}

# tonalidades
tonalidades = list(datos.keys())

# valores predeterminados
def restaurar_valores():
    try:
        os.remove("data.json")
        shutil.copy("data_template.json", "data.json")
        with open("data.json", "r", encoding="utf-8") as data_json:
            datos = json.load(data_json)
    except:
        pass
    try:
        os.remove("historial.json")
    except:
        pass

# una lista con las valocidades discretas
velocidades_discretas = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144]

# cambiar velocidad
def cambiar_velocidad(tonalidad, apartado, aumentar=True):
    v = datos[tonalidad]["apartados"][apartado][1]["v"]
    if aumentar == True:
        if v <= 144:            
            if settings["velocidades"] == "discretas":
                if v not in velocidades_discretas:
                    v = min(x for x in velocidades_discretas if x >= v)
                else:
                    v = velocidades_discretas[velocidades_discretas.index(v) + 1]
            else:
                v = v + 1
    elif aumentar == False:
        if v >= 30:
            if settings["velocidades"] == "discretas":
                if v not in velocidades_discretas:
                    v = max(x for x in velocidades_discretas if x <= v)
                else:
                    v = velocidades_discretas[velocidades_discretas.index(v) - 1]
            else:
                v = v - 1
    datos[tonalidad]["apartados"][apartado][1]["v"] = v

# simbolos de las alteraciones
# simbolos = {"alteraciones": "\u266D/\u266F", "bemol": "\u266D", "sostenido": "\u266F"}
simbolos = {"alteraciones": "b/#", "bemol": "b", "sostenido": "#"}

def guardar_historial(tonalidad, apartado, ejecucion): 
    stats =  datos[tonalidad]["apartados"][apartado][1]
    try:
        with open("historial.json", "r", encoding="utf-8") as f:
            historia = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        historia = []
    nuevo_evento = {
        "fecha": str(dt.date.today()), 
        "tonalidad": tonalidad, 
        "apartado": apartado, 
        "velocidad": stats["v"],
        "dificultad": stats["d"],
        "ejecucion": ejecucion
    }
    historia.append(nuevo_evento)
    with open("historial.json", "w", encoding="utf-8") as f:
        json.dump(historia, f, indent=4)

# Lo que hay que hacer al tocar la escala
def tocar(tonalidad):
    for apartado in datos[tonalidad]["apartados"]:
        os.system('cls' if os.name == 'nt' else 'clear')
        print_big(f"{tonalidad[-1]}{simbolos[tonalidad[:-1]]}", MAGENTA)

        if datos[tonalidad]["apartados"][apartado][0] == True:
            stats = datos[tonalidad]["apartados"][apartado][1]
            print(f"{MAGENTA}{apartado[-5:]}: Toca {apartado[:-6]} a {stats['v']}.\n{RESET}")
            try:
                ejec = input(F"{VERDE}¿Cómo te ha salido? Elige: perfecto, bien, o mal.\n {RESET}").strip().lower()[0]
            except:
                ejec = "b"
            ejecucion = ejec if ejec in ["b", "m", "p"] else "b"
            guardar_historial(tonalidad, apartado, ejecucion)
            if ejecucion.startswith("p"):
                stats["d"] -= 1
            elif ejecucion.startswith("m"):
                stats["d"] += 1
            elif ejecucion.startswith("b"):
                pass
            else:
                print("No es un resultado admitido. (Se usará 'bien')")
            if stats["d"] <= 0:
                cambiar_velocidad(tonalidad, apartado, True)
                stats["d"] = 5
            elif stats["d"] >= 8:
                cambiar_velocidad(tonalidad, apartado, False)
                stats["d"] = 5
            datos[tonalidad]["apartados"][apartado][1] = stats 
    datos[tonalidad]["dias_sin_tocarla"] = 0

#########
# DATOS #
#########

def ver_editar_datos():
    os.system('cls' if os.name == 'nt' else 'clear')
    tonalidad_mostrar = input("¿Qué tonalidad quieres ver?\nPor ejemplo, alteraciones0, sostenido2, bemol4...\n").strip()
    
    if tonalidad_mostrar not in datos:
        print(f"{ROJO}Esa tonalidad no existe.{RESET}")
        return

    apartados_actuales = datos[tonalidad_mostrar]["apartados"]
    texto_inicial = json.dumps(apartados_actuales, indent=4)
    
    with tempfile.NamedTemporaryFile(mode='w+', suffix='.json', delete=False, encoding='utf-8') as tf:
        tf.write(texto_inicial)
        ruta_temporal = tf.name

    print(f"{AMARILLO}Abriendo el editor de texto...{RESET}")
    print("Guarda el archivo (Ctrl+S) y ciérralo cuando termines para continuar.")

    if platform.system() == 'Windows':
        os.system(f'code --wait "{ruta_temporal}"')
    else:
        os.system(f'code --wait "{ruta_temporal}"')

    with open(ruta_temporal, 'r', encoding='utf-8') as tf:
        texto_editado = tf.read()

    os.remove(ruta_temporal)

    try:
        nuevos_apartados = json.loads(texto_editado)
        datos[tonalidad_mostrar]["apartados"] = nuevos_apartados
        
        with open("data.json", "w", encoding="utf-8") as f:
            json.dump(datos, f, indent=4)
            
        print(f"{VERDE}¡Datos actualizados correctamente!{RESET}")
        
    except json.JSONDecodeError:
        print(f"{ROJO}Error al guardar: El formato JSON se ha roto. Cambios cancelados.{RESET}")

def insights():
    pass
def graficas():
    pass

def menu_datos():
    msg = ""
    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        
        if msg:
            print(f"--- {msg} ---")
            msg = ""

        print(f"""
1. Ver/editar datos
2. Insights
3. Gráficas
4. Atrás
""")
        match input("Selecciona una opción: "):
            case "1":
                ver_editar_datos()
            case "2":
                insights()
            case "3":
                graficas()
            case "4":
                break
            case _:
                msg = "Opción no válida, intenta de nuevo"

################################

def ejecutar_sesion():
    # cuantas vas a tocar
    try:
        cantidad_hoy = int(input("¿Cuántas escalas vas a tocar? "))
    except ValueError:
        cantidad_hoy = 3
        print("Número no válido, usaremos 3.")

    # Elige cuales vas a tocar
    mitad_antigua = cantidad_hoy // 2
    mitad_aleatoria = cantidad_hoy - mitad_antigua

    ordenadas = sorted(datos, key=lambda k: datos[k]["dias_sin_tocarla"], reverse=True)
    antiguas = ordenadas[:mitad_antigua]
    disponibles_azar = [t for t in ordenadas if t not in antiguas]
    if len(disponibles_azar) < mitad_aleatoria:
        aleatorias = disponibles_azar
    else:
        aleatorias = random.sample(disponibles_azar, mitad_aleatoria)
    escalas_hoy = antiguas + aleatorias
    random.shuffle(escalas_hoy)

    # tocar cada escala
    for x in escalas_hoy:
        tocar(x)

    # Cambiar los dias sin tocarla
    for tonalidad in tonalidades:
        if tonalidad not in escalas_hoy: datos[tonalidad]["dias_sin_tocarla"] += 1

    print(f"{VERDE}Sesión terminada!{RESET}")

# menu

def menu_principal():
    msg = ""
    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        print(f"""
1. Empezar sesión
2. Datos
{ROJO}3. Restaurar datos{RESET}
{AMARILLO}4. Salir{RESET}
""")
        if msg:
            print(f"--- {msg} ---")
            msg = ""

        match input("Selecciona una opción: "):
            case "1":
                ejecutar_sesion()
            case "2":
                menu_datos()
            case "3":
                restaurar_valores()
            case "4":
                with open("data.json", mode="w", encoding="utf-8") as write_file:
                    json.dump(datos, write_file, indent=4)  
                break
            case _:
                msg = "Opción no válida, intenta de nuevo"

menu_principal()