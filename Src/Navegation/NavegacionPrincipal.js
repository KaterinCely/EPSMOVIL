import CitasStacks from './stacks/CitasStacks';
import ConsultoriosStacks from './stacks/ConsultorioStacks';
import PacientesStacks from './stacks/PasientesStacks';
import MedicosStacks from './stacks/MedicosStacks';
import HorarioMedicoStacks from './stacks/HorarioMedicoStacks';
import PagosStacks from './stacks/PagosStacks';
import EspecialidadesStacks from './stacks/EspecialidadesStacks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#1976D2",
                tabBarInactiveTintColor: "#757575",
                tabBarStyle: { backgroundColor: "#fff" }
            }}>


            <Tab.Screen name='Citas' component={CitasStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="hospital-user" size={24} color="black" />
                    ),
                }}></Tab.Screen>
            <Tab.Screen name='Consultorios' component={ConsultoriosStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="hospital-alt" size={24} color="black" />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen name='Pasientes' component={PacientesStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="person" size={24} color="black" />
                    ),
                }}></Tab.Screen>
            <Tab.Screen name='Medicos' component={MedicosStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="doctor" size={24} color="black" />
                    ),
                }}></Tab.Screen>
            <Tab.Screen name='Horarios Medicos' component={HorarioMedicoStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="clockcircle" size={24} color="black" />
                    ),
                }}></Tab.Screen>
            <Tab.Screen name='Pagos' component={PagosStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cash-outline" size={24} color="black" />
                    ),
                }}></Tab.Screen>
            <Tab.Screen name='Especialidades' component={EspecialidadesStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="medication" size={24} color="black" />
                    ),
                }}></Tab.Screen>
        </Tab.Navigator>
    );
}

