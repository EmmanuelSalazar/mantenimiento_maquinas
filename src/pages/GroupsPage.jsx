import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Plus, Edit, Trash2, Save, X, Search } from 'lucide-react';
import { useInterventions } from '../context/InterventionContext';

const GroupsPage = () => {
  const { machines, groups, addGroup, updateGroup, deleteGroup } = useInterventions();
  
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [groupForm, setGroupForm] = useState({
    name: '',
    selectedMachines: []
  });

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    if (editingGroup) {
      updateGroup({ ...groupForm, id: editingGroup.id });
      setEditingGroup(null);
    } else {
      addGroup(groupForm);
    }
    setGroupForm({ name: '', selectedMachines: [] });
    setShowGroupForm(false);
  };

  const startEditGroup = (group) => {
    setEditingGroup(group);
    setGroupForm({
      name: group.name,
      selectedMachines: group.machines || []
    });
    setShowGroupForm(true);
  };

  const cancelForm = () => {
    setShowGroupForm(false);
    setEditingGroup(null);
    setGroupForm({ name: '', selectedMachines: [] });
  };

  const toggleMachineSelection = (machine) => {
    const isSelected = groupForm.selectedMachines.some(m => m.id === machine.id);
    if (isSelected) {
      setGroupForm({
        ...groupForm,
        selectedMachines: groupForm.selectedMachines.filter(m => m.id !== machine.id)
      });
    } else {
      setGroupForm({
        ...groupForm,
        selectedMachines: [...groupForm.selectedMachines, machine]
      });
    }
  };

  const filteredMachines = machines.filter(machine =>
    machine.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.maquina.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <Users className="h-8 w-8 text-orange-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Grupos de Máquinas</h1>
              </div>
            </div>
            <p className="text-gray-600">
              Organice las máquinas en grupos personalizados para facilitar la gestión
            </p>
          </div>
        </div>

        {/* Groups Management */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Gestión de Grupos</h2>
              <button
                onClick={() => setShowGroupForm(true)}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Crear Grupo
              </button>
            </div>

            {/* Groups List */}
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
                      <p className="text-sm text-gray-600">
                        {group.machines?.length || 0} máquinas en este grupo
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditGroup(group)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteGroup(group.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Machines in Group */}
                  {group.machines && group.machines.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Máquinas del grupo:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.machines.map((machine) => (
                          <div key={machine.id} className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="text-sm font-medium text-gray-900">{machine.codigo}</div>
                            <div className="text-xs text-gray-600">{machine.maquina}</div>
                            <div className="text-xs text-gray-500">{machine.marca}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {groups.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>No hay grupos creados</p>
                  <p className="text-sm">Cree su primer grupo para organizar las máquinas</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Group Form Modal */}
        {showGroupForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingGroup ? 'Editar Grupo' : 'Crear Nuevo Grupo'}
                  </h3>
                  <button
                    onClick={cancelForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleGroupSubmit} className="space-y-6">
                  {/* Group Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Grupo
                    </label>
                    <input
                      type="text"
                      required
                      value={groupForm.name}
                      onChange={(e) => setGroupForm({...groupForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ingrese el nombre del grupo"
                    />
                  </div>

                  {/* Machine Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Máquinas ({groupForm.selectedMachines.length} seleccionadas)
                    </label>
                    
                    {/* Search */}
                    <div className="relative mb-4">
                      <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Buscar máquinas..."
                      />
                    </div>

                    {/* Machines List */}
                    <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
                      {filteredMachines.map((machine) => {
                        const isSelected = groupForm.selectedMachines.some(m => m.id === machine.id);
                        return (
                          <div
                            key={machine.id}
                            className={`p-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                              isSelected ? 'bg-orange-50 border-orange-200' : ''
                            }`}
                            onClick={() => toggleMachineSelection(machine)}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleMachineSelection(machine)}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mr-3"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{machine.codigo} - {machine.maquina}</div>
                                <div className="text-sm text-gray-600">Serial: {machine.serial} • Marca: {machine.marca}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {filteredMachines.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                          No se encontraron máquinas
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingGroup ? 'Actualizar Grupo' : 'Crear Grupo'}
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

export default GroupsPage;