import React, {useState, useContext} from 'react';
import pageStyles from '../utility/global.style';
import {FormButton} from '../components/FormButton';
import FormHeader from '../components/FormHeader';
import {FormUserInput, FormPasswordInput} from '../components/FormInput';
import {ScrollView, View} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';

const RegistrationScreen = ({navigation}) => {
  const {register} = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmTextEntry, setConfirmTextEntry] = useState(true);
  const changeLang = useSelector(state => state.toggle);
  const photo = null;
  console.log(errors);

  const validate = () => {
    let userRegex = /^[A-Za-z][A-Za-z0-9_]{4,9}$/;
    let emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let valid = true;
    const temp = {};
    if (!userRegex.test(userName)) {
      valid = false;
      temp.user = 'Please enter valid user name';
    }
    if (userName === '') {
      valid = false;
      temp.user = "Username field shouldn't be empty";
    }
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
    if (confirmPassword !== password) {
      valid = false;
      temp.confirm = 'Password not matching';
    }
    if (confirmPassword === '') {
      valid = false;
      temp.confirm = "Confirm field shouldn't be empty";
    }
    setErrors(temp);
    return valid;
  };

  const setCatchError = code => {
    const temp = {};
    if (code === 'auth/email-already-in-use') {
      temp.mail = 'The email address is already in use';
    }
    setErrors(temp);
  };

  const onSubmit = () => {
    if (validate()) {
      register(email, password, setCatchError, userName, photo);
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
              ? stringsOfLanguages._props.en.username
              : stringsOfLanguages._props.hn.username
          }
          autoComplete={'username'}
          onChangeText={text => setUserName(text)}
          value={userName}
          iconName={'user'}
          errorText={errors.user}
        />
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
                ? stringsOfLanguages._props.en.signin
                : stringsOfLanguages._props.hn.signin
            }
            onSubmit={() => {
              navigation.goBack();
            }}
          />
          <FormButton
            name={
              changeLang === 'English'
                ? stringsOfLanguages._props.en.register
                : stringsOfLanguages._props.hn.register
            }
            onSubmit={onSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistrationScreen;
