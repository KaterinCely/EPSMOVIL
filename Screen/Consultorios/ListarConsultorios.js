import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarConsultorios, eliminarConsultorios, } from "../../Src/Services/ConsultorioService";
import ConsultorioCard from "../../components/ConsultorioCard"; // Deberás crear este componente como hiciste con ActividadCard

export default function ListarConsultoriosScreen() {
  const [consultorio, setConsultorio] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleCargarConsultorio = async () => {
    setLoading(true);
    try {
      const result = await listarConsultorios();
      if (result.success) {
        setConsultorio(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las consultorios");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las consultorios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarConsultorio);
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
              const result = await eliminarConsultorios(id);
              
              if (result.success) {
                handleCargarConsultorio();
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

  const handleEditar = (consultorio) => {
    navigation.navigate("editarConsultorios", { consultorio });
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
        data={consultorio}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ConsultorioCard
            consultorio={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay consultorio registrado</Text>}
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear consultorio</Text>
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




