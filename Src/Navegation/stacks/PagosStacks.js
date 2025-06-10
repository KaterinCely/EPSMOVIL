import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarPagos from '../../../Screen/Pagos/ListarPagos';
import DetallePagos from '../../../Screen/Pagos/DetallesPagos';
import EditarPagos from '../../../Screen/Pagos/EditarPagos';

const Stack = createStackNavigator();

export default function PagosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ListarPagos' 
                component={ListarPagos} 
                options={{ title: "Pagos" }} 
            />
            <Stack.Screen 
                name='EditarPagos' 
                component={EditarPagos} 
                options={{ title: "Nuevo/Editar Pagos" }} 
            />
            <Stack.Screen 
                name='DetallePagos'  
                component={DetallePagos} 
                options={{ title: "Detalles Pagos" }} 
            />
        </Stack.Navigator>
    );
}
