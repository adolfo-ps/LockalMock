import { useState } from 'react';
import { Download, Database, FileJson, FileText } from 'lucide-react';
import { Country } from './types';
import { generateData } from './dataGenerators';
import { exportToJSON, exportToCSV, exportToSQL } from './exportUtils';

function App() {
  const [country, setCountry] = useState<Country>('spain');
  const [quantity, setQuantity] = useState<number>(10);
  const [fields, setFields] = useState({
    fullName: true,
    phone: true,
    address: true,
    documentId: true,
    email: true,
  });

  const toggleField = (field: keyof typeof fields) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleExport = (format: 'json' | 'csv' | 'sql') => {
    const data = generateData(country, fields, quantity);

    if (data.length === 0) {
      alert('No se han seleccionado campos para generar.');
      return;
    }

    if (format === 'json') {
      exportToJSON(data);
    } else if (format === 'csv') {
      exportToCSV(data);
    } else if (format === 'sql') {
      exportToSQL(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="w-10 h-10 text-blue-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              LocalMock
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Genera datos de prueba realistas y válidos en segundos
          </p>
        </header>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                Paso 1: Selecciona el País
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as Country)}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="spain">España</option>
                <option value="mexico">México</option>
                <option value="usa">Estados Unidos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                Paso 2: Selecciona los Campos
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-900 transition-all border border-gray-700/50 hover:border-blue-500/50">
                  <input
                    type="checkbox"
                    checked={fields.fullName}
                    onChange={() => toggleField('fullName')}
                    className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300 font-medium">Nombre completo</span>
                </label>

                <label className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-900 transition-all border border-gray-700/50 hover:border-blue-500/50">
                  <input
                    type="checkbox"
                    checked={fields.phone}
                    onChange={() => toggleField('phone')}
                    className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300 font-medium">
                    Teléfono móvil{' '}
                    <span className="text-gray-500 text-sm">
                      (adaptado al país)
                    </span>
                  </span>
                </label>

                <label className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-900 transition-all border border-gray-700/50 hover:border-blue-500/50">
                  <input
                    type="checkbox"
                    checked={fields.address}
                    onChange={() => toggleField('address')}
                    className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300 font-medium">
                    Dirección completa{' '}
                    <span className="text-gray-500 text-sm">
                      (calle y código postal)
                    </span>
                  </span>
                </label>

                <label className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-900 transition-all border border-gray-700/50 hover:border-purple-500/50">
                  <input
                    type="checkbox"
                    checked={fields.documentId}
                    onChange={() => toggleField('documentId')}
                    className="w-5 h-5 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-gray-300 font-medium">
                    Documento de identidad{' '}
                    <span className="text-purple-400 text-sm font-semibold">
                      {country === 'spain' && '(DNI con letra válida)'}
                      {country === 'mexico' && '(RFC válido)'}
                      {country === 'usa' && '(SSN)'}
                    </span>
                  </span>
                </label>

                <label className="flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-900 transition-all border border-gray-700/50 hover:border-blue-500/50">
                  <input
                    type="checkbox"
                    checked={fields.email}
                    onChange={() => toggleField('email')}
                    className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300 font-medium">Correo electrónico</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                Paso 3: Cantidad de Registros
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(500, Math.max(1, Number(e.target.value))))}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="10"
              />
              <p className="text-gray-500 text-sm mt-2">
                Máximo 500 registros
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                Paso 4: Exportar Datos
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleExport('json')}
                  className="group bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 flex items-center justify-center gap-3"
                >
                  <FileJson className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>JSON</span>
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleExport('csv')}
                  className="group bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 flex items-center justify-center gap-3"
                >
                  <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>CSV</span>
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleExport('sql')}
                  className="group bg-gradient-to-br from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/50 flex items-center justify-center gap-3"
                >
                  <Database className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>SQL</span>
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Generación 100% en el navegador. Sin servidores, sin costos.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
