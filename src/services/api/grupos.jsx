import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
// FUNCION PARA OBTENER DATOS
export const ObtenerGrupos = async (id = '') => {
    const query = await axios.get(`${apiUrl}/grupos.php?id=${id}`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};
export const AlmacenarGrupo = async (data) => {
    const query = await axios.post(`${apiUrl}/grupos.php`, data);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
}
export const ActualizarGrupo = async (data) => {
    const query = await axios.put(`${apiUrl}/grupos.php`, data);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
}
export const EliminarGrupo = async (id) => {
    const query = await axios.delete(`${apiUrl}/grupos.php?id=${id}`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
}