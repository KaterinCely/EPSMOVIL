import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";

export default function EditarPasientesScreen() {
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [tipo_documento, setTipoDoc] = useState();
  const [num_documento, setNumeroDoc] = useState();
  const [genero, setGenero] = useState();
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();

  const handleSubmit = () => {

    if (!nombre || !apellido || !num_documento || !tipo_documento || !telefono || !correo || !genero) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    Alert.alert(
      "Datos enviados",
      `Nombre: ${nombre}\nApellido: ${apellido}\nNumDocumento:${num_documento}\nTipoDoc:${tipo_documento}\nTelefono: ${telefono}\nEmail: ${correo}\nGenero: ${genero}`
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
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
              accessibilityLabel="Nombre"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="  Apellido"
              value={apellido}
              onChangeText={setApellido}
              accessibilityLabel="Apellido"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tipo de Documento</Text>
            <TextInput
              style={styles.input}
              placeholder="tipo_documento"
              value={tipo_documento}
              onChangeText={setTipoDoc}
              accessibilityLabel="tipo_documento"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Numero de Documento</Text>
            <TextInput
              style={styles.input}
              placeholder="Numero de documento"
              value={num_documento}
              onChangeText={setNumeroDoc}
              accessibilityLabel="num_documento"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Genero</Text>
            <TextInput
              style={styles.input}
              placeholder=" Genero"
              value={genero}
              onChangeText={setGenero}
              accessibilityLabel="Genero"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Numero Telefonico</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono"
              value={telefono}
              onChangeText={setTelefono}
              accessibilityLabel="Telefono"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electronico"
              value={correo}
              onChangeText={setCorreo}
              accessibilityLabel="Correp"
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
