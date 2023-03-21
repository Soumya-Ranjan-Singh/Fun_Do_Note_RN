import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchNote from '../screens/SearchNote';
import CreateNote from '../screens/CreateNote';
import  AppDrawer  from './AppDrawer';
import AddLablestoNote from '../screens/AddLablestoNote';
import DataChart from '../screens/DataChart';
import MathEqn from '../screens/MathEqn';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Drawer"
        component={AppDrawer}
      />
      <Stack.Screen name="CreateNote" component={CreateNote} />
      <Stack.Screen name="Search" component={SearchNote} />
      <Stack.Screen name="AddLablestoNote" component={AddLablestoNote}/>
      <Stack.Screen name="Data Chart" component={DataChart} />
      <Stack.Screen name="Math Data" component={MathEqn} />
    </Stack.Navigator>
  );
};

export default AppStack;
