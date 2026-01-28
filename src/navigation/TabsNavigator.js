import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PatientsScreen from '../screens/PatientsScreen';
import NewTurnScreen from '../screens/NewTurnScreen';
import AgendaScreen from '../screens/AgendaScreen';
import LocationScreen from '../screens/LocationScreen';
import PrivadoScreen from '../screens/PrivadoScreen';
import HospitalScreen from '../screens/HospitalScreen';
const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pacientes" component={PatientsScreen} />
      <Tab.Screen name="Nuevo Turno" component={NewTurnScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
     <Tab.Screen name="Privado" component={PrivadoScreen} />
      <Tab.Screen name="Hospital" component={HospitalScreen} />
      <Tab.Screen name="Ubicación" component={LocationScreen} />

    </Tab.Navigator>
  );
}
