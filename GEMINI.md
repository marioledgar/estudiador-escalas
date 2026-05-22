# GEMINI.md

Este proyecto utiliza JavaScript para gestionar dinámicamente el contenido de la interfaz. Los nombres de funciones y variables internas están en inglés, pero los textos de la interfaz y las claves de datos en localStorage se mantienen en español.

## Convenciones

- La interfaz inicial se genera mediante la función `initialScreen()` en `index.js`.
- Se prefiere el uso de `innerHTML` para bloques grandes de HTML estático convertidos a JS.
- **Nunca** cambies nada que no se te pida. Mantén los ids, names, textContents... en los refactors.
- Nunca edites en prompts de preguntas, solo en los de edición.
- Las claves de datos en `localStorage` (como `mayor`, `menor`, `dias_sin_tocarla`) se mantienen en español para preservar la compatibilidad con datos existentes.

## Funciones Principales

| Función | Descripción |
| :--- | :--- |
| `initialScreen()` | Genera la pantalla inicial con el botón "Tocar". |
| `askAmountScreen()` | Muestra el formulario para elegir cuántas escalas practicar. |
| `play()` | Inicia la sesión de estudio seleccionando las escalas del día. |
| `chooseScales()` | Selecciona las escalas basándose en repetición espaciada y azar. |
| `playTonality()` | Renderiza la interfaz para practicar una tonalidad específica. |
| `playSection()` | Renderiza los controles de ejecución para una sección de la escala. |
| `finishTonality()` | Procesa los resultados de ejecución y actualiza las estadísticas. |
| `changeSpeed()` | Ajusta la velocidad (BPM) basándose en el desempeño del usuario. |
| `addToHistory()` | Registra un evento de práctica en el historial. |
| `exportData()` / `importData()` | Gestiona copias de seguridad de los datos del usuario. |
