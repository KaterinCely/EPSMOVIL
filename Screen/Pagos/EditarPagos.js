import React, { useState, useEffect } from "react";
import BottonComponent from "../../components/BottonComponent";
import { ScrollView, View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, } from "react-native";

export default function EditarPagosScreen() {
  const [fecha, setFecha] = useState();
  const [total, setTotal] = useState();
  const [met_pago, setMetPago] = useState();
  const [estado, setEstado] = useState();
  const fechaRegex = /^\d{4}\/\d{2}\/\d{2}$/;


  const handleSubmit = () => {

    if (!fechaRegex.test(fecha)) {
      Alert.alert("Formato incorrecto", "Fecha debe tener formato YYYY/MM/DD con barras.");
      return;
    }

    if (!fecha || !total || !met_pago || !estado) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    Alert.alert(
      "Datos actualizados",
      `Fecha: ${fecha}\nTotal: ${total}\nMetPago: ${met_pago}\nEstado: ${estado}`
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
          <Text style={styles.title}>Editar Detalles de los Pagos</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha de Pago</Text>
            <TextInput
              style={styles.input}
              placeholder="Feacha de pago"
              value={fecha}
              onChangeText={setFecha}
              accessibilityLabel="Fecha"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Total a Pagar</Text>
            <TextInput
              style={styles.input}
              placeholder="Total del Pago"
              value={total}
              onChangeText={setTotal}
              accessibilityLabel="Total"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Metodo de pago</Text>
            <TextInput
              style={styles.input}
              placeholder="Metodo a pagar"
              value={met_pago}
              onChangeText={setMetPago}
              accessibilityLabel="Metodo de pago"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Estado de pago</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Estado en el que se encuenta el pago"
              value={estado}
              onChangeText={setEstado}
              multiline
              numberOfLines={4}
              accessibilityLabel="Estado"
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

