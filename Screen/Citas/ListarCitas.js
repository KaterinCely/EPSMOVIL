import React, { useEffect, useState } from "react";  
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";  
import { useNavigation } from "@react-navigation/native"; 
import { listarCitas, eliminarCitas } from "../../Src/Services/CitasService";  
import CitaCard from "../../components/CitasCard"; 

// Componente principal ListarCitasScreen
export default function ListarCitasScreen() {
  const [citas, setCitas] = useState([]);  // Estado para almacenar las citas
  const [loading, setLoading] = useState(true);  // Estado para controlar el loading
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar las citas
  const handleCargarCitas = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarCitas();  
      if (result.success) {
        setCitas(result.data);  // Actualiza el estado con las citas obtenidas
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las citas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las citas");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  };

  // Efecto para cargar citas al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarCitas);
    return unsubscribe;  // Limpia el listener al desmontar el componente
  }, [navigation]);

  // Función para manejar la eliminación de una cita
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
              const result = await eliminarCitas(id);  // Llama al servicio para eliminar la cita
              if (result.success) {
                handleCargarCitas();  // Recarga las citas después de eliminar
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

  // Función para manejar la edición de una cita
  const handleEditar = (cita) => {
    navigation.navigate("editarCitas", { cita });  // Navega a la pantalla de edición
  };

  // Función para manejar la creación de una nueva cita
  const handleCrear = () => {
    navigation.navigate("editarCitas");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se obtienen las citas
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  // Renderiza la lista de citas
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={citas}  // Datos de las citas
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <CitaCard
            cita={item}  // Pasa la cita al componente CitaCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay citas registradas</Text>}  // Mensaje si no hay citas
        contentContainerStyle={{ paddingBottom: 100 }}  // Espacio adicional para el botón
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear Cita</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos del componente
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
