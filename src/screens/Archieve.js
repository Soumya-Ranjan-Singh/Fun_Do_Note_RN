/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import pageStyles from '../utility/global.style';
import {View, Text} from 'react-native';
//It should be on class component
const Archieve = () => {
  return (
    <View style={pageStyles.container}>
      <Text style={{color: 'white', fontSize: 30}}>Archieve</Text>
    </View>
  );
};

export default Archieve;
