import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function DetallesPasientesScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this URL with your real API endpoint or data source
  const API_URL = "https://example.com/api/pacientes";

  useEffect(() => {
    async function fetchPacientes() {
      try {
        setLoading(true);
        setError(null);
        // Example fetch - replace with your actual data fetching logic
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Error al obtener datos de pacientes");
        }
        const data = await response.json();

        // Map or transform data if needed, here assumed data is an array of patients
        setPacientes(data);
      } catch (err) {
        setError(err.message);
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPacientes();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Cargando detalles de las pasientes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Hubo un error al cargar los datos.</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (pacientes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noDataText}>No hay datos disponibles de las pasientes.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Detalles de las Pasientes</Text>
      {pacientes.map((paciente, index) => (
        <View key={paciente.id || index} style={styles.card}>
          <Text style={styles.cardTitle}>{paciente.nombre || paciente.name || "Nombre no disponible"}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.value}>{paciente.edad ?? paciente.age ?? "N/A"} años</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Género:</Text>
            <Text style={styles.value}>{paciente.genero ?? paciente.gender ?? "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{paciente.telefono ?? paciente.phone ?? "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{paciente.direccion ?? paciente.address ?? "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Antecedentes:</Text>
            <Text style={styles.value}>{paciente.antecedentes ?? paciente.history ?? "N/A"}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    width: 110,
    color: "#555",
  },
  value: {
    flex: 1,
    color: "#444",
    flexWrap: "wrap",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6200ee",
  },
  errorText: {
    color: "#b00020",
    fontSize: 16,
    textAlign: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

