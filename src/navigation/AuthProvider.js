import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {addUserSignUp} from '../services/UserServices';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, errorCallback) => {
          try {
            const userDetails = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            console.log(userDetails);
          } catch (e) {
            console.log(e);
            errorCallback(e.code);
          }
        },
        register: async (email, password, errorCallback, userName, photo) => {
          try {
            const userDetails = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            console.log(userDetails);
            addUserSignUp(email, userName, photo, userDetails.user.uid);
          } catch (e) {
            console.log(e);
            errorCallback(e.code);
          }
        },
        logout: async errorCallback => {
          try {
            const userDetails = await auth().signOut();
            console.log(userDetails);
          } catch (e) {
            console.log(e);
            errorCallback(e.code);
          }
        },
        googleLogin: async errorCallback => {
          try {
            // Check if your device supports Google Play
            const userDetails = await GoogleSignin.signIn();
            console.log(userDetails);

            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.log(e);
            errorCallback(e.code);
          }
        },
        forgotPassword: async (email, errorCallback) => {
          try {
            await auth().sendPasswordResetEmail(email);
          } catch (e) {
            console.log(e);
          }
        },
        resetPassword: async (code, newPassword, errorCallback) => {
          try {
            await auth().confirmPasswordReset(code, newPassword);
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
