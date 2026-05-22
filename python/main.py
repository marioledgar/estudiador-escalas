import json
import random
import sys
import os
import datetime as dt
import pyfiglet
import shutil
import tempfile
import platform

GREEN = "\033[92m"
MAGENTA = "\033[35m"
RED = "\033[31m"
YELLOW = "\033[93m"
RESET = "\033[0m"

################################
## FUNCTIONS AND BASIC STUFF  ##
################################

# import data
if not os.path.exists("data.json"):
    if os.path.exists("data_template.json"):
        shutil.copy("data_template.json", "data.json")
        print(f"{GREEN}Se ha creado un nuevo archivo data.json desde la plantilla.{RESET}")
    else:
        print(f"{RED}Error crítico: No existe data.json ni data_template.json.{RESET}")
        sys.exit()
try:
    with open("data.json", "r", encoding="utf-8") as data_json:
        data = json.load(data_json)
except Exception as e:
    print(f"{RED}Error al leer data.json: {e}{RESET}")
    sys.exit()

try:
    with open("history.json", "r", encoding="utf-8") as f:
        history = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
        history = []

# big text
def print_big(text, color=None, _justify=None, _font="block"):
    big_text = pyfiglet.figlet_format(text, justify=_justify, font=_font)
    print(f"{color}{big_text}{RESET}")

# settings
try:
    with open("settings.json", "r", encoding="utf-8") as settings_json:
        settings = json.load(settings_json)
except:
    settings = {"idioma": "spanish", "velocidades": "discretas"}

# tonalities
tonalities = list(data.keys())

# default values
def restore_values():
    try:
        os.remove("data.json")
        shutil.copy("data_template.json", "data.json")
        with open("data.json", "r", encoding="utf-8") as data_json:
            global data
            data = json.load(data_json)
    except:
        pass
    try:
        os.remove("history.json")
    except:
        pass

# discrete speeds list
discrete_speeds = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144]

# change speed
def change_speed(tonality, section, increase=True):
    v = data[tonality]["apartados"][section][1]["v"]
    if increase == True:
        if v < 144:            
            if settings["velocidades"] == "discretas":
                if v not in discrete_speeds:
                    v = min(x for x in discrete_speeds if x >= v)
                else:
                    v = discrete_speeds[discrete_speeds.index(v) + 1]
            else:
                v = v + 1
    elif increase == False:
        if v > 30:
            if settings["velocidades"] == "discretas":
                if v not in discrete_speeds:
                    v = max(x for x in discrete_speeds if x <= v)
                else:
                    v = discrete_speeds[discrete_speeds.index(v) - 1]
            else:
                v = v - 1
    data[tonality]["apartados"][section][1]["v"] = v

# symbols for alterations
symbols = {"alteraciones": "b/#", "bemol": "b", "sostenido": "#"}

def save_history(tonality, section, execution): 
    stats = data[tonality]["apartados"][section][1]
    try:
        with open("history.json", "r", encoding="utf-8") as f:
            current_history = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        current_history = []
    new_event = {
        "date": str(dt.date.today()), 
        "tonality": tonality, 
        "section": section, 
        "speed": stats["v"],
        "difficulty": stats["d"],
        "execution": execution
    }
    current_history.append(new_event)
    with open("history.json", "w", encoding="utf-8") as f:
        json.dump(current_history, f, indent=4)

# what to do when playing the scale
def play_tonality(tonality):
    for section in data[tonality]["apartados"]:
        os.system('cls' if os.name == 'nt' else 'clear')
        print_big(f"{tonality[-1]}{symbols[tonality[:-1]]}", MAGENTA)

        if data[tonality]["apartados"][section][0] == True:
            stats = data[tonality]["apartados"][section][1]
            print(f"{MAGENTA}{section[-5:]}: Toca {section[:-6]} a {stats['v']}.\n{RESET}")
            try:
                exec_result = input(F"{GREEN}¿Cómo te ha salido? Elige: perfecto, bien, o mal.\n {RESET}").strip().lower()[0]
            except:
                exec_result = "b"
            execution = exec_result if exec_result in ["b", "m", "p"] else "b"
            save_history(tonality, section, execution)
            if execution.startswith("p"):
                stats["d"] -= 1
            elif execution.startswith("m"):
                stats["d"] += 1
            elif execution.startswith("b"):
                pass
            else:
                print("No es un resultado admitido. (Se usará 'bien')")
            if stats["d"] <= 0:
                change_speed(tonality, section, True)
                stats["d"] = 5
            elif stats["d"] >= 8:
                change_speed(tonality, section, False)
                stats["d"] = 5
            data[tonality]["apartados"][section][1] = stats 
    data[tonality]["dias_sin_tocarla"] = 0

#########
# DATA  #
#########

