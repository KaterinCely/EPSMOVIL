import React from "react";
import { View, Text,Button } from "react-native"


export default function ListarPasientesScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar los pasientes</Text>
      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetallePasientes")}>
      </Button>

      <Button
        title="Nueva cita"
        onPress={() => navigation.navigate("EditarPasientes")}>
      </Button>
    </View>
  );
}
