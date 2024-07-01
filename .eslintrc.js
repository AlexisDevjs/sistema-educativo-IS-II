module.exports = {
  env: {
    jest: true, // Esto permitirá el uso de las variables globales de Jest
    node: true, // Esto permitirá el uso de las variables globales de Node.js
    browser: true // Esto permitirá el uso de las variables globales del navegador (útil para el frontend)
  },
  globals: {
    // Otras variables globales personalizadas, si las hay
  },
  extends: ['standard'],
  rules: {
    // Reglas específicas de eslint, si las hay
  }
}
