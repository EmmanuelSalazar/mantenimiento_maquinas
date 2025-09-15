import React, { createContext, useContext, useState, useEffect } from 'react';
import { FetchEmpleados, AgregarEmpleado, ActualizarEmpleado, EliminarEmpleado } from '../services/api/empleados';
import { FetchMaquinas, EliminarMaquina, AgregarMaquina, ModificarMaquina } from '../services/api/maquinas';
import { ObtenerIntervenciones, AlmacenarIntervencion } from '../services/api/intervenciones';
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

  useEffect(() => {
    const storedMechanics = /* localStorage.getItem('mechanics') */ false;
    if (storedMechanics) {
      setMechanics(JSON.parse(storedMechanics));
    } else {
      FetchEmpleados().then(data => {
        setMechanics(data);
      });
      localStorage.setItem('mechanics', JSON.stringify(mechanics));
    }
    // CARGAR MAQUINAS
      FetchMaquinas().then(data => {
        setMachines(data);
      });
  }, []);
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

  return (
    <InterventionContext.Provider value={{
      interventions,
      addIntervention,
      searchTerm,
      setSearchTerm,
      defaultMachineData,
      mechanics,
      machines,
      addMechanic,
      updateMechanic,
      deleteMechanic,
      addMachine,
      updateMachine,
      deleteMachine,
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