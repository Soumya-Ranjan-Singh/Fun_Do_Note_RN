import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Height, Width, Font, Color, Margin} from '../utility/Theme';

const FormHeader = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.img} source={require('../assets/logo/Logo5.png')} />
      <Text style={styles.header_text}>Fun-Do-Notes</Text>
    </View>
  );
};

export default FormHeader;
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  img: {
    height: Height.IMG_HEIGHT,
    width: Width.IMG_WIDTH,
    marginTop: Margin.IMG_TOP_MARGIN,
  },
  header_text: {
    fontFamily: 'sans-serif',
    fontSize: Font.PRIMARY,
    color: Color.HEADING_TEXT,
    fontWeight: 'bold',
    marginBottom: Margin.HEADER_TEXT_BOTTOM,
    marginTop: Margin.HEADER_TEXT_TOP,
  },
});
