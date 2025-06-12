import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, AntDesign, FontAwesome6, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function InicioScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la EPS</Text>
            <Text style={styles.status}>Aca puedes realizar tus trámites</Text>
            <View style={styles.grid}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("CitasStack")}
                >
                    <FontAwesome6 name="hospital-user" size={24} color="#DDA0DD" />
                    <Text style={styles.cardText}>Citas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("ConsultoriosStack")}
                >
                    <FontAwesome5 name="hospital-alt" size={24} color="#DDA0DD" />
                    <Text style={styles.cardText}>Consultorios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("EspecialidadesStack")}
                >
                    <MaterialIcons name="medication" size={24} color="#DDA0DD" />
                    <Text style={styles.cardText}>Especialidades</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("HorarioMedicoStack")}
                >
                    <AntDesign name="clockcircle" size={24} color="#DDA0DD" />
                    <Text style={styles.cardText}>Horario Médico</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("MedicoStack")}
                >
                    <Fontisto name="doctor" size={24} color="#DDA0DD" />
                    <Text style={styles.cardText}>Médicos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("PagosStack")}
                >
                    <Ionicons name="cash-outline" size={24} color="#DDA0DD" />
                    <Text style={styles.cardText}>Pagos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("PasientesStack")}
                >
                    <FontAwesome6 name="person" size={24} color="#DDA0DD" />
                    <Text style={styles.cardText}>Pacientes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F7F7F7" },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#000" },
    status: { fontSize: 16, textAlign: "center", marginBottom: 30, color: "#555" },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    card: {
        width: "48%",
        height: 100,
        backgroundColor: "#E6E6FA",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        elevation: 2,
    },
    cardText: { marginTop: 10, fontSize: 14, color: "#666", textAlign: "center" },
});
