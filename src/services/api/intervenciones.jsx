import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;
export const AlmacenarIntervencion = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}/intervenciones.php`, values)
    if (!response.data.ok) {
      throw new Error("Ha ocurrido un error al almacenar la intervención, si el error persiste, contacta al administrador")
    }
    return response.data
  } catch (error) {
    console.error("Error al almacenar la intervención", error)
    throw error
  }
}

export const ObtenerIntervenciones = async (values) => {
  try {
    const response = await axios.get(`${apiUrl}/intervenciones.php?codigo=${values}`)
    if (!response.data.ok) {
      throw new Error("Ha ocurrido un error al obtener las intervenciones, si el error persiste, contacta al administrador")
    }
    //console.log("Datos almacenados correctamente:", response.data)
    return response.data.respuesta
  } catch (error) {
    console.error("Error al obtener las intervenciones", error)
    throw error
  }
}
export const ActualizarIntervencion = async (values) => {
  try {
    const response = await axios.put(`${apiUrl}/intervenciones.php`, values)
    console.log(response);
    if (!response.data.ok) {
      throw new Error("Ha ocurrido un error al actualizar la intervención, si el error persiste, contacta al administrador")
    }
    return response.data
  } catch (error) {
    console.error("Error al actualizar la intervención", error)
    throw error
  }
}
