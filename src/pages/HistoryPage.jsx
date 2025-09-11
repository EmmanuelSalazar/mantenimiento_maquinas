import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Search, ArrowLeft, Calendar, X } from 'lucide-react';
import { useInterventions } from '../context/InterventionContext';
import MachineInfoCard from '../components/MachineInfoCard';
import InterventionTable from '../components/InterventionTable';
import QrScanner from '../components/utils/QrScanner';
import { useParams } from 'react-router-dom';
import { ObtenerIntervenciones } from '../services/api/intervenciones';
const HistoryPage = () => {
  const { id } = useParams();
  const [showScanner, setShowScanner] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [intervenciones, setIntervenciones] = useState(null);
  const { QrScannerComponent, show } = QrScanner();
  const handleScan = (result) => {
    setScannedCode(result);
  };
  const data = async () => {
    const data = await ObtenerIntervenciones(id)
    setIntervenciones(data)
    return ;
  };
  useEffect(() => {
    if(!id) {
      return;
    }
    data();
  }, [id])
  useEffect(() => {
    if(!show) {
      setShowScanner(null);
    }
  }, [show])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link 
                  to="/"
                  className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Historial de Intervenciones</h1>
              </div>
              {showScanner ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowScanner(false)}
                    className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <QrScannerComponent show={showScanner} />
                </div>
              ) : (
                <button 
                  onClick={() => setShowScanner(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Capturar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Machine Info Card */}
        <MachineInfoCard />

        {/* Results Summary */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Intervenciones Registradas
                </h3>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {intervenciones?.length} registros
              </span>
            </div>
          </div>

          {/* Intervention Table */}
          <InterventionTable interventions={intervenciones} />
        </div>

        {/* Quick Actions */}
        {id ? (
          <div className="text-center">
            <Link
              to={`/nueva-intervencion/${id}`}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Nueva Intervención
            </Link>
          </div>
        ) : (
          <div className="text-center bg-gray-500 inline-flex items-center px-6 py-3 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              <Calendar className="h-5 w-5 mr-2" />
              Nueva Intervención
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;