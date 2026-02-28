import { CountryConfig } from './types';

export const countryConfigs: Record<string, CountryConfig> = {
  spain: {
    name: 'España',
    phonePrefix: '+34',
    names: {
      male: [
        'Antonio', 'José', 'Manuel', 'Francisco', 'Juan', 'David', 'Carlos', 'Javier',
        'Daniel', 'Miguel', 'Alejandro', 'Rafael', 'Fernando', 'Sergio', 'Pablo', 'Jorge',
        'Alberto', 'Luis', 'Álvaro', 'Ángel', 'Adrián', 'Diego', 'Rubén', 'Raúl'
      ],
      female: [
        'María', 'Carmen', 'Ana', 'Isabel', 'Dolores', 'Pilar', 'Teresa', 'Laura',
        'Cristina', 'Marta', 'Lucía', 'Sara', 'Paula', 'Elena', 'Sofía', 'Raquel',
        'Patricia', 'Nuria', 'Silvia', 'Rosa', 'Julia', 'Andrea', 'Alba', 'Beatriz'
      ],
      surnames: [
        'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez',
        'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno',
        'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez'
      ]
    },
    cities: [
      'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia',
      'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo'
    ],
    streets: [
      'Mayor', 'Real', 'Sol', 'Carmen', 'Iglesia', 'Plaza', 'Nueva', 'Toledo',
      'Libertad', 'San Juan', 'Constitución', 'Larga', 'Comercio', 'Cruz'
    ],
    streetTypes: ['Calle', 'Avenida', 'Plaza', 'Paseo'],
    postalCodePattern: '5',
    emailDomains: ['gmail.com', 'hotmail.es', 'yahoo.es', 'outlook.es', 'icloud.com']
  },
  mexico: {
    name: 'México',
    phonePrefix: '+52',
    names: {
      male: [
        'José', 'Juan', 'Miguel', 'Carlos', 'Luis', 'Jorge', 'Francisco', 'Antonio',
        'Alejandro', 'Fernando', 'Ricardo', 'Eduardo', 'Roberto', 'Daniel', 'Javier',
        'Rafael', 'Sergio', 'Manuel', 'Pedro', 'Raúl', 'Arturo', 'Ángel', 'Diego'
      ],
      female: [
        'María', 'Guadalupe', 'Rosa', 'Juana', 'Ana', 'Patricia', 'Carmen', 'Laura',
        'Gabriela', 'Mónica', 'Claudia', 'Martha', 'Alejandra', 'Daniela', 'Mariana',
        'Lucía', 'Sofía', 'Elena', 'Verónica', 'Andrea', 'Diana', 'Paola', 'Fernanda'
      ],
      surnames: [
        'Hernández', 'García', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez',
        'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales',
        'Reyes', 'Jiménez', 'Ruiz', 'Gutiérrez', 'Mendoza', 'Castillo', 'Vargas'
      ]
    },
    cities: [
      'Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León',
      'Juárez', 'Zapopan', 'Mérida', 'Querétaro', 'Aguascalientes', 'Toluca'
    ],
    streets: [
      'Hidalgo', 'Juárez', 'Morelos', 'Reforma', 'Independencia', 'Revolución',
      'Madero', 'Allende', 'Guerrero', 'Zaragoza', 'Carranza', 'Insurgentes'
    ],
    streetTypes: ['Calle', 'Avenida', 'Boulevard', 'Calzada'],
    postalCodePattern: '5',
    emailDomains: ['gmail.com', 'hotmail.com', 'yahoo.com.mx', 'outlook.com', 'live.com.mx']
  },
  usa: {
    name: 'Estados Unidos',
    phonePrefix: '+1',
    names: {
      male: [
        'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph',
        'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark',
        'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian'
      ],
      female: [
        'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica',
        'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley',
        'Kimberly', 'Emily', 'Donna', 'Michelle', 'Dorothy', 'Carol', 'Amanda'
      ],
      surnames: [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
        'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
        'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White'
      ]
    },
    cities: [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
      'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville'
    ],
    streets: [
      'Main', 'Oak', 'Maple', 'Washington', 'Park', 'Cedar', 'Elm', 'First',
      'Second', 'Third', 'Lake', 'Hill', 'River', 'Spring', 'Pine', 'Church'
    ],
    streetTypes: ['Street', 'Avenue', 'Drive', 'Boulevard', 'Road', 'Lane'],
    postalCodePattern: '5',
    emailDomains: ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com']
  }
};
