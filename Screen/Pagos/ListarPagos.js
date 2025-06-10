import React from "react";
import { View, Text,Button } from "react-native"


export default function ListarPagosScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar los pagos</Text>

      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetallePagos")}>
      </Button>

      <Button
        title="Nueva cita"
        onPress={() => navigation.navigate("EditarPagos")}>
      </Button>
    </View>
  );
}
