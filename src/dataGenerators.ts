import { Country, GeneratedRecord } from './types';
import { countryConfigs } from './countryData';

const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomItem = <T>(array: T[]): T => {
  return array[random(0, array.length - 1)];
};

export const generateSpanishDNI = (): string => {
  const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const number = random(10000000, 99999999);
  const letterIndex = number % 23;
  return `${number}${dniLetters[letterIndex]}`;
};

export const generateMexicanRFC = (name: string, surname: string): string => {
  const getInitials = (str: string): string => {
    const vowels = 'AEIOU';
    const firstVowel = str.slice(1).split('').find(c => vowels.includes(c.toUpperCase()));
    return str[0].toUpperCase() + (firstVowel || 'X').toUpperCase();
  };

  const surnameInitials = getInitials(surname);
  const nameInitial = name[0].toUpperCase();

  const year = random(50, 99);
  const month = String(random(1, 12)).padStart(2, '0');
  const day = String(random(1, 28)).padStart(2, '0');

  const homoclave = String(random(100, 999));

  return `${surnameInitials}${nameInitial}${year}${month}${day}${homoclave}`;
};

export const generateUSASSN = (): string => {
  const area = random(1, 899);
  const group = random(1, 99);
  const serial = random(1, 9999);

  return `${String(area).padStart(3, '0')}-${String(group).padStart(2, '0')}-${String(serial).padStart(4, '0')}`;
};

export const generateFullName = (country: Country): { firstName: string; lastName: string; fullName: string } => {
  const config = countryConfigs[country];
  const isMale = Math.random() > 0.5;

  const firstName = randomItem(isMale ? config.names.male : config.names.female);
  const lastName = country === 'usa'
    ? randomItem(config.names.surnames)
    : `${randomItem(config.names.surnames)} ${randomItem(config.names.surnames)}`;

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`
  };
};

export const generatePhone = (country: Country): string => {
  const config = countryConfigs[country];
  let number = '';

  if (country === 'spain') {
    number = `${random(6, 7)}${random(10000000, 99999999)}`;
  } else if (country === 'mexico') {
    number = `${random(1, 9)}${random(10000000, 99999999)}`;
  } else {
    number = `${random(200, 999)}-${random(100, 999)}-${random(1000, 9999)}`;
  }

  return `${config.phonePrefix} ${number}`;
};

export const generateAddress = (country: Country): string => {
  const config = countryConfigs[country];
  const streetType = randomItem(config.streetTypes);
  const streetName = randomItem(config.streets);
  const number = random(1, 999);
  const city = randomItem(config.cities);

  let postalCode = '';
  if (country === 'spain') {
    postalCode = String(random(10000, 52999)).padStart(5, '0');
  } else if (country === 'mexico') {
    postalCode = String(random(10000, 99999)).padStart(5, '0');
  } else {
    postalCode = String(random(10000, 99999)).padStart(5, '0');
  }

  if (country === 'usa') {
    return `${number} ${streetName} ${streetType}, ${city}, ${postalCode}`;
  } else {
    return `${streetType} ${streetName} ${number}, ${postalCode} ${city}`;
  }
};

export const generateDocumentID = (country: Country, firstName: string, surname: string): string => {
  if (country === 'spain') {
    return generateSpanishDNI();
  } else if (country === 'mexico') {
    return generateMexicanRFC(firstName, surname.split(' ')[0]);
  } else {
    return generateUSASSN();
  }
};

export const generateEmail = (country: Country, firstName: string, lastName: string): string => {
  const config = countryConfigs[country];
  const domain = randomItem(config.emailDomains);

  const cleanFirstName = firstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const cleanLastName = lastName.split(' ')[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const patterns = [
    `${cleanFirstName}.${cleanLastName}`,
    `${cleanFirstName}${cleanLastName}`,
    `${cleanFirstName}_${cleanLastName}`,
    `${cleanFirstName}${random(1, 999)}`
  ];

  return `${randomItem(patterns)}@${domain}`;
};

export const generateRecord = (
  country: Country,
  enabledFields: { [key: string]: boolean }
): GeneratedRecord => {
  const record: GeneratedRecord = {};

  const { firstName, lastName, fullName } = generateFullName(country);

  if (enabledFields['fullName']) {
    record['Nombre Completo'] = fullName;
  }

  if (enabledFields['phone']) {
    record['Teléfono'] = generatePhone(country);
  }

  if (enabledFields['address']) {
    record['Dirección'] = generateAddress(country);
  }

  if (enabledFields['documentId']) {
    const docLabel = country === 'spain' ? 'DNI' : country === 'mexico' ? 'RFC' : 'SSN';
    record[docLabel] = generateDocumentID(country, firstName, lastName);
  }

  if (enabledFields['email']) {
    record['Correo Electrónico'] = generateEmail(country, firstName, lastName);
  }

  return record;
};

export const generateData = (
  country: Country,
  enabledFields: { [key: string]: boolean },
  quantity: number
): GeneratedRecord[] => {
  const data: GeneratedRecord[] = [];

  for (let i = 0; i < quantity; i++) {
    data.push(generateRecord(country, enabledFields));
  }

  return data;
};
