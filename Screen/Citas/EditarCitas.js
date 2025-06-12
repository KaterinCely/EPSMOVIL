import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import BottonComponent from "../../components/BottonComponent";

export default function EditarCitasScreen() {
  const [fecha, setFecha] = useState();
  const [hora, setHora] = useState();
  const [estado, setEstado] = useState();
  const [motivo, setMotivo] = useState();
  const [observacion, setObservacion] = useState();
  const [tipoConsulta, setTipoConsulta] = useState();
  const fechaRegex = /^\d{4}\/\d{2}\/\d{2}$/;
  const horaRegex = /^\d{2}:\d{2}$/;

  const handleSubmit = () => {
    if (!fechaRegex.test(fecha)) {
      Alert.alert("Formato incorrecto", "Fecha debe tener formato YYYY/MM/DD con barras.");
      return;
    }

    if (!horaRegex.test(hora)) {
      Alert.alert("Formato incorrecto", "Hora debe tener formato HH:MM con dos puntos.");
      return;
    }

    if (!fecha || !hora || !estado || !motivo || !observacion || !tipoConsulta) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    Alert.alert(
      "Datos editados",
      `Fecha: ${fecha}\nHora: ${hora}\nEstado: ${estado}\nMotivo: ${motivo}\nObservación: ${observacion}\nTipo de consulta: ${tipoConsulta}`
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Editar Detalles de la Cita</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY/MM/DD"
              keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
              value={fecha}
              onChangeText={setFecha}
              maxLength={10}
              accessibilityLabel="Campo fecha"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Hora</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
              value={hora}
              onChangeText={setHora}
              maxLength={5}
              accessibilityLabel="Campo hora"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Estado</Text>
            <TextInput
              style={styles.input}
              placeholder="Estado de su cita"
              value={estado}
              onChangeText={setEstado}
              accessibilityLabel="Campo estado"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Motivo</Text>
            <TextInput
              style={styles.input}
              placeholder="Motivo de la cita"
              value={motivo}
              onChangeText={setMotivo}
              accessibilityLabel="Campo motivo"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Observación</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Observaciones adicionales"
              value={observacion}
              onChangeText={setObservacion}
              multiline
              numberOfLines={4}
              accessibilityLabel="Campo observación"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tipo de Consulta</Text>
            <TextInput
              style={styles.input}
              placeholder="Tipo de su consulta"
              value={tipoConsulta}
              onChangeText={setTipoConsulta}
              accessibilityLabel="Campo tipo de consulta"
            />
          </View>

          <BottonComponent title="Guardar Cambios" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 480,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 24,
    textAlign: "center",
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    fontSize: 18,
    color: "#111827",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
