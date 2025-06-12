import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import InicioStacks from "./stacks/InicioStacks";
import PerfilStacks from "./stacks/PerfilStacks";
import ConficStacks from "./stacks/ConficStacks";
import CitasStack from "./stacks/CitasStacks";
import ConsultoriosStack from "./stacks/ConsultorioStacks";
import EspecialidadesStack from "./stacks/EspecialidadesStacks";
import HorarioMedicoStack from "./stacks/HorarioMedicoStacks";
import MedicoStack from "./stacks/MedicosStacks";
import PagosStack from "./stacks/PagosStacks";
import PasientesStack from "./stacks/PasientesStacks";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function NavegacionNav() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#DDA0DD", 
                tabBarInactiveTintColor: "#757575",
                tabBarStyle: { backgroundColor: "#fff" },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={InicioStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Configuración"
                component={ConficStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function NavegacionPrincipal() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="NavegacionNav" component={NavegacionNav} />
            <Stack.Screen name="CitasStack" component={CitasStack} />
            <Stack.Screen name="ConsultoriosStack" component={ConsultoriosStack} />
            <Stack.Screen name="EspecialidadesStack" component={EspecialidadesStack} />
            <Stack.Screen name="HorarioMedicoStack" component={HorarioMedicoStack} />
            <Stack.Screen name="MedicoStack" component={MedicoStack} />
            <Stack.Screen name="PagosStack" component={PagosStack} />
            <Stack.Screen name="PasientesStack" component={PasientesStack} />
        </Stack.Navigator>
    );
}
