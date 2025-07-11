import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView, } from "react-native"
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearConsultorios, editarConsultorios } from "../../Src/Services/ConsultorioService";

export default function EditarConsultorioScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const consultorio = route.params?.consultorio;

  const [numero, setNumero] = useState(consultorio?.numero || "");
  const [piso, setPiso] = useState(consultorio?.piso || "");
  const [edificio, setEdificio] = useState(consultorio?.edificio?.toString() || "");
  const [descripcion, setDescripcion] = useState(consultorio?.descripcion?.toString() || "");
  const [disponible, setDisponible] = useState(consultorio?.disponible?.toString() || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!consultorio;

  const handleGuardar = async () => {
    if ( !numero || !piso || !edificio || !descripcion || !disponible) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      let result;

      if (esEdicion) {
        result = await editarConsultorios(consultorio.id, {
          numero:  parseInt(numero),
          piso: parseInt(piso), 
          edificio,
          descripcion,
          disponible,
        });
      } else {
        result = await crearConsultorios({ numero, piso, edificio, descripcion, disponible });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Consultorio actualizada" : "Consultorio creada");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Error al guardar la Consultorio");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar la Consultorio");
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
        <Text style={styles.titulo}>Nuevo Consultorio </Text>

         <View style={styles.inputContainer}>
          <Text style={styles.label}>Numero de Piso del Edificio</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de Piso"
            value={piso}
            onChangeText={ setPiso }
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Numero del Consultorio</Text>
          <TextInput
            style={styles.input}
            placeholder="Número del Consultorio"
            value={numero}
            onChangeText={setNumero}
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
          <Text style={styles.label}>Descripciocion del Consultorio</Text>
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
