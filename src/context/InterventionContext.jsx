import React, { createContext, useContext, useState, useEffect } from 'react';
import { FetchEmpleados, AgregarEmpleado, ActualizarEmpleado, EliminarEmpleado } from '../services/api/empleados';
import { FetchMaquinas, EliminarMaquina, AgregarMaquina, ModificarMaquina } from '../services/api/maquinas';
import { ObtenerIntervenciones, AlmacenarIntervencion } from '../services/api/intervenciones';
import { ObtenerGrupos, AlmacenarGrupo } from '../services/api/grupos';

const InterventionContext = createContext(undefined);



export const InterventionProvider = ({ children }) => {
  const [maquina,setMaquina] = useState();
  const [defaultMachineData, setDefaultMachineData] = useState({
  serial: '',
  type: '',
  brand: '',
  code: ''
});
  const [interventions, setInterventions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mechanics, setMechanics] = useState([]);
  const [machines, setMachines] = useState([]);
  const [groups, setGroups] = useState([]);
// ESTE EFECTO DESCARGA TODOS LOS RECURSOS NECESARIOS PARA EL FUNCIONAMIENTO DEL SISTEMA
  useEffect(() => {
    const recursos = async () => {
      try {
        // CARGAR EMPLEADOS
        const dataEmpleados = await FetchEmpleados();
        setMechanics(dataEmpleados);
        // CARGAR MAQUINAS
        const dataMaquinas = await FetchMaquinas();
        setMachines(dataMaquinas);
        // CARGAR GRUPOS Y PARSEAR MAQUINAS
        const data = await ObtenerGrupos();
          const updatedGroups = data.map((grupo) => {
          // Para cada grupo, creamos un nuevo arreglo de máquinas.
            const updatedMaquinas = grupo.maquinas.map((maquina) => {
            // Buscamos la máquina correspondiente en el arreglo 'machines'.
              const foundMachine = dataMaquinas.find(m => m.id === String(maquina.id));
          // Devolvemos el objeto completo si se encuentra, o un objeto vacío si no.
            return foundMachine || {}; 
            });
          // Retornamos un nuevo objeto grupo con el arreglo de máquinas actualizado.
          return {
              ...grupo,
              maquinas: updatedMaquinas
          };
        });
        setGroups(updatedGroups);
      } catch (error)  {
        alert('Error: ', error || 'Ha ocurrido un error al descargar los recursos')
      }
    }
  recursos();
},[]);

// FUNCION PARA ALMACENAR INTERVENCIONES
  const addIntervention = (intervention) => {
    AlmacenarIntervencion(intervention).then(data => {
      console.log(data);
    })
    alert('Intervención almacenada correctamente');
  };
/////////////////////////////////////////////
// FUNCION PARA OBTENER INTERVENCIONES

  const getInterventions = async (codigo) => {
    const data = await ObtenerIntervenciones(codigo);
    return data;
  }
//////////////////////////////////////
// GESTION PARA MECANICOS
  const addMechanic = async (mechanic) => {
    mechanic.nombre = mechanic.name;
    try {
      console.log(mechanic);
      await AgregarEmpleado(mechanic)
      alert(`El empleado ${mechanic.nombre} ha sido añadido correctamente`);
      const data = await FetchEmpleados();
      setMechanics(data);
    } catch (error) {
      console.log(error);
    }
    
  };

  const updateMechanic = async (mechanicInfo) => {
    try {
      await ActualizarEmpleado(mechanicInfo);
      alert('Empleado actualizado correctamente');
      const data = await FetchEmpleados();
      setMechanics(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMechanic = async (id) => {
    try {
      await EliminarEmpleado(id);
      alert('Empleado eliminado correctamente');
      const data = await FetchEmpleados();
      setMechanics(data);
    } catch (error) {
      console.log(error);
    }
  };
//  GESTION DE LAS MAQUINAS
  const addMachine = async (machine) => {
    machine.maquina = machine.maquina.toUpperCase();
    machine.marca = machine.marca.toUpperCase();
    machine.codigo = machine.codigo.toUpperCase();
    machine.serial = machine.serial.toUpperCase();
    try {
      await AgregarMaquina(machine);
      alert('Maquina añadida correctamente');
      const data = await FetchMaquinas();
      setMachines(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMachine = async (updatedMachine) => {
      try {
        await ModificarMaquina(updatedMachine);
        alert('Maquina modificada correctamente');
        const data = await FetchMaquinas();
        setMachines(data);
      } catch (error) {
        console.log(error);
      }
  };

  const deleteMachine = async (id) => {
    try {
      await EliminarMaquina(id);
      alert('Maquina eliminada correctamente');
      const data = await FetchMaquinas();
      setMachines(data);
    } catch (error) {
      console.log(error);
    }
  };

  // GESTION DE GRUPOS
  const addGroup = async (group) => {
    group.selectedMachines = group.selectedMachines.map((item) => {
      return {
        id: item.id,
      }
    })
    try {
          console.log(group);
      await AlmacenarGrupo(group);
      alert('Grupo almacenado correctamente');
      const data = await ObtenerGrupos();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateGroup = (updatedGroup) => {
    const updatedGroups = groups.map(group => 
      group.id === updatedGroup.id 
        ? { ...group, name: updatedGroup.name, machines: updatedGroup.selectedMachines }
        : group
    );
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    alert('Grupo actualizado correctamente');
  };

  const deleteGroup = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este grupo?')) {
      const updatedGroups = groups.filter(group => group.id !== id);
      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      alert('Grupo eliminado correctamente');
    }
  };

  return (
    <InterventionContext.Provider value={{
      interventions,
      addIntervention,
      searchTerm,
      setSearchTerm,
      defaultMachineData,
      mechanics,
      machines,
      groups,
      addMechanic,
      updateMechanic,
      deleteMechanic,
      addMachine,
      updateMachine,
      deleteMachine,
      addGroup,
      updateGroup,
      deleteGroup,
      setDefaultMachineData,
      maquina,
      setMaquina,
      getInterventions
    }}>
      {children}
    </InterventionContext.Provider>
  );
};

export const useInterventions = () => {
  const context = useContext(InterventionContext);
  if (context === undefined) {
    throw new Error('useInterventions must be used within an InterventionProvider');
  }
  return context;
};