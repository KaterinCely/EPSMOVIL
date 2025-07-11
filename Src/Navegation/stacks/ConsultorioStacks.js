import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import listarConsultorios from '../../../Screen/Consultorios/ListarConsultorios';
import EditarConsultorios from '../../../Screen/Consultorios/EditarConsultorios';
import DetalleConsultorios from '../../../Screen/Consultorios/DetallesConsultorio';

const Stack = createStackNavigator();

export default function ConsultoriosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='listarConsultorios' 
                component={listarConsultorios} 
                options={{ title: "Consultorios" }} 
            />
            <Stack.Screen 
                name='editarConsultorios' 
                component={EditarConsultorios} 
                options={{ title: "Nuevo/Editar Consultorios" }} 
            />
            <Stack.Screen 
                name='detalleConsultorios'  
                component={DetalleConsultorios} 
                options={{ title: "Detalles Consultorios" }} 
            />
        </Stack.Navigator>
    );
}
