import axios from 'axios';

// FUNCION PARA OBTENER DATOS
const FetchEmpleados = async (id) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const query = await axios.get(`/api/empleados.php`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};

export default FetchEmpleados;
