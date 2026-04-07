# TODO — Estudiador de Escalas (Web)

> Estado actual: la lógica principal (sesión, velocidades, historial, import/export) funciona.
> Falta practicamente toda la UI/CSS, el menú de datos, y las features del Python que aún no están portadas.

---

## 1. CSS y diseño visual

La web actualmente no tiene **ningún archivo CSS**. Todo es inline y con estilos mínimos.

- [x] **Crear `style.css`** y enlazarlo en `index.html`
- [ ] **Sistema de variables CSS**: definir paleta de colores, tipografía, espaciados, radios y sombras como custom properties (`:root { --color-primary: ...; }`)
- [x] **Tipografía**: importar una fuente de Google Fonts (Inter, Outfit o similar) y aplicarla globalmente
- [x] **Layout general**: usar CSS Grid o Flexbox para centrar el contenido, con un `max-width` y padding responsivo
- [ ] **Pantalla inicial**:
  - Botón "Tocar" grande, con gradiente, sombra, hover con `transform: scale()` y `transition`
  - Botones secundarios (restaurar, exportar, importar) más pequeños, estilo outlined o ghost
  - Quizá un título/logo arriba con pyfiglet-style CSS (fuente monospace grande, o un SVG)
- [ ] **Pantalla de cantidad**:
  - Input numérico estilizado (bordes redondeados, fondo semitransparente)
  - Botón "Empezar" con el mismo estilo que "Tocar"
- [x] **Pantalla de ejecución (tocar tonalidad)**:
  - Nombre de la tonalidad grande y centrado (e.g. "3#" con símbolo de sostenido)
  - Cada apartado como una **card** con fondo, borde redondeado, sombra suave
  - Radio buttons como botones de grupo segmentado (tipo toggle), no radios nativos. Colores: rojo para mal, amarillo/naranja para bien, verde para perfecto
  - Botones "Siguiente" / "Acabar sesión" con estilo consistente
- [ ] **Dark mode**: hacer que toda la app sea dark by default (fondo oscuro, texto claro). Opcionalmente toggle claro/oscuro
- [x] **Responsividad**: media queries para móvil/tablet. La app debería ser cómoda con el móvil en un atril
- [ ] **Animaciones y transiciones**:
  - Transición suave al cambiar de pantalla (fade-in con `opacity` + `transform`)
  - Hover effects en todos los botones
  - Feedback visual al seleccionar un radio (cambio de color, escala, checkmark)
- [x] **Eliminar todos los estilos inline** desde `main.js` y reemplazarlos por clases CSS

---

## 2. Menú de datos (portar desde `main.py`)

En Python hay un `menu_datos()` completo con ver/editar datos, insights y gráficas. Nada de esto existe aún en la web.

### 2.1 Pantalla de datos — ver/editar

- [ ] **Botón "Datos"** en la pantalla inicial que lleve al menú de datos
- [ ] **Vista de tabla de todas las tonalidades**: una tabla o grid de cards mostrando, por cada tonalidad:
  - Nombre de la tonalidad (mayor / menor)
  - Número de alteraciones + símbolo
  - Velocidad actual de cada apartado
  - Dificultad actual de cada apartado
  - Días sin tocarla
  - Indicador visual de `cambios_recientes`
- [ ] **Edición individual**: al hacer click en una tonalidad, abrir un modal o pantalla donde se puedan editar:
  - Activar/desactivar apartados (checkboxes o toggles)
  - Cambiar velocidad manualmente (input numérico o slider con los pasos discretos)
  - Cambiar dificultad manualmente
  - Resetear los valores de esa tonalidad
- [ ] **Edición global** (equivalente a `editar_global()` de Python):
  - Seleccionar un apartado (e.g. "terceras_mayor") y cambiar su configuración `[enabled, {v, d}]` para TODAS las tonalidades a la vez
  - Un formulario con los mismos controles que la edición individual, pero con un aviso de "esto afecta a todas las tonalidades"

### 2.2 Insights

