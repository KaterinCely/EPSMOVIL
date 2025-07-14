import React, { useEffect, useState } from "react"; 
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";  // Componentes básicos de React Native
import { useNavigation } from "@react-navigation/native";  
import { listarHoraMedico, eliminarHoraMedico } from "../../Src/Services/HoraMedicaService"; 
import HoraMedicaCard from "../../components/HorarioMedicoCard";

// Componente principal ListarHorarioMedicoScreen
export default function ListarHorarioMedicoScreen() {
  const [hora_medico, setHoraMedico] = useState([]);  // Estado para almacenar los horarios médicos
  const [loading, setLoading] = useState(true);  // Estado para controlar el loading
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar los horarios médicos
  const handleCargarHoraMedico = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarHoraMedico(); 
      if (result.success) {
        setHoraMedico(result.data);  // Actualiza el estado con los horarios médicos obtenidos
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los horarios médicos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los horarios médicos");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  };

  // Efecto para cargar horarios médicos al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarHoraMedico);
    return unsubscribe;  // Limpia el listener al desmontar el componente
  }, [navigation]);

  // Función para manejar la eliminación de un horario médico
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar horario médico",
      "¿Estás seguro que deseas eliminar el horario médico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarHoraMedico(id);  // Llama al servicio para eliminar el horario médico
              if (result.success) {
                handleCargarHoraMedico();  // Recarga los horarios médicos después de eliminar
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar los horarios médicos");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar los horarios médicos");
            }
          },
        },
      ]
    );
  };

  // Función para manejar la edición de un horario médico
  const handleEditar = (hora_medico) => {
    navigation.navigate("editarHoraMedico", { hora_medico });  // Navega a la pantalla de edición
  };

  // Función para manejar la creación de un nuevo horario médico
  const handleCrear = () => {
    navigation.navigate("editarHoraMedico");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se obtienen los horarios médicos
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#DDA0DD" />
      </View>
    );
  }

  // Renderiza la lista de horarios médicos
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={hora_medico}  // Datos de los horarios médicos
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <HoraMedicaCard
            hora_medico={item}  // Pasa el horario médico al componente HoraMedicaCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay horarios médicos registrados</Text>}  // Mensaje si no hay horarios médicos
        contentContainerStyle={{ paddingBottom: 100 }}  // Espacio adicional para el botón
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear horario médico</Text>
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
