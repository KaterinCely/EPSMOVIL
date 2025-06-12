import React from "react";
import { View, Text, Button } from "react-native"
import BottonComponent from "../../components/BottonComponent"

export default function ListarMedicosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van alistar los medicos</Text>

      <BottonComponent title="Ver detalle"
        onPress={() => navigation.navigate("DetalleMedicos")} />

      <BottonComponent title="Nuevo medico"
        onPress={() => navigation.navigate("EditarMedicos")} />

    </View>
  );
}
