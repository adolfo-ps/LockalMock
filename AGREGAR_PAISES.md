# Guía para Agregar Nuevos Países

Esta guía te ayudará a expandir LocalMock para soportar más países de manera fácil y organizada.

## Estructura del Código

El código está modularizado para facilitar la adición de nuevos países:

- **`src/types.ts`**: Definiciones de tipos TypeScript
- **`src/countryData.ts`**: Configuración de datos para cada país (nombres, calles, ciudades, etc.)
- **`src/dataGenerators.ts`**: Funciones que generan datos falsos
- **`src/exportUtils.ts`**: Funciones de exportación (JSON, CSV, SQL)
- **`src/App.tsx`**: Interfaz de usuario

## Pasos para Agregar un Nuevo País

### 1. Actualizar el Tipo de País

En `src/types.ts`, agrega el nuevo país al tipo `Country`:

```typescript
export type Country = 'spain' | 'mexico' | 'usa' | 'argentina'; // Agrega aquí
```

### 2. Agregar Configuración del País

En `src/countryData.ts`, agrega la configuración del nuevo país al objeto `countryConfigs`:

```typescript
argentina: {
  name: 'Argentina',
  phonePrefix: '+54',
  names: {
    male: ['Juan', 'Carlos', 'Luis', 'Jorge', 'Pedro'],
    female: ['María', 'Ana', 'Laura', 'Gabriela', 'Sofía'],
    surnames: ['González', 'Rodríguez', 'López', 'García', 'Martínez']
  },
  cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'],
  streets: ['San Martín', 'Belgrano', 'Rivadavia', '9 de Julio'],
  streetTypes: ['Calle', 'Avenida', 'Pasaje', 'Boulevard'],
  postalCodePattern: '4',
  emailDomains: ['gmail.com', 'hotmail.com', 'yahoo.com.ar']
}
```

### 3. Crear Función para Documento de Identidad

En `src/dataGenerators.ts`, agrega una función específica para generar el documento de identidad del nuevo país:

```typescript
export const generateArgentinaDNI = (): string => {
  // DNI argentino: 8 dígitos
  const number = random(10000000, 99999999);
  return String(number);
};
```

### 4. Actualizar la Función de Generación de Documentos

En `src/dataGenerators.ts`, actualiza la función `generateDocumentID` para incluir el nuevo país:

```typescript
export const generateDocumentID = (country: Country, firstName: string, surname: string): string => {
  if (country === 'spain') {
    return generateSpanishDNI();
  } else if (country === 'mexico') {
    return generateMexicanRFC(firstName, surname.split(' ')[0]);
  } else if (country === 'usa') {
    return generateUSASSN();
  } else if (country === 'argentina') {
    return generateArgentinaDNI();
  }
  return '';
};
```

### 5. Actualizar la Interfaz de Usuario

En `src/App.tsx`, agrega la opción en el dropdown de países:

```tsx
<select>
  <option value="spain">España</option>
  <option value="mexico">México</option>
  <option value="usa">Estados Unidos</option>
  <option value="argentina">Argentina</option>
</select>
```

Y actualiza el texto del documento de identidad:

```tsx
<span className="text-purple-400 text-sm font-semibold">
  {country === 'spain' && '(DNI con letra válida)'}
  {country === 'mexico' && '(RFC válido)'}
  {country === 'usa' && '(SSN)'}
  {country === 'argentina' && '(DNI)'}
</span>
```

### 6. Actualizar Generadores de Teléfono y Dirección (Opcional)

Si el nuevo país tiene un formato especial de teléfono o dirección, actualiza las funciones `generatePhone` y `generateAddress` en `src/dataGenerators.ts`:

```typescript
export const generatePhone = (country: Country): string => {
  const config = countryConfigs[country];
  let number = '';

  if (country === 'spain') {
    number = `${random(6, 7)}${random(10000000, 99999999)}`;
  } else if (country === 'mexico') {
    number = `${random(1, 9)}${random(10000000, 99999999)}`;
  } else if (country === 'usa') {
    number = `${random(200, 999)}-${random(100, 999)}-${random(1000, 9999)}`;
  } else if (country === 'argentina') {
    number = `11 ${random(1000, 9999)}-${random(1000, 9999)}`;
  }

  return `${config.phonePrefix} ${number}`;
};
```

## Validación de Documentos

Para documentos que requieren validación matemática (como el DNI español con letra de control), asegúrate de implementar el algoritmo de validación correcto en la función generadora.

### Ejemplo: DNI Español

```typescript
export const generateSpanishDNI = (): string => {
  const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const number = random(10000000, 99999999);
  const letterIndex = number % 23; // Algoritmo de validación
  return `${number}${dniLetters[letterIndex]}`;
};
```

## Recursos Útiles

- [Lista de prefijos telefónicos por país](https://en.wikipedia.org/wiki/List_of_country_calling_codes)
- [Formatos de documentos de identidad](https://en.wikipedia.org/wiki/National_identification_number)
- [Nombres comunes por país](https://en.wikipedia.org/wiki/List_of_most_popular_given_names)

## Prueba tu Implementación

1. Ejecuta `npm run typecheck` para verificar que no hay errores de tipos
2. Ejecuta `npm run build` para asegurarte de que compila correctamente
3. Prueba la aplicación seleccionando el nuevo país y exportando datos

---

Con esta estructura modular, agregar nuevos países es tan simple como seguir estos 6 pasos. Cada parte del código está claramente separada, lo que hace que el mantenimiento y la expansión sean fáciles y predecibles.
