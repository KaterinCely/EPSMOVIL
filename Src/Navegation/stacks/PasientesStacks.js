import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarPasientes from '../../../Screen/Pasientes/ListarPasientes'; 
import DetallePasientes from '../../../Screen/Pasientes/DetallesPasientes'; 
import EditarPasientes from '../../../Screen/Pasientes/EditarPasientes'; 

const Stack = createStackNavigator();

export default function PasientesStack() { 
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ListarPasientes' 
                component={ListarPasientes} 
                options={{ title: "Pasientes" }} 
            />
            <Stack.Screen 
                name='EditarPasientes' 
                component={EditarPasientes} 
                options={{ title: "Nuevo/Editar Pasientes" }} 
            />
            <Stack.Screen 
                name='DetallePasientes' 
                component={DetallePasientes} 
                options={{ title: "Detalles Pasientes" }} 
            />
        </Stack.Navigator>
    );
}
