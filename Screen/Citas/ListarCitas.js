import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarCitas, eliminarCitas, } from "../../Src/Services/CitasService";
import CitaCard from "../../components/CitasCard"; // Deberás crear este componente como hiciste con ActividadCard

export default function ListarCitasScreen() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleCargarCitas = async () => {
    setLoading(true);
    try {
      const result = await listarCitas();
      if (result.success) {
        setCitas(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las citas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las citas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarCitas);
    return unsubscribe;
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar cita",
      "¿Estás seguro que deseas eliminar esta cita?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarCitas(id);
              if (result.success) {
                handleCargarCitas();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la cita");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la cita");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (cita) => {
    navigation.navigate("editarCitas", { cita });
  };

  const handleCrear = () => {
    navigation.navigate("editarCitas");
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CitaCard
            cita={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay citas registradas</Text>}
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear Cita</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  boton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#DDA0DD",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});




