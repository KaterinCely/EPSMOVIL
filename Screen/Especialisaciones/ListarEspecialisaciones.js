import React, { useEffect, useState } from "react";  
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";  
import { useNavigation } from "@react-navigation/native";  // Hook para la navegación
import { listarEspecialidad, eliminarEspecialidad } from "../../Src/Services/EspecialidadesService";  
import EspecialidadesCard from "../../components/EspecialidadesCard"; 

// Componente principal ListarEspecializacionesScreen
export default function ListarEspecializacionesScreen() {
  const [especialidades, setEspecialidades] = useState([]);  // Estado para almacenar las especialidades
  const [loading, setLoading] = useState(true);  // Estado para controlar el loading
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar las especialidades
  const handleCargarEspecialidades = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarEspecialidad();  
      if (result.success) {
        setEspecialidades(result.data);  // Actualiza el estado con las especialidades obtenidas
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las especialidades");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las especialidades");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  };

  // Efecto para cargar especialidades al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarEspecialidades);
    return unsubscribe;  // Limpia el listener al desmontar el componente
  }, [navigation]);

  // Función para manejar la eliminación de una especialidad
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar especialidad",
      "¿Estás seguro que deseas eliminar esta especialidad?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarEspecialidad(id);  // Llama al servicio para eliminar la especialidad
              if (result.success) {
                handleCargarEspecialidades();  // Recarga las especialidades después de eliminar
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la especialidad");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la especialidad");
            }
          },
        },
      ]
    );
  };

  // Función para manejar la edición de una especialidad
  const handleEditar = (especialidades) => {
    navigation.navigate("editarEspecialidad", { especialidades });  // Navega a la pantalla de edición
  };

  // Función para manejar la creación de una nueva especialidad
  const handleCrear = () => {
    navigation.navigate("editarEspecialidad");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se obtienen las especialidades
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#DDA0DD" />
      </View>
    );
  }

  // Renderiza la lista de especialidades
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={especialidades}  // Datos de las especialidades
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <EspecialidadesCard
            especialidades={item}  // Pasa la especialidad al componente EspecialidadesCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay especialidades registradas</Text>}  // Mensaje si no hay especialidades
        contentContainerStyle={{ paddingBottom: 100 }}  // Espacio adicional para el botón
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear especialidades</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
