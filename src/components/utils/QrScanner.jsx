import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { useInterventions } from '../../context/InterventionContext';

const QrScanner = () => {
    const [show, setShow] = useState()
    const { setMaquina } = useInterventions();
    const result = (result) => {
/*         alert('Código escaneado: ' + result[0]?.rawValue);
 */        setShow(false)
        setMaquina(result[0]?.rawValue);
    }
    const QrScannerComponent = (show) => {
        return <Scanner onScan={result} />;
    }
    return { show, setShow, QrScannerComponent };
};

export default QrScanner;