import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
// FUNCION PARA OBTENER DATOS
export const ObtenerGrupos = async (id = '') => {
    const query = await axios.get(`${apiUrl}/grupos.php?id=${id}`);
    console.log(query);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};