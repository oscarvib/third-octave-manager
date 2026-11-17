# Third-Octave Manager

Herramienta en un único archivo HTML para gestionar y visualizar medidas de ruido y vibraciones en bandas de tercio y de octava. Funciona sin instalación: basta con abrir `third-octave-manager.html` en Chrome o Edge.

## Qué hace

- **Árbol de medidas editable**: carpetas y subcarpetas con clic derecho, renombrar, mover, arrastrar y soltar, deshacer.
- **Importación**
  - Excel del sonómetro Brüel & Kjær 2250 (tercios, LAeq/LCeq/LZeq, ponderación A/C/Z).
  - Señales temporales UNV (dataset 58/58b): PSD de Welch (Hann, 50 %, Δf 1 Hz) integrada por banda; nombre de canal leído del registro 9.
  - Tiempo de reverberación desde señales UNV (ISO 3382-2): respuesta impulsiva o caída de ruido interrumpido, filtros de banda de fase cero, T20/T30/EDT por banda con indicadores de calidad y media de posiciones.
  - Espectros UNV (dataset 58 con abscisa en frecuencia: espectro, autoespectro, PSD; los complejos se toman en módulo): se guardan como banda estrecha y se calculan los tercios u octavas. Referencia 20 µPa (aire) o 1 µPa (agua, detectado en los hidrófonos).
  - Excel de espectros FFT de vibraciones (se descartan las líneas por debajo de 1 Hz).
  - Excel de aislamiento a ruido aéreo: R', R'w (C; Ctr) según ISO 717-1, DnT,w, corrección por ruido de fondo (ISO 16283-1) y curvas de decaimiento con T20/T30, recta de regresión e indicadores ξ y C.
- **Visualización**
  - Bandas, banda estrecha o ambas; escala Y en dB o lineal (RMS); zoom en X con autoescalado de Y.
  - Cursor sobre bandas o sobre banda estrecha, con lectura de valores.
  - Vibración como velocidad o aceleración (solo visualización).
  - Ponderación de respuesta humana **Wm** (ISO 2631-2 / ISO 20283-5), aplicada a bandas, banda estrecha y totales.
  - Media energética de la carpeta: añadida a las curvas o «solo la media».
  - Comparación de medias energéticas de varias carpetas (o de las subcarpetas de una carpeta); cualquiera puede marcarse como ruido de fondo (área sombreada y diferencia al fondo en el cursor).
  - Los ajustes de visualización se guardan por carpeta y se aplican a todos sus espectros.
- **Imágenes de informe** (PNG para Word): título, resultado, leyenda con valores del cursor y pie; opción de guardar en un paso las imágenes de todas las medidas de una carpeta con la misma apariencia y el mismo eje Y.
- **Proyectos**: guardar, guardar como y abrir (`.json`), exportar a Excel; recuperación de la última sesión.

## Uso

**En línea:** https://oscarvib.github.io/third-octave-manager/ (siempre la última versión). En Chrome o Edge se puede instalar como aplicación con su propio icono: botón de instalar en la barra de direcciones, o menú ⋮ → *Enviar, guardar y compartir* → *Instalar página como aplicación*. Una vez instalada, también abre sin conexión.

**Archivo local:**

1. Abre `third-octave-manager.html` en el navegador.
2. Importa los archivos con **Import Excel / UNV** o arrastrándolos sobre una carpeta del árbol.
3. Guarda el proyecto con **Save** para conservar el árbol y los espectros. Las señales temporales UNV no se guardan en el proyecto, solo sus espectros.

El archivo suelto necesita internet para cargar la librería de lectura de Excel (SheetJS) y las fuentes. La versión en línea / instalada las lleva incluidas (`lib/`, `fonts/`) y funciona sin conexión.

## Licencias de terceros

- SheetJS Community Edition 0.18.5 — Apache 2.0 (`lib/SheetJS-LICENSE.txt`).
- IBM Plex — SIL Open Font License 1.1 (`fonts/OFL.txt`).

## Versiones

La versión aparece junto al título de la aplicación (por ejemplo `v1.0`) y se guarda también dentro de cada proyecto `.json`.

| Versión | Fecha | Cambios |
|---|---|---|
| 1.4 | 17/11/2026 | Comparación por medias energéticas de carpetas (selección de varias carpetas o subcarpetas de una carpeta); opción «solo la media»; curva de ruido de fondo sombreada con diferencia al fondo en el cursor. |
| 1.3 | 17/11/2026 | Tiempo de reverberación (ISO 3382-2) desde señales UNV: respuesta impulsiva (integración inversa de Schroeder, truncado de Lundeby) o ruido interrumpido; T20, T30, EDT, ξ, C, INR; media de posiciones e imagen de informe. |
| 1.2 | 15/11/2026 | La versión instalada funciona totalmente sin internet: la librería de Excel (SheetJS) y las fuentes van incluidas en el repositorio y se guardan al instalar. |
| 1.1 | 12/11/2026 | Importación de espectros UNV (sonómetro, hidrófono, acelerómetros) con cálculo de bandas; referencia 1 µPa para hidrófonos. |
| 1.0 | 12/11/2026 | Primera versión publicada en GitHub: importación 2250, UNV, FFT y aislamiento; ponderación Wm; imágenes de informe por carpeta; icono e instalación como aplicación. |
