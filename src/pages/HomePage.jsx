import React from 'react';
import { Link } from 'react-router-dom';
import { History, PlusCircle, Wrench, Settings } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Wrench className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">
                Sistema de Gestión de Intervenciones
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Administre y realice seguimiento de las intervenciones de mantenimiento de sus máquinas de forma eficiente
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Ver Historial */}
            <Link
              to="/historial"
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                  <History className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Ver Historial de Intervenciones
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Consulte el historial completo de todas las intervenciones realizadas, con opciones de búsqueda y filtrado avanzado.
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>

            {/* Grupos de Máquinas */}
            <Link
              to="/grupos"
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                  <Wrench className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Grupos de Referencias
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Organice las máquinas en grupos personalizados para facilitar la gestión y el mantenimiento.
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
            {/* Ingresar Intervención */}
            {/* <Link
              to="/nueva-intervencion"
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 group-hover:bg-green-200 transition-colors duration-300">
                  <PlusCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Ingresar Nueva Intervención
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Registre una nueva intervención de mantenimiento con todos los detalles necesarios para el seguimiento.
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link> */}

            {/* Configuración */}
            <Link
              to="/configuracion"
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Configuración
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Administre mecánicos y máquinas del sistema. Configure usuarios y equipos disponibles.
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-500">
              Sistema de gestión profesional para control de mantenimiento industrial
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;