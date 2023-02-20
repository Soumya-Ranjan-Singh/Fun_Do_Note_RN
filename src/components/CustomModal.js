/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Size, Color} from '../utility/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../navigation/AuthProvider';

const CustomModal = props => {
  const {user} = useContext(AuthContext);
  const isGoogleSignin = props.isGoogleSignin;
  const photoDetails = user.photoURL;
  const name = user.displayName;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
        hardwareAccelerated>
        <TouchableOpacity
          style={{
            flex: 1,
            marginTop: 80,
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={() => props.hideModal()}>
          <View style={styles.modal_container}>
            <View style={styles.modal_dataContainer}>
              {isGoogleSignin ? (
                <>
                  <Avatar rounded source={{uri: photoDetails}} size={50} />
                  <Text style={styles.text}>{name}</Text>
                </>
              ) : (
                <>
                  <Avatar rounded source={props.source} size={50} />
                  <Text style={styles.text}>{props.userName}</Text>
                </>
              )}
            </View>
            {isGoogleSignin ? null : (
              <View>
                <TouchableOpacity
                  onPress={props.onPressChangeProfilePic}
                  style={styles.modal_dataContainer}>
                  <Text style={styles.text}>Change Profile Picture</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={props.onPressNavigateProfile}>
              <View style={styles.profile}>
                <AntDesign
                  name="setting"
                  size={Size.ICON_MEDIUM}
                  color={Color.HEADING}
                />
                <Text style={styles.profile_text}>Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onPressLogout}
              style={styles.logout}>
              <Text style={styles.logout_text}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal_container: {
    width: 350,
    height: 230,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 20,
  },
  modal_dataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: Color.HEADING,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
    flexDirection: 'row',
  },
  profile_text: {
    fontSize: 15,
    margin: 15,
  },
  logout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout_text: {
    fontSize: 15,
    margin: 10,
  },
});
