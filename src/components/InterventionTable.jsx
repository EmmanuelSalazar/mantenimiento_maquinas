import React from 'react';
import { Calendar, User, FileText, Wrench, Edit, X, Save, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useInterventions } from '../context/InterventionContext';

const InterventionTable = ({ interventions = [], onInterventionUpdated }) => {
  const { mechanics, updateIntervention } = useInterventions();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIntervention, setEditingIntervention] = useState(null);
  const [formData, setFormData] = useState({
    maintenanceType: '',
    responsible: '',
    observations: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const MaintenanceType = {
    1: 'Preventivo',
    2: 'Correctivo',
    3: 'Predictivo',
    4: 'Emergencia'
  }

  const getMaintenanceTypeColor = (type) => {
    let tipo = MaintenanceType[type];
    
    const colors = {
      'Preventivo': 'bg-blue-100 text-blue-800',
      'Correctivo': 'bg-red-100 text-red-800',
      'Predictivo': 'bg-yellow-100 text-yellow-800',
      'Emergencia': 'bg-orange-100 text-orange-800'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800';
  };

  const handleEditIntervention = (intervention) => {
    setEditingIntervention(intervention);
    setFormData({
      maintenanceType: intervention.tipo.toString(),
      responsible: intervention.responsable,
      observations: intervention.observacion
    });
    setShowEditModal(true);
    setErrors({});
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingIntervention(null);
    setFormData({
      maintenanceType: '',
      responsible: '',
      observations: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.maintenanceType.trim()) {
      newErrors.maintenanceType = 'El tipo de mantenimiento es requerido';
    }
    
    if (!formData.responsible.trim()) {
      newErrors.responsible = 'El responsable es requerido';
    }
    
    if (!formData.observations.trim()) {
      newErrors.observations = 'Las observaciones son requeridas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const updatedIntervention = {
        ...editingIntervention,
        tipo: parseInt(formData.maintenanceType),
        responsable: formData.responsible,
        observacion: formData.observations
      };
      await updateIntervention(updatedIntervention)

/*       console.log('Intervención actualizada:', updatedIntervention);
 */      
      // Simular proceso de guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      handleCloseModal();
      
      // Notificar al componente padre si es necesario
      if (onInterventionUpdated) {
        onInterventionUpdated(updatedIntervention);
      }
      
    } catch (error) {
      console.error('Error al actualizar la intervención:', error);
      alert('Error al actualizar la intervención');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (interventions?.length === 0) {
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
    <>
      <div className="overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
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
            <div className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Acciones
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {interventions?.map((intervention, index) => (
            <div 
              key={intervention?.ID}
              className={`px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div className="font-medium text-gray-900">
                  {formatDate(intervention?.fecha || '-')}
                </div>
                <div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    getMaintenanceTypeColor(intervention?.tipo || '-')
                  }`}>
                    {MaintenanceType[intervention?.tipo || '-'] || '-'}
                  </span>
                </div>
                <div className="text-gray-700 font-medium">
                  {intervention?.responsable || '-'}
                </div>
                <div className="text-gray-600">
                  <p className="line-clamp-2 leading-relaxed">
                    {intervention?.observacion || '-'}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleEditIntervention(intervention)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="Editar intervención"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Intervention Modal */}
      {showEditModal && editingIntervention && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Editar Intervención
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información de la intervención */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Información de la Intervención</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">ID:</span>
                      <span className="ml-2 font-medium">{editingIntervention.ID}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Fecha:</span>
                      <span className="ml-2 font-medium">{formatDate(editingIntervention.fecha)}</span>
                    </div>
                  </div>
                </div>

                {/* Tipo de Mantenimiento */}
                <div>
                  <label htmlFor="maintenanceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Mantenimiento <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="maintenanceType"
                    value={formData.maintenanceType}
                    onChange={(e) => handleInputChange('maintenanceType', e.target.value)}
                    className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.maintenanceType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccione el tipo de mantenimiento</option>
                    <option value="1">Preventivo</option>
                    <option value="2">Correctivo</option>
                    <option value="3">Predictivo</option>
                    <option value="4">Emergencia</option>
                  </select>
                  {errors.maintenanceType && (
                    <div className="mt-2 flex items-center text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.maintenanceType}
                    </div>
                  )}
                </div>

                {/* Responsable */}
                <div>
                  <label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-2">
                    Responsable <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="responsible"
                    value={formData.responsible}
                    onChange={(e) => handleInputChange('responsible', e.target.value)}
                    className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.responsible ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccione el responsable</option>
                    {mechanics.map(mechanic => (
                      <option key={mechanic.ID} value={mechanic.ID}>
                        {mechanic.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.responsible && (
                    <div className="mt-2 flex items-center text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.responsible}
                    </div>
                  )}
                </div>

                {/* Observaciones */}
                <div>
                  <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-2">
                    Observaciones <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="observations"
                    rows={4}
                    value={formData.observations}
                    onChange={(e) => handleInputChange('observations', e.target.value)}
                    placeholder="Describa los detalles de la intervención..."
                    className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.observations ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.observations && (
                    <div className="mt-2 flex items-center text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.observations}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterventionTable;