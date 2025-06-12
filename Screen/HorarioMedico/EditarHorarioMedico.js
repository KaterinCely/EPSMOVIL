import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";

export default function EditarHorarioMeedicoScreen() {
  const [dias, setDias] = useState();
  const [fecha_ini, setInicio] = useState();
  const [fecha_fin, setFinal] = useState();
  const [activo, setActivo] = useState();
  const fechaRegex = /^\d{4}\/\d{2}\/\d{2}$/;

  const handleSubmit = () => {

    if (!fechaRegex.test(fecha_ini,fecha_fin)) {
      Alert.alert("Formato incorrecto", "Fecha debe tener formato YYYY/MM/DD con barras.");
      return;
    }

    if (!dias || !fecha_ini || !fecha_fin || !activo) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    Alert.alert(
      "Datos enviados",
      `Dias: ${dias}\nFechaIni: ${fecha_ini}\nFechaFin:${fecha_fin}\nActico:${activo}`
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
          <Text style={styles.title}>Datos actualizados</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Dias Laborales</Text>
            <TextInput
              style={styles.input}
              placeholder="Dias laborales del medico"
              value={dias}
              onChangeText={setDias}
              accessibilityLabel="Dias"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha de Inicio Laboral</Text>
            <TextInput
              style={styles.input}
             placeholder="YYYY/MM/DD"
              value={fecha_ini}
              onChangeText={setInicio}
              accessibilityLabel="Fecha de inicio"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha Laboral Final</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY/MM/DD"
              value={fecha_fin}
              onChangeText={setFinal}
              accessibilityLabel="Fecha de Final"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Horario del medico Activo</Text>
            <TextInput
              style={styles.input}
              placeholder="Horario del Medico Activo"
              value={activo}
              onChangeText={setActivo}
              accessibilityLabel="Activo"
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
  value: {
    fontSize: 18,
    color: "#111827",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 80,
    textAlignVertical: "top",
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
