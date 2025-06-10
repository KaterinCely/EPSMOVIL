import React from "react";
import { View, Text,Button } from "react-native"


export default function ListarEspecialisacionesScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar las Especialidades</Text>
      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetallesEspecialidades")}>
      </Button>

      <Button
        title="Nueva cita"
        onPress={() => navigation.navigate("EditarEspecialidades")}>
      </Button>
    </View>
  );
}
