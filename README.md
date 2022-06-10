# Calcula el porcentaje de grasa corporal

Este proyecto se encuentra disponible como [NPM Package](https://www.npmjs.com/package/body-fat-calculator-by-fromeroperez).

## Introducción para iniciar el proyecto descargado de GIT

Después de la descarga tiene que instalar las dependencias con el siguiente comando.

### `npm install`


## Introducción para usar el componente desde NPM

Deberá crear un proyecto en react.

### `npx create-react-app example`

Después incluirá el paquete con el siguiente comando.

### `npm i body-fat-calculator-by-fromeroperez --force`


A continuación un ejemplo del uso del componente.

import React from 'react'
import { BodyFatCalculator } from 'body-fat-calculator-by-fromeroperez';
import 'body-fat-calculator-by-fromeroperez/dist/assets/css/bodyFatCalculator.css'

function App() {
  return (
    `<BodyFatCalculator/>`
  );
}

export default App;


Con eso podrá llamar correctamente al componente y probar la aplicación.