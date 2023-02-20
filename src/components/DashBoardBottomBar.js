/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';


const DashBoardBottomBar = props => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}>
      <View
        style={{
          width: 100,
        }}>
        <View style={{flexDirection: 'row', padding: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
            onPress={props.onPressCheckbox}>
              <Ionicons
                name="checkbox-outline"
                style={{color: 'white', padding: 15}}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={props.onPressBrush}>
              <MaterialIcon
                name="brush"
                style={{color: 'white', padding: 15}}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={props.onPressMic}>
              <MaterialIcon
                name="mic-none"
                style={{color: 'white', padding: 15}}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onPressImage}>
              <MaterialIcon
                name="crop-original"
                style={{color: 'white', padding: 15}}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 10,
              position: 'absolute',
              width: 70,
              height: 70,
              bottom: '80%',
              left: '320%',
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                borderRadius: 20,
                height: 70,
                width: 70,
                borderColor: '#555',
                borderWidth: 5,
                alignSelf: 'center',
                elevation: 8,
                backgroundColor: 'rgba(0,0,0,0.8)',
              }}
              onPress={props.onPressOpenNoteCreator}>
              <Feather name="plus-square" style={{padding: 10}} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashBoardBottomBar;
