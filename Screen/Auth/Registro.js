import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import { registroUser  } from "../../Src/Services/AuthServices"; // Importa la función para manejar el registro
import BottonComponent from "../../components/BottonComponent"; // Importa un componente de botón personalizado

export default function RegistroScreen({ navigation }) {
    // Estados para manejar el nombre, rol, correo y contraseña
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Función para manejar el registro
    const handleRegister = async () => {
        // Verifica que todos los campos estén llenos
        if (!name || !email || !password || !role) {
            return Alert.alert("Error", "Todos los campos son obligatorios");
        }

        // Llama a la función de registro
        const result = await registroUser (name, email, password, role);

        // Manejo de la respuesta del registro
        if (result.success) {
            Alert.alert("Éxito", "Registro exitoso", [
                { text: "OK", onPress: () => navigation.navigate("Login") }, // Navega a la pantalla de inicio de sesión
            ]);
        } else {
            Alert.alert("Error", result.message || "No se pudo registrar"); // Muestra un mensaje de error
        }
    };

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.logo}>REGISTRO</Text>
                <Text style={styles.subtitle}>Únete a nuestra EPS</Text>
            </View>

            {/* Contenedor de desplazamiento para el formulario */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled" // Permite que el teclado no cierre el formulario al tocar
            >
                <View style={styles.formContainer}>
                    {/* Campo de entrada para el nombre */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu nombre"
                            value={name}
                            onChangeText={setName} // Actualiza el estado del nombre
                        />
                    </View>

                    {/* Campo de entrada para el rol */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Rol</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="admin o user"
                            value={role}
                            onChangeText={setRole} // Actualiza el estado del rol
                        />
                    </View>

                    {/* Campo de entrada para el correo electrónico */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Correo Electrónico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChangeText={setEmail} // Actualiza el estado del correo
                            keyboardType="email-address" // Teclado específico para correos
                            autoCapitalize="none" // No capitaliza automáticamente
                        />
                    </View>

                    {/* Campo de entrada para la contraseña */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="*********"
                            value={password}
                            onChangeText={setPassword} // Actualiza el estado de la contraseña
                            secureTextEntry // Oculta el texto de la contraseña
                        />
                    </View>

                    {/* Botón de registro */}
                    <BottonComponent
                        title="Registrarse"
                        onPress={handleRegister} // Llama a la función de registro
                    />
                </View>
            </ScrollView>

            {/* Enlace para ir a la pantalla de inicio de sesión */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.loginLink}
                >
                    <Text style={styles.loginText}>
                        ¿Ya tienes cuenta? <Text style={styles.loginHighlight}>Inicia sesión</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Estilos para los componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Color de fondo
    },
    header: {
        height: 180, // Altura del encabezado
        backgroundColor: '#DDA0DD', // Color de fondo del encabezado
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white', // Color del texto del logo
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)', // Color del subtítulo
    },
    scrollView: {
        flex: 1, // Permite que el ScrollView ocupe todo el espacio disponible
    },
    scrollContent: {
        paddingBottom: 20, // Espacio adicional en la parte inferior
    },
    formContainer: {
        paddingHorizontal: 30, // Espaciado horizontal del formulario
        paddingTop: 30, // Espaciado superior del formulario
    },
    inputContainer: {
        marginBottom: 20, // Espaciado inferior entre campos
    },
    label: {
        fontSize: 14,
        color: '#636e72', // Color de las etiquetas
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        height: 50, // Altura de los campos de entrada
        borderWidth: 1,
        borderColor: '#dfe6e9', // Color del borde
        borderRadius: 10, // Bordes redondeados
        paddingHorizontal: 15, // Espaciado interno horizontal
        backgroundColor: '#FFFFFF', // Color de fondo de los campos
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        padding: 20, // Espaciado del pie de página
        borderTopWidth: 1,
        borderTopColor: '#eee', // Color del borde superior
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLink: {
        paddingVertical: 10, // Espaciado vertical del enlace
    },
    loginText: {
        fontSize: 15,
        color: '#636e72', // Color del texto del enlace
    },
    loginHighlight: {
        color: '#DDA0DD', // Color destacado del texto
        fontWeight: 'bold',
    },
});
