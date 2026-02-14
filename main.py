import json
import random

################################
## FUNCIONES Y COSAS BASICAS  ##
################################

# importar datos
with open("data.json", "r", encoding="utf-8") as data_json:
    datos = json.load(data_json)

# settings
with open("settings.json", "r", encoding="utf-8") as settings_json:
    settings = json.load(settings_json)

# tonalidades
tonalidades = list(datos.keys())

# valores predeterminados
def restaurar_valores():
    for tonalidad in tonalidades:
        datos[tonalidad]["dificultad"] = 5
        datos[tonalidad]["velocidad"] = 80
        datos[tonalidad]["dias_sin_tocarla"] = 0
        datos[tonalidad]["cambiosRecientes"] = False
        datos[tonalidad]["apartados"]["normal"] = True
        datos[tonalidad]["apartados"]["arpegio"] = True
        datos[tonalidad]["apartados"]["terceras"] = True
        datos[tonalidad]["apartados"]["cuartas"] = False
        datos[tonalidad]["apartados"]["melodica"] = True

# una lista con las valocidades discretas
velocidades_discretas = [50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144]

def aumentar_velocidad(tonalidad):
    v = datos[tonalidad]["velocidad"]
    if settings["velocidades"] == "discretas":
        if v not in velocidades_discretas:
            v = min(x for x in velocidades_discretas if x >= v)
        else:
            v = velocidades_discretas[velocidades_discretas.index(v) + 1]
    else:
        v = v + 1
    datos[tonalidad]["velocidad"] = v

def disminuir_velocidad(tonalidad):
    v = datos[tonalidad]["velocidad"]
    if settings["velocidades"] == "discretas":
        if v not in velocidades_discretas:
            v = max(x for x in velocidades_discretas if x <= v)
        else:
            v = velocidades_discretas[velocidades_discretas.index(v) - 1]
    else:
        v = v - 1
    datos[tonalidad]["velocidad"] = v

# Lo que hay que hacer al tocar la escala
def tocar(tonalidad):
    print("Toca " + datos[tonalidad]["mayor"] + " Mayor a ", datos[tonalidad]["velocidad"], "bpm.")
    print("Toca " + datos[tonalidad]["menor"] + " menor a ", datos[tonalidad]["velocidad"], "bpm.")
    ejecucion = input("¿Cómo te ha salido? Elige: perfecto, bien, o mal.")
    if ejecucion == "perfecto":
        datos[tonalidad]["dificultad"] -= 1
    elif ejecucion == "mal":
        datos[tonalidad]["dificultad"] += 1
    elif ejecucion == "bien":
        pass
    else:
        print("No es un resultado admitido.")

################################

cantidad_hoy = int(input("¿Cuántas escalas vas a tocar?"))
mitad_antigua = cantidad_hoy // 2
mitad_aleatoria = cantidad_hoy - mitad_antigua

dias_sin_tocarlas = dict({})
for tonalidad in tonalidades:
    dias_sin_tocarlas.update({tonalidad:datos[tonalidad]["dias_sin_tocarla"]})
dias_sin_tocarlas = sorted(dias_sin_tocarlas.items(), key=lambda item: item[1], reverse=True)

# las escalas que vas a tocar hoy
escalas_hoy = []
for i in range(mitad_antigua):
    escalas_hoy.append(dias_sin_tocarlas[i][0])
tonalidades_restantes = list(set(tonalidades) - set(escalas_hoy))
tonalidades_aleatorias = random.sample(tonalidades_restantes, mitad_aleatoria)
escalas_hoy = list(set(escalas_hoy) | set(tonalidades_aleatorias))
print(escalas_hoy)

# tocar cada escala
for x in escalas_hoy:
    tocar(x)

# Cambiar la velocidad según la dificultad
for tonalidad in tonalidades:
    if datos[tonalidad]["dificultad"] <= 0:
        aumentar_velocidad(tonalidad)
        datos[tonalidad]["dificultad"] = 5
    elif datos[tonalidad]["dificultad"] >= 8:
        disminuir_velocidad(tonalidad)
        datos[tonalidad]["dificultad"] = 5

# Cambiar los dias sin tocarla
for tonalidad in tonalidades:
    if tonalidad in escalas_hoy:
        datos[tonalidad]["dias_sin_tocarla"] = 0
    else:
        datos[tonalidad]["dias_sin_tocarla"] += 1

## para las pruebas
if input("¿Restaurar valores? y/n") == "y":
    restaurar_valores()

###############################
# ESTO TIENE QUE IR LO ULTIMO #
###############################

# cambiar los datos
with open("data.json", mode="w", encoding="utf-8") as write_file:
    json.dump(datos, write_file, indent=4)