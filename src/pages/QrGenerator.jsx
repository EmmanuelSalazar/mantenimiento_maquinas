import {QRCodeCanvas} from 'qrcode.react';
import { useInterventions } from '../context/InterventionContext';

function divisor(numero) {
    return numero % 6 === 0
}
console.log(divisor(5))
function QrGenerator() {
  const { defaultMachineData } = useInterventions();
  const data = [
    {
      "id": 5,
      "serial": "8D0FM21157",
      "maquina": "MAQUINA PLANA ELECTRONICA",
      "marca": "JUKI",
      "codigo": "PLA-0005",
      "reg_date": "2025-09-02 16:22:21"
    },
    {
      "id": 11,
      "serial": "26399358",
      "maquina": "MAQUINA PLANA ELECTRONICA",
      "marca": "SIRUBA",
      "codigo": "PLA-0011",
      "reg_date": "2025-09-02 16:22:21"
    },
    {
      "id": 23,
      "serial": "OE4-40H",
      "maquina": "FILETEADORA",
      "marca": "JUKI",
      "codigo": "FLI-0005",
      "reg_date": "2025-09-02 16:22:21"
    },
    {
      "id": 27,
      "serial": "504M2-04-3",
      "maquina": "FILETEADORA",
      "marca": "SIRUBA",
      "codigo": "FLI-0009",
      "reg_date": "2025-09-02 16:22:21"
    },
    {
      "id": 30,
      "serial": "3035379HA",
      "maquina": "FILETEADORA",
      "marca": "SIRUBA",
      "codigo": "FLI-0012",
      "reg_date": "2025-09-02 16:22:21"
    },
    {
      "id": 36,
      "serial": "CZ6003E04DF-B3",
      "maquina": "FILETEADORA CON CEROMAS",
      "marca": "YAMATO",
      "codigo": "FLI-0018",
      "reg_date": "2025-09-03 16:46:32"
    },
    {
      "id": 42,
      "serial": "W222-364",
      "maquina": "RECUBRIDORA",
      "marca": "SIRUBA",
      "codigo": "REC-0006",
      "reg_date": "2025-09-02 16:22:21"
    },
    {
      "id": 48,
      "serial": "2L2PK00067",
      "maquina": "ZIGZADORA",
      "marca": "JUKI SMART",
      "codigo": "ZIG-0004",
      "reg_date": "2025-09-02 16:22:22"
    },
    {
      "id": 54,
      "serial": "B3Z40718",
      "maquina": "ZIGZADORA",
      "marca": "BROTHER ELECTRONICA",
      "codigo": "ZIG-0010",
      "reg_date": "2025-09-02 16:22:22"
    },
    {
      "id": 64,
      "serial": "10017941",
      "maquina": "RESORTADORA",
      "marca": "SIRUBA",
      "codigo": "RES-0004",
      "reg_date": "2025-09-02 16:22:22"
    },
    {
      "id": 67,
      "serial": "W522-364",
      "maquina": "RESORTADORA",
      "marca": "SIRUBA",
      "codigo": "RES-0007",
      "reg_date": "2025-09-02 16:22:22"
    },
    {
      "id": 74,
      "serial": "15416279",
      "maquina": "DOS AGUJAS",
      "marca": "SIRUBA",
      "codigo": "DOSAG-0002",
      "reg_date": "2025-09-05 12:48:42"
    },
    {
      "id": 75,
      "serial": "128600137",
      "maquina": "DOS AGUJAS",
      "marca": "SIRUBA",
      "codigo": "DOSAG-0003",
      "reg_date": "2025-09-05 12:48:46"
    },
    {
      "id": 76,
      "serial": "15416272",
      "maquina": "DOS AGUJAS",
      "marca": "SIRUBA",
      "codigo": "DOSAG-0004",
      "reg_date": "2025-09-05 12:48:48"
    },
    {
      "id": 77,
      "serial": "128600179",
      "maquina": "DOS AGUJAS",
      "marca": "SIRUBA",
      "codigo": "DOSAG-0001",
      "reg_date": "2025-09-05 12:48:32"
    },
    {
      "id": 78,
      "serial": "C10004812",
      "maquina": "CAMA CILINDRICA",
      "marca": "SIRUBA",
      "codigo": "AMCI-0002",
      "reg_date": "2025-09-05 12:50:29"
    },
    {
      "id": 79,
      "serial": "VC2640P",
      "maquina": "CAMA CILINDRICA",
      "marca": "LLAMATO",
      "codigo": "AMCI-0001",
      "reg_date": "2025-09-05 12:50:24"
    },
    {
      "id": 84,
      "serial": "220124045",
      "maquina": "PLANA COSER Y CORTAR ELECTRONICA",
      "marca": "METRO SPEZIAL",
      "codigo": "PLACC-0002",
      "reg_date": "2025-09-03 16:42:35"
    },
    {
      "id": 86,
      "serial": "1027042",
      "maquina": "FILETEADORA",
      "marca": "PEGASUS",
      "codigo": "FLI-0019",
      "reg_date": "2025-09-03 16:45:30"
    }
  ]
  return (
    <div style={{paddingLeft: 10, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem'}}>
      {data.map((item, index) => (
        <>
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
            <h1 className='text-4xl font-bold' >{item.codigo}</h1>
            <QRCodeCanvas title={item.codigo}  key={item.codigo} imageSettings={{ src: 'https://altconfecciones.com.co/assets/logo-Cax7HYwl.png',  width: 30, height: 30}} size={200} value={item.codigo} />
        </div>
        {divisor(index+1) && <><div style={{height: '200px'}}></div><div style={{height: '200px'}}></div></>}
        </>
        
      ))}
      <button onClick={() => window.print()}>Imprimir</button>
    </div>
  )
}
export default QrGenerator