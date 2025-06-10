import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarMedicos from '../../../Screen/Medicos/ListarMedicos';
import DetalleMedicos from '../../../Screen/Medicos/DetallesMedicos';
import EditarMedicos from '../../../Screen/Medicos/EditarMedicos';

const Stack = createStackNavigator();

export default function MedicoStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ListarMedicos' 
                component={ListarMedicos} 
                options={{ title: "Médicos" }} 
            />
            <Stack.Screen 
                name='EditarMedicos' 
                component={EditarMedicos} 
                options={{ title: "Nuevo/Editar Médicos" }} 
            />
            <Stack.Screen 
                name='DetalleMedicos'  
                component={DetalleMedicos} 
                options={{ title: "Detalles Médicos" }} 
            />
        </Stack.Navigator>
    );
}
