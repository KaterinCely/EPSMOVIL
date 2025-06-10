import React from "react";
import { View, Text, Button } from "react-native"


export default function ListarMedicosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van alistar los medicos</Text>
      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetalleMedicos")}>
      </Button>

      <Button
        title="Nueva cita"
        onPress={() => navigation.navigate("EditarMedicos")}>
      </Button>
    </View>
  );
}
