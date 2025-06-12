import React from "react";
import { View, Text, Button } from "react-native"
import BottonComponent from "../../components/BottonComponent"

export default function ListarPasientesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar los pasientes</Text>


      <BottonComponent title="Ver detalle"
        onPress={() => navigation.navigate("DetallePasientes")} />

      <BottonComponent title="Nuevo pago"
        onPress={() => navigation.navigate("EditarPasientes")} />

    </View>
  );
}
