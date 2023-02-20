/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Reminder from '../screens/Reminder';
import Archieve from '../screens/Archieve';
import Trash from '../screens/Trash';
import Settings from '../screens/Settings';
import Home from '../screens/Home';
import CreateNewLable from '../screens/CreateNewLable';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#fff',
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
      initialRouteName="Note">
      <Drawer.Screen name="Note" component={Home} />
      <Drawer.Screen name="Create new lable" component={CreateNewLable} />
      <Drawer.Screen name="Reminder" component={Reminder} />
      <Drawer.Screen name="Archive" component={Archieve} />
      <Drawer.Screen name="Trash" component={Trash} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
