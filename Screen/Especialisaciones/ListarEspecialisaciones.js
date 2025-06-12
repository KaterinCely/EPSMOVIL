import React from "react";
import { View, Text,Button } from "react-native"
import BottonComponent from "../../components/BottonComponent"

export default function ListarEspecialisacionesScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar las Especialidades</Text>

       <BottonComponent title="Ver detalle"
        onPress={() => navigation.navigate("DetallesEspecialidades")} />

      <BottonComponent title="Nueva  especialidad"
        onPress={() => navigation.navigate("EditarEspecialidades")} />

    </View>
  );
}
