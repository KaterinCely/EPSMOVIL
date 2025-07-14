import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearCitas, editarCitas } from "../../Src/Services/CitasService";

// Componente principal EditarCitasScreen
export default function EditarCitasScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const cita = route.params?.cita;  // Obtiene la cita desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [idPasientes, setIdPasientes] = useState(cita?.idPasientes?.toString() || "");
  const [idMedicos, setIdMedicos] = useState(cita?.idMedicos?.toString() || "");
  const [idConsultorios, setIdConsultorios] = useState(cita?.idConsultorios?.toString() || "");
  const [fecha, setfecha] = useState(cita?.fecha || "");
  const [hora, setHora] = useState(cita?.hora || "");
  const [estado, setEstado] = useState(cita?.estado?.toString() || "");
  const [motivo, setMotivo] = useState(cita?.motivo?.toString() || "");
  const [observacion, setObservacion] = useState(cita?.observacion?.toString() || "");
  const [tipo_consulta, setTipo_consulta] = useState(cita?.tipo_consulta?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!cita;  // Determina si es una edición o una nueva cita

  // Función para manejar el guardado de la cita
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!idPasientes || !idMedicos || !idConsultorios || !fecha || !hora || !estado || !motivo || !observacion || !tipo_consulta) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarCitas(cita.id, {
          idMedicos: parseInt(idMedicos),
          idPasientes: parseInt(idPasientes),
          idConsultorios: parseInt(idConsultorios),
          fecha,
          hora,
          estado,
          motivo,
          observacion,
          tipo_consulta
        });
      } else {
        result = await crearCitas({ idMedicos, idPasientes, idConsultorios, fecha, hora, estado, motivo, observacion, tipo_consulta });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar la cita");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar la cita");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>{esEdicion ? "Editar cita" : "Crear cita"}</Text>

        {/* Campos del formulario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Id del médico"
            keyboardType="numeric"
            value={idMedicos}
            onChangeText={setIdMedicos}

          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID Paciente</Text>
          <TextInput
            style={styles.input}
            placeholder="Id del paciente"
            keyboardType="numeric"
            value={idPasientes}
            onChangeText={setIdPasientes}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID Consultorio</Text>
          <TextInput
            style={styles.input}
            placeholder="Id del consultorio"
            keyboardType="numeric"
            value={idConsultorios}
            onChangeText={setIdConsultorios}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-DD"
            value={fecha}
            onChangeText={setfecha}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM:SS"
            value={hora}
            onChangeText={setHora}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={styles.input}
            placeholder="Estado de la cita"
            value={estado}
            onChangeText={setEstado}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Motivo</Text>
          <TextInput
            style={styles.input}
            placeholder="Motivo de la consulta"
            value={motivo}
            onChangeText={setMotivo}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Observaciones</Text>
          <TextInput
            style={styles.input}
            placeholder="Detalles adicionales"
            value={observacion}
            onChangeText={setObservacion}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de Consulta</Text>
          <TextInput
            style={styles.input}
            placeholder="Tipo de consulta"
            value={tipo_consulta}
            onChangeText={setTipo_consulta}
          />
        </View>

        {/* Botón para guardar la cita */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Guardar Cita</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#DDA0DD",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
