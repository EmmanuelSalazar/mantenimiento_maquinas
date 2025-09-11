import React, { useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { useInterventions } from '../context/InterventionContext';
const InterventionForm = () => {
  const navigate = useNavigate();
  const { addIntervention, mechanics } = useInterventions();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    maintenanceType: '',
    responsible: '',
    observations: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      addIntervention({
        ...formData,
        date: new Date().toISOString().split('T')[0],
        machineData: id,
        responsible: formData.responsible,
      });
      // Simular proceso de guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate(`/historial/${id}`);
    } catch (error) {
      console.error('Error al guardar la intervención:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Link 
                  to="/"
                  className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Nueva Intervención</h1>
              </div>
              <p className="text-gray-600">
                Complete el formulario con los detalles de la nueva intervención
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <h4>Maquina: <strong>{id}</strong></h4>
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
                    placeholder="Ingrese el nombre del responsable"
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
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <Link
                  to="/"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Save className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Guardando...' : 'Guardar Intervención'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionForm;