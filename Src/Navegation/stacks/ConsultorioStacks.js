import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarConsultorios from '../../../Screen/Consultorios/ListarConsultorios';
import EditarConsultorios from '../../../Screen/Consultorios/EditarConsultorios';
import DetalleConsultorios from '../../../Screen/Consultorios/DetallesConsultorio';

const Stack = createStackNavigator();

export default function ConsultoriosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ListarConsultorios' 
                component={ListarConsultorios} 
                options={{ title: "Consultorios" }} 
            />
            <Stack.Screen 
                name='EditarConsultorios' 
                component={EditarConsultorios} 
                options={{ title: "Nuevo/Editar Consultorios" }} 
            />
            <Stack.Screen 
                name='DetalleConsultorios'  
                component={DetalleConsultorios} 
                options={{ title: "Detalles Consultorios" }} 
            />
        </Stack.Navigator>
    );
}
