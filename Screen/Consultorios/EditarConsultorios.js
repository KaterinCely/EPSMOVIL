import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearConsultorios, editarConsultorios } from "../../Src/Services/ConsultorioService";

// Componente principal EditarConsultorioScreen
export default function EditarConsultorioScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const consultorio = route.params?.consultorio;  // Obtiene el consultorio desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [numero, setNumero] = useState(consultorio?.numero || "");
  const [piso, setPiso] = useState(consultorio?.piso || "");
  const [edificio, setEdificio] = useState(consultorio?.edificio?.toString() || "");
  const [descripcion, setDescripcion] = useState(consultorio?.descripcion?.toString() || "");
  const [disponible, setDisponible] = useState(consultorio?.disponible?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!consultorio;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del consultorio
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!numero || !piso || !edificio || !descripcion || !disponible) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarConsultorios(consultorio.id, {
          numero: parseInt(numero),
          piso: parseInt(piso),
          edificio,
          descripcion,
          disponible,
        });
      } else {
        result = await crearConsultorios({ numero, piso, edificio, descripcion, disponible });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Consultorio actualizado" : "Consultorio creado");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar el consultorio");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el consultorio");
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
        <Text style={styles.titulo}>{esEdicion ? "Editar consultorio" : "Crear consultorio"}</Text>

        {/* Campos del formulario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de Piso del Edificio</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de Piso"
            value={piso}
            onChangeText={setPiso}
            keyboardType="numeric"

          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número del Consultorio</Text>
          <TextInput
            style={styles.input}
            placeholder="Número del Consultorio"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"

          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del Edificio</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Edificio"
            value={edificio}
            onChangeText={setEdificio}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripción del Consultorio</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripción del Consultorio"
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Consultorio disponible</Text>
          <TextInput
            style={styles.input}
            placeholder="Consultorios disponibles"
            value={disponible}
            onChangeText={setDisponible}
          />
        </View>

        {/* Botón para guardar el consultorio */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Guardar Consultorio</Text>
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
