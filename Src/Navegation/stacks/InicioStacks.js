import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, AntDesign, FontAwesome6, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function InicioScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la EPS</Text>
            <Text style={styles.status}>Aca puedes realisar tus tramites</Text>
            <View style={styles.grid}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("CitasStack")}

                >
                    <FontAwesome6 name="hospital-user" size={24} color="black" />
                    <Text style={styles.cardText}>Citas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("ConsultoriosStack")}

                >
                    <FontAwesome5 name="hospital-alt" size={24} color="black" />
                    <Text style={styles.cardText}>Consultorios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("EspecialidadesStack")}

                >
                    <MaterialIcons name="medication" size={24} color="black"></MaterialIcons>
                    <Text style={styles.cardText}>Especialidades</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("HorarioMedicoStack")}

                >
                    <AntDesign name="clockcircle" size={24} color="black" />
                    <Text style={styles.cardText}>Horario Medico</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("MedicoStack")}

                >
                    <Fontisto name="doctor" size={24} color="black" />
                    <Text style={styles.cardText}>Medicos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("PagosStack")}

                >
                    <Ionicons name="cash-outline" size={24} color="black" />
                    <Text style={styles.cardText}>Pagos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("PasientesStack")}

                >
                    <FontAwesome6 name="person" size={24} color="black" />
                    <Text style={styles.cardText}>Pasientes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#1976D2" },
    status: { fontSize: 16, textAlign: "center", marginBottom: 30, color: "#555" },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    card: {
        width: "48%",
        height: 100,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        elevation: 2,
    },
    cardText: { marginTop: 10, fontSize: 14, color: "#333", textAlign: "center" },
});