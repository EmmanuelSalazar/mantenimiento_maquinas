import React, { createContext, useContext, useState, useEffect } from 'react';
import FetchEmpleados from '../services/api/empleados';
import { FetchMaquinas, EliminarMaquina, AgregarMaquina } from '../services/api/maquinas';
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
    const stored = localStorage.getItem('interventions');
    const storedMechanics = /* localStorage.getItem('mechanics') */ false;
    const storedMachines = localStorage.getItem('machines');
    
    console.log(storedMachines)

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
              console.log(data);

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
  const addMechanic = (mechanic) => {
    const newMechanic = {
      ...mechanic,
      id: Date.now().toString()
    };
    const updated = [...mechanics, newMechanic];
    setMechanics(updated);
    localStorage.setItem('mechanics', JSON.stringify(updated));
  };

  const updateMechanic = (id, updatedMechanic) => {
    const updated = mechanics.map(mechanic => 
      mechanic.id === id ? { ...updatedMechanic, id } : mechanic
    );
    setMechanics(updated);
    localStorage.setItem('mechanics', JSON.stringify(updated));
  };

  const deleteMechanic = (id) => {
    const updated = mechanics.filter(mechanic => mechanic.id !== id);
    setMechanics(updated);
    localStorage.setItem('mechanics', JSON.stringify(updated));
  };

  const addMachine = async (machine) => {
    machine.maquina = machine.maquina.toUpperCase();
    machine.marca = machine.marca.toUpperCase();
    machine.codigo = machine.codigo.toUpperCase();
    try {
      await AgregarMaquina(machine);
      alert('Maquina añadida correctamente');
      const data = await FetchMaquinas();
      setMachines(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMachine = (id, updatedMachine) => {
    const updated = machines.map(machine => 
      machine.id === id ? { ...updatedMachine, id } : machine
    );
    setMachines(updated);
    localStorage.setItem('machines', JSON.stringify(updated));
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