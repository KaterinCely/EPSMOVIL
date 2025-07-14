import React, { useEffect, useState } from "react";  
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"; 
import { useNavigation } from "@react-navigation/native"; 
import { listarMedicos, eliminarMedicos } from "../../Src/Services/MedicosService";  
import MedicoCard from "../../components/MedicoCard";  

// Componente principal ListarMedicosScreen
export default function ListarMedicosScreen() {
  const [medicos, setMedicos] = useState([]);  // Estado para almacenar la lista de médicos
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar médicos
  const handleCargarMedicos = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarMedicos();  
      if (result.success) {
        setMedicos(result.data);  // Actualiza el estado con los datos de médicos
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los médicos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los médicos");
    } finally {
      setLoading(false);  // Finaliza la carga
    }
  };

  // Efecto para cargar médicos al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarMedicos);
    return unsubscribe;  // Limpia el listener al desmontar
  }, [navigation]);

  // Función para eliminar un médico
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar médico",
      "¿Estás seguro que deseas eliminar este médico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarMedicos(id);  // Llama al servicio para eliminar médico
              if (result.success) {
                handleCargarMedicos();  // Recarga la lista de médicos
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el médico");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el médico");
            }
          },
        },
      ]
    );
  };

  // Función para editar un médico
  const handleEditar = (medicos) => {
    navigation.navigate("editarMedicos", { medicos });  // Navega a la pantalla de edición
  };

  // Función para crear un nuevo médico
  const handleCrear = () => {
    navigation.navigate("editarMedicos");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se cargan los médicos
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#DDA0DD" />
      </View>
    );
  }

  // Renderiza la lista de médicos
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={medicos}  // Datos de los médicos
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <MedicoCard
            medicos={item}  // Pasa el médico al componente MedicoCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay médicos registrados</Text>}  // Mensaje si no hay médicos
        contentContainerStyle={{ paddingBottom: 100 }}  // Espacio adicional para el botón
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear Médico</Text>
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
