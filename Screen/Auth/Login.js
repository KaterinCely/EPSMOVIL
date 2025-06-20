import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { loginUser } from "../../Src/Services/AuthServices";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Exito", "¡Bienvenido!", [
          {
            Text: "OK",
            onPress: () => {
              console.log("Login exitoso, redirigiendo automaticamete... ");
            }
          }
        ]);
      } else {
        Alert.alert(
          "Error de Login",
          result.message || "Ocurrió un error al iniciar sesión."
        );
      }
    } catch (error) {
      console.error("Error inesperado en Login:", error);
      Alert.alert(
        "Error",
        "Ocurrio un erro inesperado al intentar iniciar sesion."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <BottonComponent
        title="Iniciar Sesión"
        // onPress={() => console.log("Login")}
        onPress={handleLogin}
        disabled={!loading}
      />
      <BottonComponent
        title="¿No tines cunta? Registrate"
        onPress={() => navigation.navigate("Registro")}
      // style={{ backgroundColor: "#43A047" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});