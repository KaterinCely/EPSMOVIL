import React from "react";
import { View, Text, Button } from "react-native"


export default function ListarCitasScreen({navigation}) {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}> 
        <Text>Aquí se va a listar las citas</Text>

        <Button
          title="Ver detalle" 
          onPress={()=> navigation.navigate("DetalleCitas")}>
        </Button>
      
        <Button
          title="Nueva cita" 
          onPress={()=> navigation.navigate("EditarCitas")}>
        </Button>
    </View>
  );
}
