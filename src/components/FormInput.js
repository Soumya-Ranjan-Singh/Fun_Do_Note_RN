import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Width,
  Font,
  Color,
  Size,
  Border,
  Padding,
  Margin,
} from '../utility/Theme';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ErrorText = errorProps => {
  return (
    <View>
      <Text style={styles.error_text}>{errorProps.errorText}</Text>
    </View>
  );
};

export const FormUserInput = props => {
  return (
    <View>
      <View style={styles.body_input_email}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          importantForAutofill="auto"
          placeholderTextColor={Color.TEXT_COLOR}
          onChangeText={props.onChangeText}
          value={props.value}
        />
        <Feather
          name={props.iconName}
          color={Color.TEXT_COLOR}
          size={Size.ICON_MEDIUM}
          style={styles.input_icons}
        />
      </View>
      <ErrorText errorText={props.errorText} />
    </View>
  );
};

export const FormOTPInput = props => {
  return (
    <View>
      <View style={styles.body_input_email}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          importantForAutofill="auto"
          placeholderTextColor={Color.TEXT_COLOR}
          onChangeText={props.onChangeText}
          value={props.value}
        />
        <SimpleLineIcons
          name="pencil"
          color={Color.TEXT_COLOR}
          size={Size.ICON_MEDIUM}
          style={styles.input_icons}
        />
      </View>
      <ErrorText errorText={props.errorText} />
    </View>
  );
};

export const FormPasswordInput = _props => {
  return (
    <View>
      <View style={styles.body_input_pass}>
        <TextInput
          style={styles.input}
          placeholder={_props.placeholder}
          autoComplete={_props.autoComplete}
          importantForAutofill="auto"
          placeholderTextColor={Color.TEXT_COLOR}
          onChangeText={_props.onChangeText}
          value={_props.value}
          secureTextEntry={_props.secureTextEntry ? true : false}
        />
        <TouchableOpacity onPress={_props.onPress}>
          {_props.secureTextEntry ? (
            <Feather
              name="eye-off"
              color={Color.TEXT_COLOR}
              size={Size.ICON_MEDIUM}
              style={styles.input_icons}
            />
          ) : (
            <Feather
              name="eye"
              color={Color.TEXT_COLOR}
              size={Size.ICON_MEDIUM}
              style={styles.input_icons}
            />
          )}
        </TouchableOpacity>
      </View>
      <ErrorText errorText={_props.errorText} />
    </View>
  );
};

const styles = StyleSheet.create({
  body_input_email: {
    flexDirection: 'row',
    marginRight: Margin.INPUT_EMAIL_RIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body_input_pass: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: Width.INPUT_WIDTH,
    borderWidth: Border.MEDIUM_BORDER,
    borderColor: Color.BORDER_COLOR,
    borderRadius: Border.BORDER_RADIUS,
    textAlign: 'left',
    fontSize: Font.LARGE,
    marginTop: Margin.INPUT_TOP,
    marginBottom: Margin.INPUT_BOTTOM,
    backgroundColor: Color.INPUT_BACKGROUND,
    color: Color.TEXT_COLOR,
    paddingLeft: Padding.INPUT_LEFT_PADDING,
    paddingRight: Padding.INPUT_RIGHT_PADDING,
  },
  input_icons: {
    marginLeft: Margin.INPUT_ICONS,
  },
  error_text: {
    color: Color.ERROR_TEXT,
    fontSize: Font.SECONDARY,
    textAlign: 'center',
    margin: Margin.ERROR_TEXT,
  },
});
