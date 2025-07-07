import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearCitas, editarCitas } from "../../Src/Services/CitasService";

export default function EditarCitasScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const citas = route.params?.citas;

  const [idPasientes, setIdPasientes] = useState(citas?.idPasientes || "");
  const [idMedicos, setIdMedicos] = useState(citas?.idMedicos || "");
  const [idConsultorios, setIdConsultorios] = useState(citas?.idConsultorios?.toString() || "");
  const [fecha, setfecha] = useState(citas?.fecha?.toString() || "");
  const [hora, setHora] = useState(citas?.hora?.toString() || "");
  const [estado, setEstado] = useState(citas?.estado?.toString() || "");
  const [motivo, setMotivo] = useState(citas?.motivo?.toString() || "");
  const [observacion, setObservacion] = useState(citas?.observacion?.toString() || "");
  const [tipo_consulta, setTipo_consulta] = useState(citas?.tipo_consulta?.toString() || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!citas;


  const handleGuardar = async () => {
    if (!idPasientes || !idMedicos || !idConsultorios || !fecha || !hora || !estado || !motivo || !observacion || !tipo_consulta) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarCitas(citas.id, { idMedicos, idPasientes, idConsultorios, fecha, hora, estadomotivo, observacion, tipo_consulta });
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
    <View style={styles.container}>
      <Text style={styles.titulo}>{esEdicion ? "Editar Cita" : "Crear Cita"}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>id Medicos</Text>
        <TextInput
          style={styles.input}
          placeholder="AD del la cita"
          keyboardType="numeric"
          value={idMedicos}
          onChangeText={setIdMedicos}
          maxLength={10}
          accessibilityLabel="Campo fecha"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>id Pasientes</Text>
        <TextInput
          style={styles.input}
          placeholder="ID del la Pasientes"
          keyboardType="numeric"
          value={idPasientes}
          onChangeText={setIdPasientes}
          maxLength={10}
          accessibilityLabel="Campo fecha"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>id Consultorios</Text>
        <TextInput
          style={styles.input}
          placeholder="ID del Consultorios"
          keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
          value={idConsultorios}
          onChangeText={setIdConsultorios}
          maxLength={10}
          accessibilityLabel="Campo fecha"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY/MM/DD"
          keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
          value={fecha}
          onChangeText={setfecha}
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
          value={tipo_consulta}
          onChangeText={setTipo_consulta}
          accessibilityLabel="Campo tipo de consulta"
        />
      </View>

      <TouchableOpacity
        style={Styles.boton} onPress={handleGuardar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={Styles.botonTexto}>{esEdicion ? "Actualizar" : "Crear"}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonTexto: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});