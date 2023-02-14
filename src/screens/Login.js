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
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
//   listenOrientationChange as lor,
//   removeOrientationListener as rol,
// } from 'react-native-responsive-screen';

const LogInScreen = ({navigation}) => {
  const {login, googleLogin} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  // const [customAlert, setCustomAlert] = useState(false);
  // const [state, setState] = useState(null);
  console.log(errors);

  // if (setState == null) {
  //   setState(wp < hp ? 'portrait' : 'landscape');
  // } else {
  //   setState({
  //     orientation: wp < hp ? 'portrait' : 'landscape',
  //   });
  // }

  // useEffect(() => {
  //   lor(setState);
  //   return () => {
  //     rol();
  //   };
  // }, []);

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

  // const CustomAlert = () => {
  //   customAlert
  //     ? errors.alert
  //       ? Alert.alert('Social Sign In Error', `${errors.alert}`, [
  //           {
  //             text: 'OK',
  //             onPress: () => {
  //               console.log('OK Pressed');
  //             },
  //           },
  //         ])
  //       : null
  //     : null;
  // };

  const onSocialBtnSubmit = () => {
    googleLogin(setSocialCatchError);
    // setCustomAlert(!customAlert);
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
          placeholder={'Email'}
          autoComplete={'email'}
          onChangeText={text => setEmail(text)}
          value={email}
          iconName={'mail'}
          errorText={errors.mail}
        />
        <FormPasswordInput
          placeholder={'Password'}
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
          textName={'Forgot Password?'}
        />
        <View style={pageStyles.body_btn}>
          <FormButton
            name={'Sign Up'}
            onSubmit={() => {
              navigation.navigate('SignUp');
            }}
          />
          <FormButton name={'Sign In'} onSubmit={onSubmit} />
        </View>
        <View style={pageStyles.social_btn_view}>
          <GoogleSigninButton
            style={pageStyles.social_btn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onSocialBtnSubmit}
          />
        </View>
        {/* <CustomAlert /> */}
      </View>
    </ScrollView>
  );
};

export default LogInScreen;
