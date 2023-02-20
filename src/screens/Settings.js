/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import pageStyles from '../utility/global.style';
import {View, Text} from 'react-native';

const Settings = () => {
  return (
    <View style={pageStyles.container}>
      <Text style={{color: 'white', fontSize: 30}}>Settings</Text>
    </View>
  );
};

export default Settings;
