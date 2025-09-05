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

  useEffect(() => {
    const stored = localStorage.getItem('interventions');
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