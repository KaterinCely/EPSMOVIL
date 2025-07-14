import React, { useState } from "react";
import BottonComponent from "../../components/BottonComponent";
import {ScrollView,View,Text,TextInput,StyleSheet,Alert,KeyboardAvoidingView,Platform,} from "react-native";

export default function DetallesConsultorioScreen() {
  const [numero, setNumero] = useState("");
  const [piso, setPiso] = useState("");
  const [edificio, setEdificio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [disponible, setDisponible] = useState("");

  const handleSubmit = () => {
    if (!numero || !piso || !edificio || !descripcion || !disponible) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    Alert.alert(
      "Datos enviados",
      `Número: ${numero}\nPiso: ${piso}\nEdificio: ${edificio}\nDescripción: ${descripcion}\nDisponible: ${disponible}`
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
          <Text style={styles.title}>Formulario de Detalles de Consultorio</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              placeholder="Número del consultorio"
              value={numero}
              onChangeText={setNumero}
              accessibilityLabel="Campo número"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Piso</Text>
            <TextInput
              style={styles.input}
              placeholder="Piso del consultorio"
              value={piso}
              onChangeText={setPiso}
              accessibilityLabel="Campo piso"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Edificio</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del edificio"
              value={edificio}
              onChangeText={setEdificio}
              accessibilityLabel="Campo edificio"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Descripción del consultorio"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={4}
              accessibilityLabel="Campo descripción"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Disponible</Text>
            <TextInput
              style={styles.input}
              placeholder="Estado de disponibilidad"
              value={disponible}
              onChangeText={setDisponible}
              accessibilityLabel="Campo disponible"
            />
          </View>

          <BottonComponent title="Enviar" onPress={handleSubmit} />
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
