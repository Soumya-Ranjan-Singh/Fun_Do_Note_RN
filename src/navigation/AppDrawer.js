/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Reminder from '../screens/Reminder';
import Archive from '../screens/Archive';
import Trash from '../screens/Trash';
import Settings from '../screens/Settings';
import Home from '../screens/Home';
import CreateNewLable from '../screens/CreateNewLable';
import Help from '../screens/Help';
import CustomDrawer from '../components/CustomDrawer';
import Labels from '../screens/Labels';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'white',
        drawerInactiveBackgroundColor: 'black',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          marginLeft: -15,
        },
      }}
      initialRouteName="Note">
      <Drawer.Screen name="Note" component={Home} />
      <Drawer.Screen name="Create new lable" component={CreateNewLable} />
      <Drawer.Screen name="Reminder" component={Reminder} />
      <Drawer.Screen name="Archive" component={Archive} />
      <Drawer.Screen name="Trash" component={Trash} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="Labels" component={Labels} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
