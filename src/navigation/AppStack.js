import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchNote from '../screens/SearchNote';
import CreateNote from '../screens/CreateNote';
import  AppDrawer  from './AppDrawer';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Drawer"
        component={AppDrawer}
      />
      <Stack.Screen name="Search" component={SearchNote} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
    </Stack.Navigator>
  );
};

export default AppStack;
