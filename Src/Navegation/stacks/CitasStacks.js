import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator } from "@react-navigation/native-stack";

import ListarCitas from '../../../Screen/Citas/ListarCitas';
import DetalleCitas from '../../../Screen/Citas/DetalleCitas';
import EditarCitas from '../../../Screen/Citas/EditarCitas';

const Stack = createNativeStackNavigator();

export default function CitasStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ListaCitas" 
                component={ListarCitas} 
                options={{ title: "Citas" }} 
            />
            <Stack.Screen 
                name="editarCitas" 
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

