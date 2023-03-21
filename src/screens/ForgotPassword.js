import React, {useState, useContext} from 'react';
import pageStyles from '../utility/global.style';
import {FormButton, FormTextButton} from '../components/FormButton';
import FormHeader from '../components/FormHeader';
import {
  FormUserInput,
  FormPasswordInput,
  FormOTPInput,
} from '../components/FormInput';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Alert} from 'react-native/Libraries/Alert/Alert';
import {Color, Font, Margin} from '../utility/Theme';
import {AuthContext} from '../navigation/AuthProvider';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';

const ForgotPasswordScreen = () => {
  const {forgotPassword, resetPassword} = useContext(AuthContext);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [validateDisabled, setValidateDisabled] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmTextEntry, setConfirmTextEntry] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowPass, setShouldShowPass] = useState(false);
  const changeLang = useSelector(state => state.toggle);
  console.log(errors);

  const validateEmail = () => {
    let emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let valid = true;
    const temp = {};
    if (!emailRegex.test(email)) {
      valid = false;
      temp.mail = 'Please enter valid email';
    }
    if (email === '') {
      valid = false;
      temp.mail = "Email field shouldn't be empty";
    }
    setErrors(temp);
    return valid;
  };

  const ValidatePassword = () => {
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let valid = true;
    const temp = {};
    if (!passwordRegex.test(password)) {
      valid = false;
      temp.pass = 'Please enter valid password';
    }
    if (password === '') {
      valid = false;
      temp.pass = "Password field shouldn't be empty";
    }
    if (confirmPassword !== password) {
      valid = false;
      temp.confirm = 'Password not matching';
    }
    if (confirmPassword === password) {
      valid = false;
      temp.confirm = "Confirm field shouldn't be empty";
    }
    setErrors(temp);
    return valid;
  };

  const ValidateOTP = () => {
    let valid = true;
    const temp = {};
    if (otp === '') {
      valid = false;
      temp.otp = 'Please enter valid OTP';
    }
    setErrors(temp);
    return valid;
  };

  const onSubmit = () => {
    if (validateEmail()) {
      forgotPassword(email);
      setShouldShow(!shouldShow);
      setDisabled(!disabled);
    }
  };

  const onSubmitOTP = () => {
    if (ValidateOTP()) {
      setShouldShowPass(!shouldShowPass);
      setValidateDisabled(!validateDisabled);
    }
  };

  const onSubmitPassword = () => {
    if (ValidatePassword()) {
      resetPassword(otp, password);
      //navigation.navigate('SignIn');
    }
  };

  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const updateConfirmTextEntry = () => {
    setConfirmTextEntry(!confirmTextEntry);
  };

  return (
    <ScrollView style={pageStyles.container}>
      <FormHeader />
      <View style={pageStyles.body}>
        <FormUserInput
          placeholder={
            changeLang === 'English'
              ? stringsOfLanguages._props.en.email
              : stringsOfLanguages._props.hn.email
          }
          autoComplete={'email'}
          onChangeText={text => setEmail(text)}
          value={email}
          iconName={'mail'}
          errorText={errors.mail}
        />
        <View style={pageStyles.body_btn}>
          <FormButton
            name={
              changeLang === 'English'
                ? stringsOfLanguages._props.en.sendotp
                : stringsOfLanguages._props.hn.sendotp
            }
            onSubmit={onSubmit}
            disabled={disabled ? true : false}
          />
        </View>
        {shouldShow ? (
          <>
            <FormOTPInput
              placeholder={
                changeLang === 'English'
                  ? stringsOfLanguages._props.en.otp
                  : stringsOfLanguages._props.hn.otp
              }
              onChangeText={text => setOtp(text)}
              value={otp}
              errorText={errors.otp}
            />
            <View style={pageStyles.body_btn}>
              <FormButton
                name={
                  changeLang === 'English'
                    ? stringsOfLanguages._props.en.validate
                    : stringsOfLanguages._props.hn.validate
                }
                onSubmit={onSubmitOTP}
                disabled={validateDisabled ? true : false}
              />
            </View>
            <View style={pageStyles.body_btn}>
              <Text style={styles.text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.otpfailing
                  : stringsOfLanguages._props.hn.otpfailing}
              </Text>
              <FormTextButton
                textName={
                  changeLang === 'English'
                    ? stringsOfLanguages._props.en.resend
                    : stringsOfLanguages._props.hn.resend
                }
                onSubmit={Alert}
              />
            </View>
          </>
        ) : null}
        {shouldShowPass ? (
          <>
            <FormPasswordInput
              placeholder={
                changeLang === 'English'
                  ? stringsOfLanguages._props.en.password
                  : stringsOfLanguages._props.hn.password
              }
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={secureTextEntry}
              onPress={updateSecureTextEntry}
              errorText={errors.pass}
            />
            <FormPasswordInput
              placeholder={
                changeLang === 'English'
                  ? stringsOfLanguages._props.en.confirmpass
                  : stringsOfLanguages._props.hn.confirmpass
              }
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry={confirmTextEntry}
              onPress={updateConfirmTextEntry}
              errorText={errors.confirm}
            />
            <View style={pageStyles.body_btn}>
              <FormButton
                name={
                  changeLang === 'English'
                    ? stringsOfLanguages._props.en.validate
                    : stringsOfLanguages._props.hn.validate
                }
                onSubmit={onSubmitPassword}
              />
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  text: {
    color: Color.TEXT_COLOR,
    fontSize: Font.LARGE,
    marginLeft: Margin.BODY_TEXT_LEFT,
  },
});
