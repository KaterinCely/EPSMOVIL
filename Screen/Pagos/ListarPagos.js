import React from "react";
import { View, Text, Button } from "react-native"
import BottonComponent from "../../components/BottonComponent"

export default function ListarPagosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar los pagos</Text>

      <BottonComponent title="Ver detalle"
        onPress={() => navigation.navigate("DetallePagos")} />

      <BottonComponent title="Nuevo pago"
        onPress={() => navigation.navigate("EditarPagos")} />
        
    </View>
  );
}
