import React from 'react';
import { Calendar, User, FileText, Wrench } from 'lucide-react';

const InterventionTable = ({ interventions }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getMaintenanceTypeColor = (type) => {
    const colors = {
      'Preventivo': 'bg-blue-100 text-blue-800',
      'Correctivo': 'bg-red-100 text-red-800',
      'Predictivo': 'bg-yellow-100 text-yellow-800',
      'Emergencia': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (interventions.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="flex flex-col items-center">
          <FileText className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            No hay intervenciones registradas
          </h3>
          <p className="text-gray-400 mb-4">
            Aún no se han registrado intervenciones para esta máquina
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-3 border-b">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Fecha
          </div>
          <div className="flex items-center">
            <Wrench className="h-4 w-4 mr-2" />
            Tipo de Mantenimiento
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Responsable
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Observación
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {interventions.map((intervention, index) => (
          <div 
            key={intervention.id}
            className={`px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="font-medium text-gray-900">
                {formatDate(intervention.date)}
              </div>
              <div>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  getMaintenanceTypeColor(intervention.maintenanceType)
                }`}>
                  {intervention.maintenanceType}
                </span>
              </div>
              <div className="text-gray-700 font-medium">
                {intervention.responsible}
              </div>
              <div className="text-gray-600">
                <p className="line-clamp-2 leading-relaxed">
                  {intervention.observations}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionTable;