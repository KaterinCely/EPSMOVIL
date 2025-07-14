import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput,Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";

export default function DetallesEspecialidadScreen({ route }) {

  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();

   const handleSubmit = () => {
     if (!nombre || !descripcion ) {
       Alert.alert("Error", "Por favor complete todos los campos.");
       return;
     }
 
     Alert.alert(
       "Datos enviados",
       `Nombre: ${nombre}\nDescrpcion: ${descripcion}`
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
            <Text style={styles.title}>Detalles de la Especialidad</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre de la especialidad"
                value={nombre}
                onChangeText={setNombre}
                accessibilityLabel="Nombre"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Descripcion</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre de la especialidad"
                value={descripcion}
                onChangeText={setDescripcion}
                accessibilityLabel="Descripcion"
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
