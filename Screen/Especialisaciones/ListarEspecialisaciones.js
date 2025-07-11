import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidad, eliminarEspecialidad, } from "../../Src/Services/ConsultorioService";
import EspecialidadesCard from "../../components/EspecialidadesCard"; // Deberás crear este componente como hiciste con ActividadCard

export default function ListarEspecializacionesScreen() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleCargarEspecialidades = async () => {
    setLoading(true);
    try {
      const result = await listarEspecialidad();
      if (result.success) {
        setEspecialidades(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las especialidades");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las especialidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarEspecialidades);
    return unsubscribe;
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar consultorio",
      "¿Estás seguro que deseas eliminar este consultorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarEspecialidad(id);
              
              if (result.success) {
                handleCargarEspecialidades();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el consultorio");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el consultorio");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (especialidades) => {
    navigation.navigate("editarConsultorios", { especialidades });
  };

  const handleCrear = () => {
    navigation.navigate("editarConsultorios");
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
        data={especialidades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EspecialidadesCard
            especialidades={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay especialidades registrado</Text>}
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear especialidades</Text>
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




