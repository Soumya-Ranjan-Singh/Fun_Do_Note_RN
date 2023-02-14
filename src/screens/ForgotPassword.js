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

const ForgotPasswordScreen = ({navigation}) => {
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
          placeholder={'Email'}
          autoComplete={'email'}
          onChangeText={text => setEmail(text)}
          value={email}
          iconName={'mail'}
          errorText={errors.mail}
        />
        <View style={pageStyles.body_btn}>
          <FormButton
            name={'Send OTP'}
            onSubmit={onSubmit}
            disabled={disabled ? true : false}
          />
        </View>
        {shouldShow ? (
          <>
            <FormOTPInput
              placeholder={'OTP'}
              onChangeText={text => setOtp(text)}
              value={otp}
              errorText={errors.otp}
            />
            <View style={pageStyles.body_btn}>
              <FormButton
                name={'Validate'}
                onSubmit={onSubmitOTP}
                disabled={validateDisabled ? true : false}
              />
            </View>
            <View style={pageStyles.body_btn}>
              <Text style={styles.text}>Don't have the OTP?</Text>
              <FormTextButton textName={'Resend!!'} onSubmit={Alert} />
            </View>
          </>
        ) : null}
        {shouldShowPass ? (
          <>
            <FormPasswordInput
              placeholder={'Password'}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={secureTextEntry}
              onPress={updateSecureTextEntry}
              errorText={errors.pass}
            />
            <FormPasswordInput
              placeholder={'Confirm'}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry={confirmTextEntry}
              onPress={updateConfirmTextEntry}
              errorText={errors.confirm}
            />
            <View style={pageStyles.body_btn}>
              <FormButton name={'Validate'} onSubmit={onSubmitPassword} />
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
