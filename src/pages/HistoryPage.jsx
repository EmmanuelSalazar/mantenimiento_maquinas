import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Search, ArrowLeft, Calendar } from 'lucide-react';
import { useInterventions } from '../context/InterventionContext';
import MachineInfoCard from '../components/MachineInfoCard';
import InterventionTable from '../components/InterventionTable';

const HistoryPage = () => {
  const { searchTerm, setSearchTerm, filteredInterventions } = useInterventions();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link 
                  to="/"
                  className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Historial de Intervenciones</h1>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Camera className="h-5 w-5 mr-2" />
                Capturar
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por tipo de mantenimiento, responsable, observaciones o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Machine Info Card */}
        <MachineInfoCard />

        {/* Results Summary */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Intervenciones Registradas
                </h3>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredInterventions.length} registros
              </span>
            </div>
          </div>

          {/* Intervention Table */}
          <InterventionTable interventions={filteredInterventions} />
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <Link
            to="/nueva-intervencion"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Nueva Intervención
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;