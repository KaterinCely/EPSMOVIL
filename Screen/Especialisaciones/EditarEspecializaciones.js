import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView, } from "react-native"
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearEspecialidad, editarEspecialidad } from "../../Src/Services/EspecialidadesService";

export default function EditarEspecialidadScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const especialidades = route.params?.especialidades;

  const [nombre, setNombre] = useState(especialidades?.nombre || "");
  const [descripcion, setDescripcion] = useState(especialidades?.descripcion?.toString() || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!especialidades;

  const handleGuardar = async () => {
    if ( !nombre || !descripcion ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      let result;

      if (esEdicion) {
        result = await editarEspecialidad(especialidades.id, {
          nombre,
          descripcion,
        });
      } else {
        result = await crearEspecialidad({ nombre, descripcion });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Especialidad actualizada" : "Especialidad creada");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Error al guardar la Especialidad");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar la Especialidad");
    } finally {
      setLoading(false);
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
        <Text style={styles.titulo}>Nuevo Especialidad </Text>

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
          <Text style={styles.label}>Descripciocion de la Especialidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripción del Consultorio"
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>


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
