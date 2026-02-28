import { GeneratedRecord } from './types';

export const exportToJSON = (data: GeneratedRecord[], filename: string = 'datos-prueba.json'): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadBlob(blob, filename);
};

export const exportToCSV = (data: GeneratedRecord[], filename: string = 'datos-prueba.csv'): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [];

  csvRows.push(headers.map(escapeCSVValue).join(','));

  data.forEach((row) => {
    const values = headers.map((header) => escapeCSVValue(row[header] || ''));
    csvRows.push(values.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
};

export const exportToSQL = (data: GeneratedRecord[], filename: string = 'datos-prueba.sql'): void => {
  if (data.length === 0) return;

  const tableName = 'datos_prueba';
  const headers = Object.keys(data[0]);

  const sqlStatements = [];

  sqlStatements.push(`-- Datos de prueba generados por LocalMock`);
  sqlStatements.push(`-- Tabla: ${tableName}`);
  sqlStatements.push(`-- Registros: ${data.length}\n`);

  sqlStatements.push(`CREATE TABLE IF NOT EXISTS ${tableName} (`);
  sqlStatements.push(`  id INT AUTO_INCREMENT PRIMARY KEY,`);
  headers.forEach((header, index) => {
    const isLast = index === headers.length - 1;
    sqlStatements.push(`  \`${header}\` VARCHAR(255)${isLast ? '' : ','}`);
  });
  sqlStatements.push(`);\n`);

  data.forEach((row) => {
    const values = headers.map((header) => escapeSQLValue(row[header] || ''));
    sqlStatements.push(`INSERT INTO ${tableName} (${headers.map(h => `\`${h}\``).join(', ')}) VALUES (${values.join(', ')});`);
  });

  const sqlString = sqlStatements.join('\n');
  const blob = new Blob([sqlString], { type: 'text/plain' });
  downloadBlob(blob, filename);
};

const escapeCSVValue = (value: string): string => {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

const escapeSQLValue = (value: string): string => {
  const escaped = value.replace(/'/g, "''");
  return `'${escaped}'`;
};

const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
