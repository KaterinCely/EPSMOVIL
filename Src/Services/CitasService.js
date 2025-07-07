import api from "./conexion";

export const listarCitas = async () => {

    try {
        const response = await api.get("/listarCitas");
        return { success: true, data: response.data };
    } catch (error){
        console.error("Error al listar citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const eliminarActividad = async (id) => {

    try {
        await api.delete(`/eliminarCitas/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const crearCitas = async (data) => {

    try {
       const response = await api.post("/crearCitas", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al crear citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}

export const editarCitas = async (id, data) => {

    try {
        const response = await api.put(`/editarCitas/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar ciatas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        }
    }
}