import api from "./conexion";

export const listarEspecialidad = async () => {

    try {
        const response = await api.get("/listarEspecialidad");
        return { success: true, data: response.data };
    } catch (error){
        console.error("Error al listar especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const eliminarEspecialidad = async (id) => {

    try {
        await api.delete(`/eliminarEspecialidad/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const crearEspecialidad = async (data) => {

    try {
       const response = await api.post("/crearEspecialidad", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const editarEspecialidad = async (id, data) => {
   console.log("Datos a editar:", data);
    try {
        const response = await api.put(`/editarEspecialidad/${id}`, data);
       
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}