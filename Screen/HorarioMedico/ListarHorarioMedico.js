import React from "react";
import { View, Text, Button } from "react-native"
import BottonComponent from "../../components/BottonComponent"

export default function ListarHorarioMedicoScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aquí van a listar los horarios medicos</Text>

      <BottonComponent title="Ver detalle"
        onPress={() => navigation.navigate("DetalleHorarioMedico")} />

      <BottonComponent title="Nuevo horario medico" 
        onPress={() => navigation.navigate("EditarHorarioMedico")} />
        
    </View>
  );
}
