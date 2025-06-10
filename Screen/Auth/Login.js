import { View, Text, TextInput, StyleSheet } from "react-native"
import BottonComponent from "../../components/BottonComponent"
import react, { useState } from "react";

export default function LoginScreen({navigation}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <BottonComponent
                title="Iniciar Sesión"
                onPress={() => console.log("Iniciar Sesión")}
            />
            <BottonComponent
                title="Registrarse"
                onPress={() => navigation.navigate("Registro")}
            />
        </View>
    )
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
            height: 40,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 16,
            marginBottom: 16,
        },
    });