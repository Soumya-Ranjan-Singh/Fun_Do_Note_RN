/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawer = ({props, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
        <View
          style={{alignItems: 'center', justifyContent: 'center', margin: 25}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto-Medium',
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            FunDo Note
          </Text>
        </View>
        <View style={{alignItems: 'flex-start', marginLeft: 20}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('Note')}>
            <Icon
              name="bulb-outline"
              size={25}
              color={'white'}
              style={{marginTop: 10, margin: 10}}
            />
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                margin: 10,
                color: 'white',
              }}>
              Note
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('Create new lable')}>
            <Icon
              name="add-outline"
              size={25}
              color={'white'}
              style={{marginTop: 10, margin: 10}}
            />
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                margin: 10,
                color: 'white',
              }}>
              Create new lable
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('Reminder')}>
            <Icon
              name="notifications-outline"
              size={25}
              color={'white'}
              style={{marginTop: 10, margin: 10}}
            />
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                margin: 10,
                color: 'white',
              }}>
              Reminder
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('Archive')}>
            <Icon
              name="archive-outline"
              size={25}
              color={'white'}
              style={{marginTop: 10, margin: 10}}
            />
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                margin: 10,
                color: 'white',
              }}>
              Archive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('Trash')}>
            <Icon
              name="trash-outline"
              size={25}
              color={'white'}
              style={{marginTop: 10, margin: 10}}
            />
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                margin: 10,
                color: 'white',
              }}>
              Trash
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('Settings')}>
            <Icon
              name="settings-outline"
              size={25}
              color={'white'}
              style={{marginTop: 10, margin: 10}}
            />
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                margin: 10,
                color: 'white',
              }}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
