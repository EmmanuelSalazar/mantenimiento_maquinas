import React, { createContext, useContext, useState, useEffect } from 'react';

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
    const storedMechanics = localStorage.getItem('mechanics');
    const storedMachines = localStorage.getItem('machines');
    
    if (stored) {
      setInterventions(JSON.parse(stored));
    } else {
      // Datos de ejemplo
      const sampleInterventions = [
        {
          id: '1',
          date: '2024-01-15',
          maintenanceType: 'Preventivo',
          responsible: 'Juan Pérez',
          observations: 'Revisión general de componentes electrónicos',
          machineData: defaultMachineData
        },
        {
          id: '2',
          date: '2024-01-10',
          maintenanceType: 'Correctivo',
          responsible: 'María González',
          observations: 'Reparación del motor principal',
          machineData: defaultMachineData
        }
      ];
      setInterventions(sampleInterventions);
      localStorage.setItem('interventions', JSON.stringify(sampleInterventions));
    }

    if (storedMechanics) {
      setMechanics(JSON.parse(storedMechanics));
    } else {
      const sampleMechanics = [
        {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan.perez@empresa.com',
          phone: '+57 300 123 4567',
          specialty: 'Mecánica General'
        },
        {
          id: '2',
          name: 'María González',
          email: 'maria.gonzalez@empresa.com',
          phone: '+57 301 234 5678',
          specialty: 'Electrónica'
        }
      ];
      setMechanics(sampleMechanics);
      localStorage.setItem('mechanics', JSON.stringify(sampleMechanics));
    }

    if (storedMachines) {
      setMachines(JSON.parse(storedMachines));
    } else {
      const sampleMachines = [
        {
          id: '1',
          serial: '4D0EF07293',
          type: 'MÁQUINA PLANA ELECTRÓNICA',
          brand: 'JUKI',
          code: 'PLA-0001',
          location: 'Planta Principal - Línea A'
        },
        {
          id: '2',
          serial: '8D0FM21157',
          type: 'MÁQUINA PLANA ELECTRÓNICA',
          brand: 'JUKI',
          code: 'PLA-0005',
          location: 'Planta Principal - Línea B'
        }
      ];
      setMachines(sampleMachines);
      localStorage.setItem('machines', JSON.stringify(sampleMachines));
    }
  }, []);

  const addIntervention = (intervention) => {
    const newIntervention = {
      ...intervention,
      id: Date.now().toString(),
      machineData: defaultMachineData
    };
    
    const updated = [...interventions, newIntervention];
    setInterventions(updated);
    localStorage.setItem('interventions', JSON.stringify(updated));
  };

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

  const addMachine = (machine) => {
    const newMachine = {
      ...machine,
      id: Date.now().toString()
    };
    const updated = [...machines, newMachine];
    setMachines(updated);
    localStorage.setItem('machines', JSON.stringify(updated));
  };

  const updateMachine = (id, updatedMachine) => {
    const updated = machines.map(machine => 
      machine.id === id ? { ...updatedMachine, id } : machine
    );
    setMachines(updated);
    localStorage.setItem('machines', JSON.stringify(updated));
  };

  const deleteMachine = (id) => {
    const updated = machines.filter(machine => machine.id !== id);
    setMachines(updated);
    localStorage.setItem('machines', JSON.stringify(updated));
  };

  const filteredInterventions = interventions.filter(intervention =>
    intervention.maintenanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intervention.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intervention.observations.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intervention.date.includes(searchTerm)
  );

  return (
    <InterventionContext.Provider value={{
      interventions,
      addIntervention,
      searchTerm,
      setSearchTerm,
      filteredInterventions,
      defaultMachineData,
      mechanics,
      machines,
      addMechanic,
      updateMechanic,
      deleteMechanic,
      addMachine,
      updateMachine,
      deleteMachine
      setDefaultMachineData,
      maquina,
      setMaquina
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