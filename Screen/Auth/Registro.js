import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React , { useState } from "react";
import BottonComponent from "../../components/BottonComponent";
import {registroUser} from "../../Src/Services/AuthServices";



export default function RegistroScreen({ navigation }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!name || !email || !password || !role) {
            return Alert.alert("Error", "Todos los campos son obligatorios");
        }


        const result = await registroUser(name, email, password, role);
 

        if (result.success) {
            Alert.alert("Éxito", "Registro exitoso", [
                { text: "OK", onPress: () => navigation.navigate("InicioStacks") },
            ]);
        } else {
            Alert.alert("Error", result.message || "No se pudo registrar");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Registro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Rol"
                value={role}
                onChangeText={setRole}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <BottonComponent
                title="Registrarse"
                onPress={handleRegister}
            />

            <BottonComponent
                title="Ir a Login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});
