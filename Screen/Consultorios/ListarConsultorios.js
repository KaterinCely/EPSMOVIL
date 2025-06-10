import React from "react";
import { View, Text, Button } from "react-native"


export default function ListarConsultoriosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar los Consultorios</Text>

      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetalleConsultorios")}>
      </Button>

      <Button
        title="Nueva cita"
        onPress={() => navigation.navigate("EditarConsultorios")}>
      </Button>
    </View>
  );
}
