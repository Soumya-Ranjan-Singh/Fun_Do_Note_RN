import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { Color, Font } from '../utility/Theme';

const Chip = ({children}) => {
  return <Text style={styles.chip_txt}>{children}</Text>;
};

export default Chip;

const styles = StyleSheet.create({
  chip_txt: {
    fontSize: Font.SECONDARY,
    color: Color.TEXT_COLOR,
    borderRadius: 15,
    backgroundColor: 'grey',
    padding: 5,
    margin: 10,
  },
});
