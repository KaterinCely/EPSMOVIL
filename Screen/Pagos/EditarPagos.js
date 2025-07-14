import React, { useEffect, useState } from "react";  
import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";  
import { Picker } from "@react-native-picker/picker";  
import { useNavigation, useRoute } from "@react-navigation/native";  
import { listarPasientes } from "../../Src/Services/PasientesService";  
import { crearPagos, editarPagos } from "../../Src/Services/PagosService";  

// Componente principal EditarPagosScreen
export default function EditarPagosScreen() {
    const navigation = useNavigation();  // Hook para la navegación
    const route = useRoute();  // Hook para acceder a los parámetros de la ruta
    const pagos = route.params?.pagos;  // Obtiene el pago a editar desde los parámetros de la ruta

    // Estados para los campos del formulario
    const [fecha, setFecha] = useState(pagos?.fecha || "");
    const [total, setDocumento] = useState(pagos?.total?.toString() || "");
    const [estado, setEstado] = useState(pagos?.estado?.toString() || "");
    const [met_pago, setMetPago] = useState(pagos?.met_pago?.toString() || "");
    const [idPasientes, setIdPasientes] = useState(pagos?.idPasientes?.toString() || "");
    const [idCitas, setIdCitas] = useState(pagos?.idCitas?.toString() || "");

    const [loading, setLoading] = useState(false);  // Estado para controlar el loading
    const [pasientes, setPasientes] = useState([]);  // Estado para almacenar la lista de pacientes

    // Efecto para cargar la lista de pacientes
    useEffect(() => {
        const cargarPasientes = async () => {
            const result = await listarPasientes(); 
            if (result.success) {
                setPasientes(result.data);  // Actualiza el estado con los datos de pacientes
            } else {
                Alert.alert(
                    "Error",
                    result.message || "No se pudieron cargar los pacientes"
                );
            }
        };
        cargarPasientes();  // Llama a la función para cargar pacientes
    }, []);

    const esEdicion = !!pagos;  // Determina si es una edición o una nueva creación

    // Función para manejar el guardado del pago
    const handleGuardar = async () => {
        // Validación de campos obligatorios
        if (!fecha || !total || !estado || !met_pago || !idPasientes || !idCitas) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        setLoading(true);  // Activa el loading

        try {
            let result;
            // Llama a la función de editar o crear según corresponda
            if (esEdicion) {
                result = await editarPagos(pagos.id, {
                    fecha,
                    total,
                    estado,
                    met_pago,
                    idPasientes: parseInt(idPasientes),
                    idCitas: parseInt(idCitas),
                });
            } else {
                result = await crearPagos({
                    fecha,
                    total,
                    estado,
                    met_pago,
                    idPasientes: parseInt(idPasientes),
                    idCitas: parseInt(idCitas),
                });
            }

            // Manejo de la respuesta
            if (result?.success) {
                Alert.alert(
                    "Éxito",
                    `Pago ${esEdicion ? "editado" : "creado"} correctamente`
                );
                navigation.goBack();  // Regresa a la pantalla anterior
            } else {
                let errorMsg = "No se pudo guardar el pago";
                if (typeof result.message === "object") {
                    errorMsg = Object.entries(result.message)
                        .map(([key, val]) => `${key}: ${val.join(", ")}`)
                        .join("\n");
                } else if (typeof result.message === "string") {
                    errorMsg = result.message;
                }
                Alert.alert("Error", errorMsg);  // Muestra el mensaje de error
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "Ocurrió un error al guardar el pago. Por favor, inténtalo de nuevo más tarde."
            );
        } finally {
            setLoading(false);  // Desactiva el loading
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {esEdicion ? "Editar Pago" : "Crear Pago"}
            </Text>

            {/* Selector de pacientes */}
            <Picker selectedValue={idPasientes} onValueChange={setIdPasientes} style={[styles.input, styles.picker]}  >
                <Picker.Item label="Seleccione pacientes" value="" />
                {pasientes.map(e => (
                    <Picker.Item key={e.id} label={e.nombre} value={e.id.toString()} />
                ))}
            </Picker>

            {/* Campos del formulario */}
            <TextInput
                placeholder="Fecha"
                value={fecha}
                onChangeText={setFecha}
                style={styles.input}
            />
            <TextInput
                placeholder="Total"
                value={total}
                onChangeText={setDocumento}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
                style={styles.input}
            />
            <TextInput
                placeholder="Método de Pago"
                value={met_pago}
                onChangeText={setMetPago}
                style={styles.input}
            />
            <TextInput
                placeholder="ID Citas"
                value={idCitas}
                onChangeText={setIdCitas}
                style={styles.input}
                keyboardType="numeric"
            />

            {/* Botón para guardar el pago */}
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleGuardar}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.saveButtonText}>
                        {esEdicion ? "Guardar Cambios" : "Registrar Pago"}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: "#DDA0DD",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    saveButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