El `insights()` de Python está vacío (`pass`). Ideas de implementación:

- [ ] **Resumen general**: total de sesiones, días consecutivos, etc.
- [ ] **Tonalidad más/menos tocada**: calcular desde el historial cuántas veces se ha tocado cada tonalidad
- [ ] **Apartado más débil**: encontrar cuáles tienen velocidad más baja o dificultad más alta
- [ ] **Racha de días**: calcular días consecutivos de práctica desde el historial (streak)
- [ ] **Velocidad media global** y por tonalidad
- [ ] **Evolución de dificultad**: para cada tonalidad, mostrar si la dificultad ha subido o bajado últimamente
- [ ] **Escalas que necesitan atención**: tonalidades con muchos días sin tocar + velocidad baja

### 2.3 Gráficas

El `graficas()` de Python está vacío (`pass`). Implementación con **Chart.js** (`<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`):

- [ ] **Gráfica de velocidad por tonalidad**: bar chart con la velocidad actual de un apartado seleccionado (e.g. "normal_mayor") para cada tonalidad. Permite ver de un vistazo qué tonalidades van más lentas
- [ ] **Evolución de velocidad en el tiempo**: line chart. Eje X = fechas (del historial), eje Y = velocidad. Filtrar por tonalidad y apartado. Permite ver el progreso
- [ ] **Heatmap de práctica** (calendar heatmap): rejilla estilo GitHub contributions. Cada celda = un día, color según número de escalas tocadas. Se puede hacer con un `<canvas>` o celdas CSS sin librería
- [ ] **Distribución de ejecución**: pie/doughnut chart con % de "perfecto", "bien", "mal" global o filtrado por tonalidad
- [ ] **Gráfica radar** de velocidades: un radar chart donde cada eje es una tonalidad, y el valor es la velocidad del apartado "normal". Permite ver el "perfil" de nivel
- [ ] **Días sin tocar por tonalidad**: bar chart horizontal, coloreado por urgencia (verde < 3 días, amarillo 3-5, rojo > 5)

---

## 3. Funcionalidades que faltan / paridad con Python

- [ ] **`dias_sin_tocarla` no se actualiza**: en Python, al acabar la sesión se hace `datos[tonalidad]["dias_sin_tocarla"] = 0` para las tocadas y `+= 1` para las no tocadas. En JS solo se resetea a 0 en el Python; en `main.js` no se modifica nunca. Hay que:
  - Poner a 0 las tocadas hoy al acabar la sesión
  - Incrementar en 1 las no tocadas (esto requiere saber la fecha de la última sesión, o hacerlo en el momento)
- [ ] **Feedback visual de ejecución → cambio de velocidad**: en `acabarTonalidad()`, la lógica de `d === 8` / `d === 0` existe, pero:
  - Falta actualizar la dificultad (`d`) según la ejecución (perfecto → d-1, mal → d+1, bien → sin cambio). Actualmente solo cambia velocidad cuando d llega a los extremos, pero nunca se modifica d según la ejecución reportada
  - Falta llamar a `saveData(datos)` después de modificar los datos en la sesión
- [ ] **Guardar datos al acabar sesión**: `acabarSesion()` solo hace `alert` y recarga la pantalla. Debería guardar los datos modificados con `saveData(datos)` antes
- [ ] **Confirmación si se piden más escalas que las disponibles** (hay un TODO en el código): si `cantidadHoy > tonalidades.length`, avisar al usuario de que algunas se repetirán
- [ ] **Pantalla de settings**:
  - Opción de idioma (spanish / english) — actualmente no se usa para nada en la web
  - Opción de velocidades discretas vs continuas — ya funciona en la lógica, pero no hay UI para cambiarlo
  - Guardar/cargar settings con `saveSettings()`
- [ ] **Mostrar nombre legible de la tonalidad**: en Python se muestra "3#" con un símbolo. En la web, `tocarTonalidad` muestra la key cruda ("sostenido3"). Debería mostrarse "3♯" o "La Mayor / Fa♯ menor" usando los campos `mayor` y `menor` del JSON

