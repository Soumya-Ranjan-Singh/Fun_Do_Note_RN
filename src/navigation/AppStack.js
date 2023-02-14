import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import SearchNote from '../screens/SearchNote';
import CreateNote from '../screens/CreateNote';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchNote} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
    </Stack.Navigator>
  );
};

export default AppStack;
