import axios from 'axios';

// FUNCION PARA OBTENER DATOS
const FetchMaquinas = async (id) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const query = await axios.get(`/api/maquinas.php?id=${id}`);
    console.log(query);
    if (query.data.ok) {
        return query.data.respuesta;
    } else {
        throw new Error(query.data.respuesta || 'Ha ocurrido un error al realizar la solicitud');
    }
};

export default FetchMaquinas;
