import React from "react";
import { View, Text} from "react-native"
import BottonComponent from "../../components/BottonComponent"

export default function ListarConsultoriosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar los Consultorios</Text>

      <BottonComponent title="Ver detalle"
        onPress={() => navigation.navigate("DetalleConsultorios")} />

      <BottonComponent title="Nueva  especialidad"
        onPress={() => navigation.navigate("EditarConsultorios")} />

    </View>
  );
}
