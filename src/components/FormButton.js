import React from 'react';
import {Pressable, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Padding,
  Color,
  Border,
  Width,
  Height,
  Font,
  Margin,
} from '../utility/Theme';

export const FormButton = props => {
  return (
    <Pressable
      style={[
        styles.btn,
        {
          backgroundColor: props.disabled
            ? Color.DISABLED_BUTTON
            : Color.BUTTON_BACKGROUND,
        },
      ]}
      onPress={props.onSubmit}
      disabled={props.disabled}>
      <Text style={styles.btn_text}>{props.name}</Text>
    </Pressable>
  );
};

export const FormTextButton = props => {
  return (
    <TouchableOpacity style={styles.forget_text_btn} onPress={props.onPress}>
      <Text style={styles.forget_text}>{props.textName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: Padding.BUTTON_PADDING,
    margin: Margin.BTN,
    borderRadius: Border.BORDER_RADIUS,
    width: Width.BTN_WIDTH,
    height: Height.BTN_HEIGHT,
  },
  btn_text: {
    color: Color.TEXT_COLOR,
    fontSize: Font.PRIMARY,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forget_text_btn: {
    margin: Margin.BTN,
  },
  forget_text: {
    color: Color.LINK_TEXT,
    fontSize: Font.PRIMARY,
    textDecorationLine: 'underline',
  },
});
