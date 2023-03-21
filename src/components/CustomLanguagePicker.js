import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export const LanguagePicker = props => {
  return (
    <View>
      <Picker
        style={styles.picker}
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}>
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Hindi" value="Hindi" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  body_picker_text: {
    color: 'white',
    fontSize: 20,
    marginLeft: 40,
  },
  picker: {
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
