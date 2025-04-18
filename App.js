import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CompanySelectionScreen from './screens/CompanySelectionScreen';
import ClientSelectionScreen from './screens/ClientSelectionScreen';
import ActionSelectionScreen from './screens/ActionSelectionScreen';
import TaskListScreen from './screens/TaskListScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import WorkLogScreen from './screens/WorkLogScreen';
import EditWorkLogScreen from './screens/EditWorkLogScreen';
import WorkLogListScreen from './screens/WorkLogListScreen';
import TicketListScreen from './screens/TicketListScreen'; // ✅ Lista tiketa
import TicketDetailsScreen from './screens/TicketDetailsScreen'; // ✅ Detalji tiketa
import AddTicketScreen from './screens/AddTicketScreen'; // ✅ Dodavanje tiketa
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import WorkSelectionScreen from './screens/WorkSelectionScreen';
import EditResolutionScreen from './screens/EditResolutionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="CompanySelection" component={CompanySelectionScreen} />
        <Stack.Screen name="WorkSelection" component={WorkSelectionScreen} />
        <Stack.Screen name="ClientSelection" component={ClientSelectionScreen} />
        <Stack.Screen name="ActionSelection" component={ActionSelectionScreen} />
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="WorkLog" component={WorkLogScreen} />
        <Stack.Screen name="EditWorkLog" component={EditWorkLogScreen} />
        <Stack.Screen name="WorkLogList" component={WorkLogListScreen} />


        <Stack.Screen name="TicketList" component={TicketListScreen} />
        <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
        <Stack.Screen name="AddTicket" component={AddTicketScreen} />
        <Stack.Screen name="EditResolution" component={EditResolutionScreen} />


        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
