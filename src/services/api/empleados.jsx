import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
// FUNCION PARA OBTENER DATOS
export const FetchEmpleados = async () => {
    const query = await axios.get(`${apiUrl}/empleados.php`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};

// FUNCION PARA AGREGAR DATOS
export const AgregarEmpleado = async (datos) => {
    const query = await axios.post(`${apiUrl}/empleados.php`, datos);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};

// FUNCION PARA ACTUALIZAR DATOS
export const ActualizarEmpleado = async (datos) => {
    const query = await axios.put(`${apiUrl}/empleados.php`, datos);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};

// FUNCION PARA ELIMINAR DATOS
export const EliminarEmpleado = async (id) => {
    const query = await axios.delete(`${apiUrl}/empleados.php?id=${id}`);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};