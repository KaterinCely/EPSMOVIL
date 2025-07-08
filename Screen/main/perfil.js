import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/conexion";
import { logoutUser } from "../../Src/Services/AuthServices";
import { Ionicons } from "@expo/vector-icons";

export default function PantallaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          console.log("No se encontró token, redirigiendo al login");
          return;
        }

        console.log("Intentando cargar perfil con token:", token);
        const response = await api.get("/listarUsuarios");
        console.log("Respuesta del perfil:", response.data);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);

        if (error.isAuthError || error.shouldRedirectToLogin) {
          console.log("Error de autenticación manejado por el interceptor");
          return;
        }

        if (error.response) {
          console.log("Error del servidor:", error.response.status);
          Alert.alert(
            "Error del servidor",
            `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil"}`,
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        }
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007B8C" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.errorText}>No se pudo cargar la información del perfil</Text>
        </View>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#666" />
          <Text style={styles.infoText}>
            {usuario?.user?.name || "Nombre no disponible"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#666" />
          <Text style={styles.infoText}>
            {usuario?.user?.email || "Email no disponible"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('EditarPerfil')}
        style={styles.editButton}
      >
        <Ionicons name="create-outline" size={22} color="#FFFFFF" />
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
         onPress={async () => {
            await logoutUser();
        
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        <Text style={styles.editButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    color: '#1E1E1E',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#E6E6FA',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    elevation: 3,
    width: '90%', 
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoText: {
    color: '#666',
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '500'
  },
  divider: {
    height: 1,
    backgroundColor: '#424242',
    marginVertical: 8
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#DDA0DD',
    borderRadius: 25,
    padding: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
    width: '45%', 
    borderWidth: 1,
    borderColor: '#DDA0DD',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10, 
  },
 
});


