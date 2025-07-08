import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView, } from "react-native"
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearCitas, editarCitas } from "../../Src/Services/CitasService";

export default function EditarCitasScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const cita = route.params?.cita;

  const [idPasientes, setIdPasientes] = useState(cita?.idPasientes?.toString() || "");
  const [idMedicos, setIdMedicos] = useState(cita?.idMedicos?.toString() || "");
  const [idConsultorios, setIdConsultorios] = useState(cita?.idConsultorios?.toString() || "");
  const [fecha, setfecha] = useState(cita?.fecha || "");
  const [hora, setHora] = useState(cita?.hora || "");
  const [estado, setEstado] = useState(cita?.estado?.toString() || "");
  const [motivo, setMotivo] = useState(cita?.motivo?.toString() || "");
  const [observacion, setObservacion] = useState(cita?.observacion?.toString() || "");
  const [tipo_consulta, setTipo_consulta] = useState(cita?.tipo_consulta?.toString() || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!cita;

  const handleGuardar = async () => {
    if (!idPasientes || !idMedicos || !idConsultorios || !fecha || !hora || !estado || !motivo || !observacion || !tipo_consulta) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      let result;

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

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Error al guardar la cita");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar la cita");
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
        <Text style={styles.titulo}>Nueva Cita Médica</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Id del médico "
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
            placeholder="HH:MM"
            value={hora}
            onChangeText={setHora}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={styles.input}
            placeholder="Esatado de la cita "
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
            placeholder="Tipo de consulta "
            value={tipo_consulta}
            onChangeText={setTipo_consulta}
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
              <Text style={styles.buttonText}>Guardar Cita</Text>
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
