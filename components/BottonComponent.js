import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "rgb(129, 107, 131)", 
        padding: 12,
        borderRadius: 15,
        alignItems: "center",
        marginVertical: 10,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    }
});
