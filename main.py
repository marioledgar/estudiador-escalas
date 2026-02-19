import json
import random
import sys

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

# una lista con las valocidades discretas
velocidades_discretas = [50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144]

def cambiar_velocidad(tonalidad, apartado, aumentar):
    v = datos[tonalidad]["apartados"][apartado][1]["v"]
    if aumentar == True:
        if settings["velocidades"] == "discretas":
            if v not in velocidades_discretas:
                v = min(x for x in velocidades_discretas if x >= v)
            else:
                v = velocidades_discretas[velocidades_discretas.index(v) + 1]
        else:
            v = v + 1
    elif aumentar == False:
        if settings["velocidades"] == "discretas":
            if v not in velocidades_discretas:
                v = max(x for x in velocidades_discretas if x <= v)
            else:
                v = velocidades_discretas[velocidades_discretas.index(v) - 1]
        else:
            v = v - 1
    datos[tonalidad]["apartados"][apartado][1]["v"] = v

# Lo que hay que hacer al tocar la escala
def tocar(tonalidad):
    for apartado in datos[tonalidad]["apartados"]:
        stats = datos[tonalidad]["apartados"][1]
        if datos[tonalidad]["apartados"][apartado][0] == True:
            print(f"Toca {apartado} a {stats['v']}")
            ejecucion = input("¿Cómo te ha salido? Elige: perfecto, bien, o mal.").strip().lower()
            if ejecucion in ["perfe", "perfecto", "p"]:
                stats["d"] -= 1
            elif ejecucion in ["mal", "m"]:
                stats["d"] += 1
            elif ejecucion in ["bien", "b", "bn"]:
                pass
            else:
                print("No es un resultado admitido. (Se usará 'bien')")
            if stats["d"] <= 0:
                cambiar_velocidad(tonalidad, apartado, True)
                stats["d"] = 5
            elif stats["d"] >= 8:
                cambiar_velocidad(tonalidad, apartado, False)
                stats["d"] = 5
        datos[tonalidad]["apartados"][1] = stats
    datos[tonalidad]["dias_sin_tocarla"] = 0

################################

try:
    cantidad_hoy = int(input("¿Cuántas escalas vas a tocar? "))
except ValueError:
    cantidad_hoy = 3
    print("Número no válido, usaremos 3.")

mitad_antigua = cantidad_hoy // 2
mitad_aleatoria = cantidad_hoy - mitad_antigua

ordenadas = sorted(datos, key=lambda k: datos[k]["dias_sin_tocarla"], reverse=True)
antiguas = ordenadas[:mitad_antigua]
disponibles_azar = [t for t in ordenadas if t not in antiguas]
aleatorias = random.sample(disponibles_azar, mitad_aleatoria)
escalas_hoy = antiguas + aleatorias
random.shuffle(escalas_hoy)

# tocar cada escala
for x in escalas_hoy:
    tocar(x)

# Cambiar los dias sin tocarla
for tonalidad in tonalidades:
    if tonalidad not in escalas_hoy: datos[tonalidad]["dias_sin_tocarla"] += 1

## para las pruebas
if input("¿Restaurar valores? y/n") == "y":
    restaurar_valores()

###############################
# ESTO TIENE QUE IR LO ULTIMO #
###############################

# cambiar los datos
with open("data.json", mode="w", encoding="utf-8") as write_file:
    json.dump(datos, write_file, indent=4)  