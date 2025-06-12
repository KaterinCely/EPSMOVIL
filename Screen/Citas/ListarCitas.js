import React from "react";
import { View, Text } from "react-native"
import BottonComponent from "../../components/BottonComponent";

export default function ListarCitasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí se va a listar las citas</Text>

      <BottonComponent title="Ver detalle"
        onPress={() => navigation.navigate("DetalleCitas")} />

      <BottonComponent title="Nueva cita"
        onPress={() => navigation.navigate("EditarCitas")} />
        
    </View>
  );
}
