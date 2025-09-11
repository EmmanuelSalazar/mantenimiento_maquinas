import axios from 'axios';

// FUNCION PARA OBTENER DATOS
export const FetchMaquinas = async (id = '') => {
    const query = await axios.get(`/api/maquinas.php?id=${id}`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};


// FUNCION PARA ELIMINAR MAQUINAS
export const EliminarMaquina = async (id) => {
    const query = await axios.delete(`/api/maquinas.php?id=${id}`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
}

