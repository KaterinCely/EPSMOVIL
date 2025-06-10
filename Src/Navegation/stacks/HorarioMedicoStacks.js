import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarHorarioMedico from '../../../Screen/HorarioMedico/ListarHorarioMedico';
import DetalleHorarioMedico from '../../../Screen/HorarioMedico/DetallesHorarioMedico';
import EditarHorarioMedico from '../../../Screen/HorarioMedico/EditarHorarioMedico';

const Stack = createStackNavigator();

export default function HorarioMedicoStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ListarHorarioMedico' 
                component={ListarHorarioMedico} 
                options={{ title: "Horario de los Médicos" }} 
            />
            <Stack.Screen 
                name='EditarHorarioMedico' 
                component={EditarHorarioMedico} 
                options={{ title: "Nuevo/Editar Horario de los Médicos" }} 
            />
            <Stack.Screen 
                name='DetalleHorarioMedico'  
                component={DetalleHorarioMedico} 
                options={{ title: "Detalles Horario de los Médicos" }} 
            />
        </Stack.Navigator>
    );
}
