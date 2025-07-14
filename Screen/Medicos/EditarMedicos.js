import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearMedicos, editarMedicos } from "../../Src/Services/MedicosService";

// Componente principal EditarMedicosScreen
export default function EditarMedicosScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const medicos = route.params?.medicos;  // Obtiene el médico a editar desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [idConsultorio, setIdConsultorio] = useState(medicos?.idConsultorio?.toString() || "");
  const [idEspecialidad, setIdEspecialidad] = useState(medicos?.idEspecialidad?.toString() || "");
  const [nombre, setNombre] = useState(medicos?.nombre?.toString() || "");
  const [apellido, setApellido] = useState(medicos?.apellido?.toString() || "");
  const [num_documento, setNumDocumento] = useState(medicos?.num_documento?.toString() || "");
  const [tipo_documento, setTipoDocumento] = useState(medicos?.tipo_documento?.toString() || "");
  const [reg_medicos, setRegMedicos] = useState(medicos?.reg_medicos?.toString() || "");
  const [activo, setActivo] = useState(medicos?.activo?.toString() || "");
  const [telefono, setTelefono] = useState(medicos?.telefono?.toString() || "");
  const [correo, setCorreo] = useState(medicos?.correo?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!medicos;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del médico
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!idConsultorio || !idEspecialidad || !nombre || !apellido || !num_documento || !tipo_documento || !reg_medicos || !activo || !telefono || !correo) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarMedicos(medicos.id, {
          idConsultorio: parseInt(idConsultorio),
          idEspecialidad: parseInt(idEspecialidad),
          nombre,
          apellido,
          num_documento: parseInt(num_documento),
          tipo_documento,
          reg_medicos,
          activo,
          telefono,
          correo,
        });
      } else {
        result = await crearMedicos({
          idConsultorio: parseInt(idConsultorio),
          idEspecialidad,
          nombre,
          apellido,
          num_documento,
          tipo_documento,
          reg_medicos,
          telefono,
          correo,
          activo,
        });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Médico actualizado" : "Médico creado");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar el médico");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el médico");
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
        <Text style={styles.titulo}>{esEdicion ? "Editar medico" : "Crear Medico"}</Text>

        {/* Campos del formulario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Id Consultorio</Text>
          <TextInput
            style={styles.input}
            placeholder="Id del Consultorio"
            value={idConsultorio}
            onChangeText={setIdConsultorio}
            keyboardType="numeric"

          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Id Especialidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Id de la Especialidad"
            value={idEspecialidad}
            onChangeText={setIdEspecialidad}
            keyboardType="numeric"

          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Médico"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido del Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido del Médico"
            value={apellido}
            onChangeText={setApellido}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de documento</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de documento"
            value={num_documento}
            onChangeText={setNumDocumento}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de documento</Text>
          <TextInput
            style={styles.input}
            placeholder="Tipo de documento"
            value={tipo_documento}
            onChangeText={setTipoDocumento}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Registro del Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Registro del Médico"
            value={reg_medicos}
            onChangeText={setRegMedicos}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Médico activo o inactivo</Text>
          <TextInput
            style={styles.input}
            placeholder="Médico activo o inactivo"
            value={activo}
            onChangeText={setActivo}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono del Médico"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico del Médico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />
        </View>

        {/* Botón para guardar el médico */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Guardar Médico</Text>
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
