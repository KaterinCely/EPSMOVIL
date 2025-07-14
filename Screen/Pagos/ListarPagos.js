
import React, { useEffect, useState } from "react"; 
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";  
import { useNavigation } from "@react-navigation/native"; 
import { listarPagos, eliminarPagos } from "../../Src/Services/PagosService"; 
import PagosCard from "../../components/PagosCard"; 

// Componente principal ListarPagosScreen
export default function ListarPagosScreen() {
  const [pagos, setPagos] = useState([]);  // Estado para almacenar la lista de pagos
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar los pagos
  const handleCargarPagos = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarPagos();  
      if (result.success) {
        setPagos(result.data);  // Actualiza el estado con los datos de pagos
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los pagos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pagos");
    } finally {
      setLoading(false);  // Finaliza la carga
    }
  };

  // Efecto para cargar los pagos al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarPagos);
    return unsubscribe;  // Limpia el listener al desmontar
  }, [navigation]);

  // Función para eliminar un pago
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar pago",
      "¿Estás seguro que deseas eliminar este pago?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarPagos(id);  // Llama al servicio para eliminar el pago
              if (result.success) {
                handleCargarPagos();  // Recarga la lista de pagos
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el pago");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el pago");
            }
          },
        },
      ]
    );
  };

  // Función para editar un pago
  const handleEditar = (pagos) => {
    navigation.navigate("editarPagos", { pagos });  // Navega a la pantalla de edición
  };

  // Función para crear un nuevo pago
  const handleCrear = () => {
    navigation.navigate("editarPagos");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se cargan los pagos
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#DDA0DD" />
      </View>
    );
  }

  // Renderiza la lista de pagos
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={pagos}  // Datos de los pagos
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <PagosCard
            pagos={item}  // Pasa el pago al componente PagosCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay pagos registrados</Text>}  // Mensaje si no hay pagos
        contentContainerStyle={{ paddingBottom: 100 }}  // Espacio adicional para el botón
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear pagos</Text>
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
