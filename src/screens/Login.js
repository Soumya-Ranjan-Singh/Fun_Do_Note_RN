import React, {useState, useContext} from 'react';
import pageStyles from '../utility/global.style';
import {FormButton, FormTextButton} from '../components/FormButton';
import FormHeader from '../components/FormHeader';
import {FormUserInput, FormPasswordInput} from '../components/FormInput';
import {ScrollView, View} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';
import {SocialIcon} from 'react-native-elements';

const LogInScreen = ({navigation}) => {
  const {login, googleLogin, fbLogin} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const changeLang = useSelector(state => state.toggle);

  console.log(errors);

  const validate = () => {
    let emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
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
    if (!passwordRegex.test(password)) {
      valid = false;
      temp.pass =
        'Must a password have a minimum of 8 characters and contain at least one upper case letter, one lower case letter, one number, and one special character';
    }
    if (password === '') {
      valid = false;
      temp.pass = "Password field shouldn't be empty";
    }
    setErrors(temp);
    return valid;
  };

  const onSubmit = () => {
    if (validate()) {
      login(email, password, setCatchError);
    }
  };

  const onGoogleBtnSubmit = () => {
    googleLogin(setSocialCatchError);
  };

  const onFBBtnSubmit = () => {
    fbLogin(setSocialCatchError);
  };

  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const setCatchError = code => {
    const temp = {};
    if (code === 'auth/user-not-found') {
      temp.mail = 'User not found';
    }
    if (code === 'auth/wrong-password') {
      temp.pass = 'Invalid password';
    }
    setErrors(temp);
  };

  const setSocialCatchError = code => {
    const temp = {};
    if (code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      temp.alert = 'User cancelled the login flow';
    } else if (code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      temp.alert = 'Sign in is in progress already';
    } else if (code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      temp.alert = 'Play services not available or outdated';
    } else {
      // some other error happened
      temp.alert = 'Annonymous error';
    }
    setErrors(temp);
  };

  return (
    <ScrollView style={pageStyles.container} endFillColor>
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
        <FormPasswordInput
          placeholder={
            changeLang === 'English'
              ? stringsOfLanguages._props.en.password
              : stringsOfLanguages._props.hn.password
          }
          autoComplete={'current-password'}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={secureTextEntry}
          onPress={updateSecureTextEntry}
          errorText={errors.pass}
        />
        <FormTextButton
          onPress={() => {
            navigation.navigate('Forgot Password ?');
          }}
          textName={
            changeLang === 'English'
              ? stringsOfLanguages._props.en.forgotpassword
              : stringsOfLanguages._props.hn.forgotpassword
          }
        />
        <View style={pageStyles.body_btn}>
          <FormButton
            name={
              changeLang === 'English'
                ? stringsOfLanguages._props.en.signup
                : stringsOfLanguages._props.hn.signup
            }
            onSubmit={() => {
              navigation.navigate('SignUp');
            }}
          />
          <FormButton
            name={
              changeLang === 'English'
                ? stringsOfLanguages._props.en.signin
                : stringsOfLanguages._props.hn.signin
            }
            onSubmit={onSubmit}
          />
        </View>
        <View style={pageStyles.social_btn_view}>
          <GoogleSigninButton
            style={pageStyles.social_btn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onGoogleBtnSubmit}
          />
          <SocialIcon
            title="Sign In With Facebook"
            button
            type="facebook"
            onPress={onFBBtnSubmit}
            style={pageStyles.fb_btn}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LogInScreen;
