import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarEspecialidades from '../../../Screen/Especialisaciones/ListarEspecialisaciones'; 
import DetallesEspecialidades from '../../../Screen/Especialisaciones/DetallesEspecialisaciones'; 
import EditarEspecialidades from '../../../Screen/Especialisaciones/EditarEspecializaciones'; 

const Stack = createStackNavigator();

export default function EspecialidadesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ListarEspecialidades' 
                component={ListarEspecialidades} 
                options={{ title: "Especializaciones" }}
            />
            <Stack.Screen 
                name='EditarEspecialidades' 
                component={EditarEspecialidades} 
                options={{ title: "Nuevo/Editar Especializaciones" }} 
            />
            <Stack.Screen 
                name='DetallesEspecialidades'  
                component={DetallesEspecialidades} 
                options={{ title: "Detalles Especializaciones" }} 
            />
        </Stack.Navigator>
    );
}
