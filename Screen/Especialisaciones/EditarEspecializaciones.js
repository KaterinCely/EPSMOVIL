import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearEspecialidad, editarEspecialidad } from "../../Src/Services/EspecialidadesService";

// Componente principal EditarEspecialidadScreen
export default function EditarEspecialidadScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const especialidades = route.params?.especialidades;  // Obtiene la especialidad desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(especialidades?.nombre || "");
  const [descripcion, setDescripcion] = useState(especialidades?.descripcion?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!especialidades;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado de la especialidad
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!nombre || !descripcion) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarEspecialidad(especialidades.id, {
          nombre,
          descripcion,
        });
      } else {
        result = await crearEspecialidad({ nombre, descripcion });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Especialidad actualizada" : "Especialidad creada");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar la especialidad");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar la especialidad");
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
        <Text style={styles.titulo}>{esEdicion ? "Editar especializaciones" : "Crear especializaciones"}</Text>

        {/* Campos del formulario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de la Especialidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la Especialidad"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripción de la Especialidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripción de la Especialidad"
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>

        {/* Botón para guardar la especialidad */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Guardar Especialidad</Text>
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
