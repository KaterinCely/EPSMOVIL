import React from "react";
import { View, Text, Button } from "react-native"


export default function ListarHorarioMedicoScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar los horarios medicos</Text>
      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetalleHorarioMedico")}>
      </Button>

      <Button
        title="Nueva cita"
        onPress={() => navigation.navigate("EditarHorarioMedico")}>
      </Button>
    </View>
  );
}
