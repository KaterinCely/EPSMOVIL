import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarCitas from '../../../Screen/Citas/ListarCitas';
import DetalleCitas from '../../../Screen/Citas/DetalleCitas';
import EditarCitas from '../../../Screen/Citas/EditarCitas';

const Stack = createStackNavigator();

export default function CitasStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ListaCitas" 
                component={ListarCitas} 
                options={{ title: "Citas" }} 
            />
            <Stack.Screen 
                name="EditarCitas" 
                component={EditarCitas} 
                options={{ title: "Nuevo/Editar Citas" }} 
            />
            <Stack.Screen 
                name="DetalleCitas"  
                component={DetalleCitas} 
                options={{ title: "Detalles Citas" }} 
            />
        </Stack.Navigator>
    );
}

