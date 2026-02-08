import json
import random

cantidad_hoy = int(input("¿Cuántas escalas vas a tocar?"))

# importar datos
with open("data.json", "r", encoding="utf-8") as data_json:
    datos = json.load(data_json)

# un diccionario que relaciona cada tonalidad con un número
tonalidades = list(datos.keys())

# valores predeterminados
def restaurar_valores():
    for tonalidad in tonalidades:
        datos[tonalidad]["dificultad"] = 5
        datos[tonalidad]["velocidad"] = 72
        datos[tonalidad]["diasSinTocarla"] = 0
        datos[tonalidad]["cambiosRecientes"] = False
        datos[tonalidad]["apartados"]["normal"] = True
        datos[tonalidad]["apartados"]["arpegio"] = True
        datos[tonalidad]["apartados"]["terceras"] = True
        datos[tonalidad]["apartados"]["cuartas"] = False
        datos[tonalidad]["apartados"]["melodica"] = True

# una lista con las valocidades discretas
velocidades_discretas = [50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144]

# las escalas que vas a tocar hoy
escalas_hoy = random.sample(tonalidades, cantidad_hoy)

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

# tocar cada escala
for x in escalas_hoy:
    tocar(x)

# Cambiar la velocidad según la dificultad
for tonalidad in tonalidades:
    if datos[tonalidad]["dificultad"] == 0:
        datos[tonalidad]["velocidad"] += 1
    elif datos[tonalidad]["dificultad"] == 8:
        datos[tonalidad]["velocidad"] -=1

# cambiar los datos
with open("data.json", mode="w", encoding="utf-8") as write_file:
    json.dump(datos, write_file, indent=4)

# data.update(random.choice([*dictionary.items()]))