import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Users, Wrench, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useInterventions } from '../context/InterventionContext';

const ConfigurationPage = () => {
  const { mechanics, machines, addMechanic, updateMechanic, deleteMechanic, addMachine, updateMachine, deleteMachine } = useInterventions();
  
  const [activeTab, setActiveTab] = useState('mechanics');
  const [showMechanicForm, setShowMechanicForm] = useState(false);
  const [showMachineForm, setShowMachineForm] = useState(false);
  const [editingMechanic, setEditingMechanic] = useState(null);
  const [editingMachine, setEditingMachine] = useState(null);
  
  const [mechanicForm, setMechanicForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: ''
  });
  
  const [machineForm, setMachineForm] = useState({
    serial: '',
    type: '',
    brand: '',
    code: '',
    location: ''
  });

  const handleMechanicSubmit = (e) => {
    e.preventDefault();
    if (editingMechanic) {
      updateMechanic(editingMechanic.id, mechanicForm);
      setEditingMechanic(null);
    } else {
      addMechanic(mechanicForm);
    }
    setMechanicForm({ name: '', email: '', phone: '', specialty: '' });
    setShowMechanicForm(false);
  };

  const handleMachineSubmit = (e) => {
    e.preventDefault();
    if (editingMachine) {
      updateMachine(editingMachine.id, machineForm);
      setEditingMachine(null);
    } else {
      addMachine(machineForm);
    }
    setMachineForm({ serial: '', type: '', brand: '', code: '', location: '' });
    setShowMachineForm(false);
  };

  const startEditMechanic = (mechanic) => {
    setEditingMechanic(mechanic);
    setMechanicForm(mechanic);
    setShowMechanicForm(true);
  };

  const startEditMachine = (machine) => {
    setEditingMachine(machine);
    setMachineForm(machine);
    setShowMachineForm(true);
  };

  const cancelForm = () => {
    setShowMechanicForm(false);
    setShowMachineForm(false);
    setEditingMechanic(null);
    setEditingMachine(null);
    setMechanicForm({ name: '', email: '', phone: '', specialty: '' });
    setMachineForm({ serial: '', type: '', brand: '', code: '', location: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
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
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-purple-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>
              </div>
            </div>
            <p className="text-gray-600">
              Administre mecánicos y máquinas del sistema
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('mechanics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'mechanics'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-5 w-5 inline mr-2" />
                Mecánicos
              </button>
              <button
                onClick={() => setActiveTab('machines')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'machines'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Wrench className="h-5 w-5 inline mr-2" />
                Máquinas
              </button>
            </nav>
          </div>

          {/* Mechanics Tab */}
          {activeTab === 'mechanics' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Mecánicos</h2>
                <button
                  onClick={() => setShowMechanicForm(true)}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Añadir Mecánico
                </button>
              </div>

              {/* Mechanics List */}
              <div className="space-y-4">
                {mechanics.map((mechanic) => (
                  <div key={mechanic.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{mechanic.name}</h3>
                      <p className="text-sm text-gray-600">{mechanic.email} • {mechanic.phone}</p>
                      <p className="text-sm text-purple-600 font-medium">{mechanic.specialty}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditMechanic(mechanic)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMechanic(mechanic.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {mechanics.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No hay mecánicos registrados
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Machines Tab */}
          {activeTab === 'machines' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Máquinas</h2>
                <button
                  onClick={() => setShowMachineForm(true)}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Añadir Máquina
                </button>
              </div>

              {/* Machines List */}
              <div className="space-y-4">
                {machines.map((machine) => (
                  <div key={machine.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{machine.code} - {machine.type}</h3>
                      <p className="text-sm text-gray-600">Serial: {machine.serial} • Marca: {machine.brand}</p>
                      <p className="text-sm text-purple-600 font-medium">Ubicación: {machine.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditMachine(machine)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMachine(machine.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {machines.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No hay máquinas registradas
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mechanic Form Modal */}
        {showMechanicForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingMechanic ? 'Editar Mecánico' : 'Añadir Mecánico'}
                  </h3>
                  <button
                    onClick={cancelForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleMechanicSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={mechanicForm.name}
                      onChange={(e) => setMechanicForm({...mechanicForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={mechanicForm.email}
                      onChange={(e) => setMechanicForm({...mechanicForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      value={mechanicForm.phone}
                      onChange={(e) => setMechanicForm({...mechanicForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Especialidad
                    </label>
                    <select
                      required
                      value={mechanicForm.specialty}
                      onChange={(e) => setMechanicForm({...mechanicForm, specialty: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar especialidad</option>
                      <option value="Mecánica General">Mecánica General</option>
                      <option value="Electrónica">Electrónica</option>
                      <option value="Hidráulica">Hidráulica</option>
                      <option value="Neumática">Neumática</option>
                      <option value="Soldadura">Soldadura</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingMechanic ? 'Actualizar' : 'Guardar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Machine Form Modal */}
        {showMachineForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingMachine ? 'Editar Máquina' : 'Añadir Máquina'}
                  </h3>
                  <button
                    onClick={cancelForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleMachineSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código
                    </label>
                    <input
                      type="text"
                      required
                      value={machineForm.code}
                      onChange={(e) => setMachineForm({...machineForm, code: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Serial
                    </label>
                    <input
                      type="text"
                      required
                      value={machineForm.serial}
                      onChange={(e) => setMachineForm({...machineForm, serial: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Máquina
                    </label>
                    <input
                      type="text"
                      required
                      value={machineForm.type}
                      onChange={(e) => setMachineForm({...machineForm, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marca
                    </label>
                    <input
                      type="text"
                      required
                      value={machineForm.brand}
                      onChange={(e) => setMachineForm({...machineForm, brand: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      required
                      value={machineForm.location}
                      onChange={(e) => setMachineForm({...machineForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingMachine ? 'Actualizar' : 'Guardar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPage;