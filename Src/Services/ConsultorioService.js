import api from "./conexion";

export const listarConsultorios = async () => {

    try {
        const response = await api.get("/listarConsultorios");
        return { success: true, data: response.data };
    } catch (error){
        console.error("Error al listar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const eliminarConsultorios = async (id) => {

    try {
        await api.delete(`/eliminarConsultorios/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const crearConsultorios = async (data) => {

    try {
       const response = await api.post("/crearConsultorios", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const editarConsultorios = async (id, data) => {
   console.log("Datos a editar:", data);
    try {
        const response = await api.put(`/editarConsultorios/${id}`, data);
       
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}