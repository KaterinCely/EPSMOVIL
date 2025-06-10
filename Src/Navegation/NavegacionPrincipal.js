import CitasStacks from './stacks/CitasStacks';
import ConsultoriosStacks from './stacks/ConsultorioStacks';
import PacientesStacks from './stacks/PasientesStacks';
import MedicosStacks from './stacks/MedicosStacks';
import HorarioMedicoStacks from './stacks/HorarioMedicoStacks';
import PagosStacks from './stacks/PagosStacks';
import EspecialidadesStacks from './stacks/EspecialidadesStacks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export default function NavegacionPrincipal() {
    return(
        <Tab.Navigator>
            <Tab.Screen name='Citas' component={CitasStacks}></Tab.Screen>
            <Tab.Screen name='Consultorios' component={ConsultoriosStacks}></Tab.Screen>
            <Tab.Screen name='Pasientes' component={PacientesStacks}></Tab.Screen>
            <Tab.Screen name='Medicos' component={MedicosStacks}></Tab.Screen>
            <Tab.Screen name='Horarios Medicos' component={HorarioMedicoStacks}></Tab.Screen>
            <Tab.Screen name='Pagos' component={PagosStacks}></Tab.Screen>
            <Tab.Screen name='Especialidades' component={EspecialidadesStacks}></Tab.Screen>
        </Tab.Navigator>
    );
}

