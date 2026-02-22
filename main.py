import json
import random
import sys
import os
import datetime as dt
import pyfiglet

VERDE = "\033[92m"
MAGENTA = "\033[35m"
ROJO = "\033[31m"
AMARILLO = "\033[93m"
RESET = "\033[0m"

################################
## FUNCIONES Y COSAS BASICAS  ##
################################

# importar datos
try:
    with open("data.json", "r", encoding="utf-8") as data_json:
        datos = json.load(data_json)
except:
    print("No se encuentra el archivo.")
    sys.exit()


def print_big(texto, COLOR):
    grande = pyfiglet.figlet_format(texto, justify="center")
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
    for tonalidad in tonalidades:
        datos[tonalidad]["cambios_recientes"] = True    
        datos[tonalidad]["dias_sin_tocarla"] = 0
        datos[tonalidad]["cambios_recientes"] = False
        for apartado in datos[tonalidad]["apartados"]:
            datos[tonalidad]["apartados"].update({apartado: [True, {"v": 80, "d": 5}]})
    os.remove("historial.json")

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

def guardar_historial(tonalidad, apartado): 
    # 1. Intentar cargar el archivo actual
    stats =  datos[tonalidad]["apartados"][apartado][1]
    try:
        with open("historial.json", "r", encoding="utf-8") as f:
            historia = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        historia = [] # Si el archivo no existe o está vacío, empezamos de cero
    # 2. Crear el nuevo registro
    nuevo_evento = {
        "fecha": str(dt.date.today()), 
        "tonalidad": tonalidad, 
        "apartado": apartado, 
        "velocidad": stats["v"],
        "dificultad": stats["d"]
    }
    # 3. Añadir a la lista y guardar todo
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
            guardar_historial(tonalidad, apartado)
            print(f"{MAGENTA}{apartado[-5:]}: Toca {apartado[:-6]} a {stats['v']}.\n{RESET}")
            ejecucion = input(F"{VERDE}¿Cómo te ha salido? Elige: perfecto, bien, o mal.\n {RESET}").strip().lower()
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

def mostrar_datos():
    pass

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
    while True:
        print(f"""
1. Empezar sesión
2. Datos
{ROJO}3. Restaurar datos{RESET}
{AMARILLO}4. Salir{RESET}
        """)
        match input():
            case "1":
                ejecutar_sesion()
            case "2":
                mostrar_datos()
            case "3":
                restaurar_valores()
            case "4":
                with open("data.json", mode="w", encoding="utf-8") as write_file:
                    json.dump(datos, write_file, indent=4)  
                break
            case _:
                print("Opción no válida, intenta de nuevo.")

menu_principal()