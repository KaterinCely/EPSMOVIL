import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearHoraMedico, editarHoraMedico } from "../../Src/Services/HoraMedicaService";

// Componente principal EditarHorarioMedicoScreen
export default function EditarHorarioMedicoScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const hora_medico = route.params?.hora_medico;  // Obtiene el horario del médico desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [idMedico, setIdMedico] = useState(hora_medico?.idMedico?.toString() || "");
  const [dias, setDias] = useState(hora_medico?.dias?.toString() || "");
  const [fecha_ini, setFecchaIni] = useState(hora_medico?.fecha_ini || "");
  const [fecha_fin, setFechaFin] = useState(hora_medico?.fecha_fin || "");
  const [activo, setActivo] = useState(hora_medico?.activo.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!hora_medico;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del horario médico
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!idMedico || !dias || !fecha_ini || !fecha_fin || !activo) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarHoraMedico(hora_medico.id, {
          idMedico: parseInt(idMedico),
          dias: parseInt(dias),
          fecha_ini,
          fecha_fin,
          activo,
        });
      } else {
        result = await crearHoraMedico({ idMedico, dias, fecha_ini, fecha_fin, activo });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Horario del médico actualizado" : "Horario del médico creado");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar el horario del médico");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el horario del médico");
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
        <Text style={styles.titulo}>{esEdicion ? "Editar horario del medico" : "Crear horario del medico"}</Text>

        {/* Campos del formulario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Id Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Id del Médico"
            value={idMedico}
            onChangeText={setIdMedico}
            keyboardType="numeric"

          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Días del Horario Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Días del Horario Médico"
            value={dias}
            onChangeText={setDias}
            keyboardType="numeric"

          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha Inicio del Horario Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="yyyy-mm-dd"
            value={fecha_ini}
            onChangeText={setFecchaIni}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha Fin del Horario Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="yyyy-mm-dd"
            value={fecha_fin}
            onChangeText={setFechaFin}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Horario médico está activo o no</Text>
          <TextInput
            style={styles.input}
            placeholder="Médico activo o inactivo"
            value={activo}
            onChangeText={setActivo}
          />
        </View>

        {/* Botón para guardar el horario médico */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Guardar Horario Médico</Text>
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