def edit_global():
    msg = ""
    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        section_to_change = input(f"¿Qué apartado deseas cambiar?\nOpciones:\n{"\n".join(section for section in data["alteraciones0"]["apartados"])}\n").strip().lower()
        if msg:
            print(f"--- {msg} ---")
            msg = ""
        if section_to_change not in data["alteraciones0"]["apartados"]:
            msg = "Apartado no válido, intenta de nuevo."
        else:
            break
        
    current_section = data["alteraciones0"]["apartados"][section_to_change]
    initial_text = json.dumps(current_section, indent=4)

    with tempfile.NamedTemporaryFile(mode='w+', suffix='.json', delete=False, encoding='utf-8') as tf:
        tf.write(initial_text)
        temp_path = tf.name
    
    print(f"{YELLOW}Abriendo el editor de texto...{RESET}")
    print("Guarda el archivo (Ctrl+S) y ciérralo cuando termines para continuar.")

    try:
        os.system(f'code --wait "{temp_path}"')
    except:
        if platform.system() == "Windows":
            os.system(f'notepad "{temp_path}"')
        else:
            os.system(f'nano "{temp_path}"')
        
    with open(temp_path, 'r', encoding='utf-8') as tf:
        edited_text = tf.read()
    os.remove(temp_path)

    try:
        new_section = json.loads(edited_text)
        for tonality in data:
            data[tonality]["apartados"][section_to_change] = new_section
        with open("data.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)
        print(f"{GREEN}¡Datos actualizados correctamente!{RESET}")
    except json.JSONDecodeError:
        print(f"{RED}Error al guardar: El formato JSON se ha roto. Cambios cancelados.{RESET}")

def view_edit_data():
    if input("¿Deseas editar globalmente? Si editass globalmente, podrás cambiar los datos de todas las escalas a la vez. [Y/n]").lower().strip() == "y":
        edit_global()
    else:
        os.system('cls' if os.name == 'nt' else 'clear')
        tonality_to_show = input("¿Qué tonalidad quieres ver?\nPor ejemplo, alteraciones0, sostenido2, bemol4...\n").strip()
        
        if tonality_to_show not in data:
            print(f"{RED}Esa tonalidad no existe.{RESET}")
            return

        current_sections = data[tonality_to_show]["apartados"]
        initial_text = json.dumps(current_sections, indent=4)
        
        with tempfile.NamedTemporaryFile(mode='w+', suffix='.json', delete=False, encoding='utf-8') as tf:
            tf.write(initial_text)
            temp_path = tf.name

        print(f"{YELLOW}Abriendo el editor de texto...{RESET}")
        print("Guarda el archivo (Ctrl+S) y ciérralo cuando termines para continuar.")

        try:
            os.system(f'code --wait "{temp_path}"')
        except:
            if platform.system() == "Windows":
                os.system(f'notepad "{temp_path}"')
            else:
                os.system(f'nano "{temp_path}"')

        with open(temp_path, 'r', encoding='utf-8') as tf:
            edited_text = tf.read()

        os.remove(temp_path)

        try:
            new_sections = json.loads(edited_text)
            data[tonality_to_show]["apartados"] = new_sections
            
            with open("data.json", "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4)
                
            print(f"{GREEN}¡Datos actualizados correctamente!{RESET}")
            
        except json.JSONDecodeError:
            print(f"{RED}Error al guardar: El formato JSON se ha roto. Cambios cancelados.{RESET}")

def insights():
    pass
def graphics():
    pass

def menu_data():
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
                view_edit_data()
            case "2":
                insights()
            case "3":
                graphics()
            case "4":
                break
            case _:
                msg = "Opción no válida, intenta de nuevo"

################################

def run_session():
    # how many are you going to play
    try:
        amount_today = int(input("¿Cuántas escalas vas a tocar? "))
    except ValueError:
        amount_today = 3
        print("Número no válido, usaremos 3.")

    # choose which ones you are going to play
    old_half = amount_today // 2
    random_half = amount_today - old_half

    sorted_tonalities = sorted(data, key=lambda k: data[k]["dias_sin_tocarla"], reverse=True)
    old_tonalities = sorted_tonalities[:old_half]
    available_random = [t for t in sorted_tonalities if t not in old_tonalities]
    if len(available_random) < random_half:
        random_tonalities = available_random
    else:
        random_tonalities = random.sample(available_random, random_half)
    tonalities_today = old_tonalities + random_tonalities
    random.shuffle(tonalities_today)

    # play each scale
    for x in tonalities_today:
        play_tonality(x)

    # change days without playing it
    for tonality in tonalities:
        if tonality not in tonalities_today: data[tonality]["dias_sin_tocarla"] += 1

    print(f"{GREEN}Sesión terminada!{RESET}")

# menu

def main_menu():
    msg = ""
    while True:
        os.system('cls' if os.name == 'nt' else 'clear')
        print(f"""
1. Empezar sesión
2. Datos
{RED}3. Restaurar datos{RESET}
{YELLOW}4. Salir{RESET}
""")
        if msg:
            print(f"--- {msg} ---")
            msg = ""

        match input("Selecciona una opción: "):
            case "1":
                run_session()
            case "2":
                menu_data()
            case "3":
                restore_values()
            case "4":
                with open("data.json", mode="w", encoding="utf-8") as write_file:
                    json.dump(data, write_file, indent=4)  
                break
            case _:
                msg = "Opción no válida, intenta de nuevo"

main_menu()