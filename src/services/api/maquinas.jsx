import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
// FUNCION PARA OBTENER DATOS
export const FetchMaquinas = async (id = '') => {
    const query = await axios.get(`${apiUrl}/maquinas.php?id=${id}`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};
// FUNCION PARA ELIMINAR MAQUINAS
export const EliminarMaquina = async (id) => {
    const query = await axios.delete(`${apiUrl}/maquinas.php?id=${id}`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
}
// FUNCION PARA AÑADIR MAQUINAS
export const AgregarMaquina = async (data) => {
    const query = await axios.post(`${apiUrl}/maquinas.php`, data);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
}
// FUNCION PARA MODIFICAR MAQUINAS
export const ModificarMaquina = async (data) => {
    const query = await axios.put(`${apiUrl}/maquinas.php`, data);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
}


