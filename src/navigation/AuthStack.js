import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from '../screens/Login';
import RegistrationScreen from '../screens/Registration';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    // initialize the Google SDK
    GoogleSignin.configure({
      webClientId:
        '983003214386-1ii06h44okk11t1bnfuj6e8r987rabku.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={LogInScreen} />
      <Stack.Screen name="SignUp" component={RegistrationScreen} />
      <Stack.Screen name="Forgot Password ?" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