---

## 4. UX y flujo de sesión

- [ ] **Barra de progreso de sesión**: mostrar "Escala 3 de 8" o una barra visual durante la sesión
- [ ] **Resumen al acabar sesión**: en vez de solo un `alert`, mostrar una pantalla de resumen con:
  - Tonalidades tocadas
  - Resultados (cuántos perfecto/bien/mal)
  - Cambios de velocidad que ocurrieron
  - Tiempo total de sesión (si se quiere cronometrar)
- [ ] **Botón "Atrás" / navegación**: en la pantalla de cantidad debería haber un botón para volver a la pantalla inicial
- [ ] **Preselección de cantidad**: en vez de solo un input numérico, ofrecer botones rápidos (3, 5, 8, "Todas") más el input libre
- [ ] **Confirmación antes de restaurar**: ya existe `confirm()`, pero podría ser un modal bonito en vez del modal nativo del navegador
- [ ] **Evitar f5 accidental**: avisar con `beforeunload` si hay una sesión en curso, para no perder progreso

---

## 5. Ideas nuevas

### 5.1 Metrónomo integrado

- [ ] **Metrónomo con Web Audio API**: al mostrar un apartado, poder darle play a un metrónomo a la velocidad indicada. Implementación: crear un `AudioContext`, programar clicks con `OscillatorNode` o un buffer de sample. Hay librerías ligeras como [Tone.js](https://tonejs.github.io/) si se quiere simplificar
- [ ] Controles: play/pause, volumen, quizás diferentes sonidos de click

### 5.2 Temporizador por apartado

- [ ] **Timer visible**: cuando se está tocando un apartado, mostrar un cronómetro que marca cuánto tiempo se lleva. Útil para medir el tiempo de práctica
- [ ] Registrar el tiempo en el historial (campo extra `duracion_segundos`)

### 5.3 Modo repaso rápido

- [ ] Modo donde solo se muestran tonalidades con `dias_sin_tocarla > X` o dificultad > 6, para sesiones cortas enfocadas en lo débil
- [ ] Selección inteligente que priorice más las tonalidades con peor relación velocidad/dificultad

### 5.4 Logros y gamificación

- [ ] **Badges/logros**: "5 días seguidos", "todas las tonalidades a 100+ BPM", "sesión perfecta (todo perfecto)", "completaste todas las tonalidades en una semana"
- [ ] **Nivel general**: una puntuación global calculada a partir de la media de velocidades ponderada por dificultad
- [ ] **Streak counter** visible en la pantalla inicial: "🔥 7 días seguidos"

### 5.5 Sistema de notificaciones / recordatorio

- [ ] **Notification API del navegador**: recordar al usuario que debe practicar, si han pasado X horas
- [ ] Requiere `Notification.requestPermission()` y un Service Worker si se quiere offline

### 5.6 PWA (Progressive Web App)

- [ ] **Manifest + Service Worker**: convertir la app en una PWA instalable, con icono, splash screen, y que funcione offline (los datos ya están en localStorage)
- [ ] Archivo `manifest.json` con nombre, iconos, colores
- [ ] Service Worker para cachear `index.html`, `main.js`, `style.css`, `data_template.json`

### 5.7 Exportar/compartir resumen de sesión

- [ ] Al acabar una sesión, generar una imagen o texto compartible (e.g. "Hoy toqué 5 escalas, 3 perfectas, velocidad media 96 BPM 🎶")
- [ ] Copiar al clipboard o compartir via Web Share API (`navigator.share()`)

### 5.8 Vista de círculo de quintas

- [ ] Mostrar las tonalidades en un **círculo de quintas visual** (SVG o canvas), coloreado por velocidad, dificultad, o días sin tocar. Permite una vista intuitiva del estado general
- [ ] Implementación: SVG con 12 sectores (o 15 contando enarmónicos), cada uno clicable para ver detalles

### 5.9 Notas libres por tonalidad

- [ ] **Campo de texto libre** por tonalidad donde el usuario pueda anotar cosas ("ojo con el paso de 4ª a 5ª en la bajada", "digitación alternativa en el arpegio")
- [ ] Guardar en el JSON del data, campo `notas: ""`

### 5.10 Backup automático en la nube

- [ ] Sincronización opcional con un backend simple (Firebase Realtime DB, Supabase, o incluso un Gist de GitHub)
- [ ] De momento podría ser tan sencillo como guardar/leer de un **GitHub Gist** con un token personal, sin backend propio

### 5.11 Modos de práctica alternativos

- [ ] **Modo aleatorio puro**: no seguir el sistema de repetición espaciada, simplemente lanzar tonalidades al azar
- [ ] **Modo "examen"**: elegir X tonalidades al azar, tocarlas todas a la velocidad más alta alcanzada. No cambia velocidad, solo registra resultados. Muestra un porcentaje final de acierto
- [ ] **Modo enfocado**: el usuario elige manualmente qué tonalidad(es) practicar, sin selección automática

---

## 6. Bugs conocidos y deuda técnica

- [ ] **`dias_sin_tocarla` nunca se decrementa/incrementa** en la versión web (ver sección 3)
- [ ] **Dificultad `d` no se modifica con la ejecución** del usuario — la lógica está incompleta (ver sección 3)
- [ ] **No se llama a `saveData()` tras la sesión**: los cambios de velocidad se pierden al recargar
- [ ] **`cambios_recientes` nunca se usa**: el campo existe en el JSON pero no se consulta ni modifica en ningún sitio (ni en Python ni en JS). Decidir si se usa (e.g. para marcar tonalidades con cambios recientes en la UI) o se elimina
- [ ] **`elegirEscalas()` puede dar problemas** si `cantidadHoy` es 0 o negativo — añadir validación
- [ ] **`simbolos` nunca se usa** en `main.js`: la constante está definida pero no se aplica para mostrar nombres bonitos de tonalidades
- [ ] **No hay validación de formularios**: si el usuario no selecciona ningún radio button y pasa a siguiente, `ejecucion` queda `null`
- [ ] Mover las funciones `window.exportarDatos` y `window.importarDatos` a funciones normales (actualmente se asignan a `window` explícitamente, lo cual es innecesario con `onclick` en innerHTML)

---

## 7. Orden sugerido de implementación

| Prioridad | Tarea                                                                 | Esfuerzo |
| --------- | --------------------------------------------------------------------- | -------- |
| 🔴 Alta    | Crear `style.css` con diseño base (dark mode, tipografía, botones)    | Medio    |
| 🔴 Alta    | Corregir bugs de lógica (guardar datos, actualizar dificultad y días) | Bajo     |
| 🟡 Media   | Pantalla de resumen al acabar sesión                                  | Bajo     |
| 🟡 Media   | Nombres legibles de tonalidades (Mayor/menor + símbolo)               | Bajo     |
| 🟡 Media   | Menú de datos — ver tabla de tonalidades                              | Medio    |
| 🟡 Media   | Menú de datos — edición individual                                    | Medio    |
| 🟡 Media   | Pantalla de settings                                                  | Bajo     |
| 🟡 Media   | Barra de progreso en sesión                                           | Bajo     |
| 🟢 Baja    | Edición global de apartados                                           | Medio    |
| 🟢 Baja    | Insights desde historial                                              | Medio    |
| 🟢 Baja    | Gráficas con Chart.js                                                 | Alto     |
| 🔵 Extra   | Metrónomo integrado (Web Audio API)                                   | Alto     |
| 🔵 Extra   | PWA (manifest + service worker)                                       | Medio    |
| 🔵 Extra   | Círculo de quintas visual (SVG)                                       | Alto     |
| 🔵 Extra   | Gamificación (streaks, badges)                                        | Medio    |
| 🔵 Extra   | Modos de práctica alternativos                                        | Medio    |
| 🔵 Extra   | Backup en la nube                                                     | Alto     |
