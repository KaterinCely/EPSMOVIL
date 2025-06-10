import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import BottonComponent from "../../components/BottonComponent";

export default function RegistroScreen({ navigation }) {
    // State variables for form inputs
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle form submission
    const handleRegister = () => {
        console.log({ name, role, email, password });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla Registro</Text>

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
