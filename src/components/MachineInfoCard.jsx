import React, { useState, useEffect } from 'react';
import { useInterventions } from './../context/InterventionContext';
import { FetchMaquinas } from './../services/api/maquinas';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const MachineInfoCard = () => {
  const navigate = useNavigate();
  const { maquina } = useInterventions();
  const [machineData, setMachineData] = useState({
    serial: '',
    type: '',
    brand: '',
    code: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchMaquinas(maquina);
        setMachineData({
          serial: data[0].serial,
          type: data[0].maquina,
          brand: data[0].marca,
          code: data[0].codigo
        });
        navigate(`/historial/${data[0].codigo}`);
      } catch (error) {
        console.error('Ha ocurrido un error:', error);
      }
    };
    fetchData();
  }, [maquina]);

  /* const machineData = {
    serial: '4D0EF07293',
    type: 'MÁQUINA PLANA ELECTRÓNICA',
    brand: 'JUKI',
    code: 'PLA-0001'
  }; */

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6 overflow-hidden">
      {/* Machine Header */}
      <div className="bg-gray-100 px-6 py-4 border-b">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Serial
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {machineData.serial}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Tipo de Máquina
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {machineData.type}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Marca
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {machineData.brand}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Código
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {machineData.code}
            </div>
          </div>
        </div>
      </div>

      {/* Intervention Data Header */}
      <div className="bg-gray-700 px-6 py-3">
        <div className="flex items-center justify-center">
          <Settings className="h-5 w-5 text-white mr-2" />
          <h2 className="text-lg font-semibold text-white tracking-wide">
            DATOS DE INTERVENCIÓN
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MachineInfoCard;