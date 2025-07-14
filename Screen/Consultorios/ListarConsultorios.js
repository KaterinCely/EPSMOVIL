import React, { useEffect, useState } from "react"; 
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from "react-native";  
import { useNavigation } from "@react-navigation/native";  
import { listarConsultorios, eliminarConsultorios } from "../../Src/Services/ConsultorioService";  
import ConsultorioCard from "../../components/ConsultorioCard";  

// Componente principal ListarConsultoriosScreen
export default function ListarConsultoriosScreen() {
  const [consultorio, setConsultorio] = useState([]);  // Estado para almacenar los consultorios
  const [loading, setLoading] = useState(true);  // Estado para controlar el loading
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar los consultorios
  const handleCargarConsultorio = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarConsultorios(); 
      if (result.success) {
        setConsultorio(result.data);  // Actualiza el estado con los consultorios obtenidos
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los consultorios");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los consultorios");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  };

  // Efecto para cargar consultorios al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarConsultorio);
    return unsubscribe;  // Limpia el listener al desmontar el componente
  }, [navigation]);

  // Función para manejar la eliminación de un consultorio
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
              const result = await eliminarConsultorios(id);  // Llama al servicio para eliminar el consultorio
              if (result.success) {
                handleCargarConsultorio();  // Recarga los consultorios después de eliminar
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

  // Función para manejar la edición de un consultorio
  const handleEditar = (consultorio) => {
    navigation.navigate("editarConsultorios", { consultorio });  // Navega a la pantalla de edición
  };

  // Función para manejar la creación de un nuevo consultorio
  const handleCrear = () => {
    navigation.navigate("editarConsultorios");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se obtienen los consultorios
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  // Renderiza la lista de consultorios
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={consultorio}  // Datos de los consultorios
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <ConsultorioCard
            consultorio={item}  // Pasa el consultorio al componente ConsultorioCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay consultorios registrados</Text>}  // Mensaje si no hay consultorios
        contentContainerStyle={{ paddingBottom: 100 }}  // Espacio adicional para el botón
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear consultorio</Text>
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
