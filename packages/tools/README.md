# Tools

Este paquete contiene los scripts para procesar y adaptar el [archivo origen de palabras](https://cfenollosa.com/misc/palabras.csv.gz) al formato requerido por la app.

## Pre-requisitos

Para poder hacer la conversión del archivo CSV a JSON es necesario tener instalado [Miller](https://github.com/johnkerl/miller).

## Uso

- **Actualizar el diccionario** de palabras y transformar a JSON: `npm run words:update`
- **Generar los JSON para la app**: `npm run words:build`
- **Los 2 anteriores**: `npm run build`
- Copiar los JSON generados en la app: `npm run copy-output`