<div align="center">
  <h1><img src="./docs/palabras-encadenadas.png" alt="Palabras Encadenadas"></h1>

[![CI status](https://github.com/kcmr/palabras-encadenadas/actions/workflows/app-validate.yml/badge.svg)](https://github.com/kcmr/palabras-encadenadas/actions/workflows/app-validate.yml)
[![CD status](https://github.com/kcmr/palabras-encadenadas/actions/workflows/production-deploy.yml/badge.svg)](https://github.com/kcmr/palabras-encadenadas/actions/workflows/production-deploy.yml)
[![codecov](https://codecov.io/gh/kcmr/palabras-encadenadas/branch/main/graph/badge.svg?token=Wt7bchJC5M)](https://codecov.io/gh/kcmr/palabras-encadenadas)
</div>

## Acerca de

El juego es un proyecto personal que surgió tras comprobar que no existía (o yo no la encontré) una **versión online y en español** del clásico [**juego de encadenar palabras**](https://palabras-encadenadas.app).

Utiliza un [**Diccionario libre en español** de Carlos Fenollosa](https://cfenollosa.com/blog/diccionario-libre-en-espanol---free-spanish-dictionary.html) sin el que no hubiera sido posible y que descubrí gracias a [**Palabros** de @vermicida](https://github.com/vermicida/palabros).

## Monorepo

Este repositorio contiene **varios paquetes** gestionados mediante [pnpm workspaces](https://pnpm.io/workspaces):

- [**app**](./packages/app/): contiene el código de la aplicación web.
- [**tools**](./packages/tools/): contiene scripts para procesar el diccionario y adaptarlo al formato requerido por la app.

## Tecnologías

La aplicación utiliza:

- React 18
- TypeScript
- CSS modules
- pnpm workspaces
- Parcel v2 (bundler)
- Vitest con React Testing Library
- Github Actions (CI/CD)
- Vercel (hosting)

## Desarrollo

### Pre-requisitos

- Node >= 20
- pnpm >= 10
- [Miller](https://github.com/johnkerl/miller) para la conversión de CSV a JSON

### Instalación

```bash
# Instalar dependencias
pnpm install
```

### Comandos

Los siguientes **comandos pnpm** se pueden ejecutar desde la raíz del monorepo:

- `pnpm start`: lanza la app en modo desarrollo.
- `pnpm test`: ejecuta los test en modo _watch_ para todos los paquetes.
- `pnpm run test:coverage`: ejecuta los tests con reporte de cobertura.
- `pnpm run lint`: ejecuta ESLint para todos los paquetes.
- `pnpm run lint:fix`: ejecuta ESLint corrigiendo errores.

Para ejecutar un script de un paquete en concreto desde la raíz del repositorio, utiliza el flag `-F` con el nombre del paquete. Ejemplo: `pnpm run words:update -F tools`.

## Agradecimientos

A [Carlos Fenollosa](https://cfenollosa.com/blog/index.html) por su **Diccionario libre en español** y a [Diego Herrera (@vermicida)](https://github.com/vermicida) por contar cómo hizo su **Palabros**.

## Licencia

Este proyecto está bajo una [licencia MIT](LICENSE.md).










