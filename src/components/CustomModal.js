import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Size, Color} from '../utility/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';

export const ProfileModal = props => {
  const changeLang = useSelector(state => state.toggle);
  const isGoogleSignin = props.isGoogleSignin;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
        hardwareAccelerated>
        <TouchableOpacity
          style={styles.top_profile_modal}
          activeOpacity={1}
          onPress={() => props.hideModal()}>
          <View style={styles.modal_container}>
            <View style={styles.modal_dataContainer}>
              <View style={styles.modal_img}>
                <Avatar rounded source={props.source} size={50} />
              </View>
              <View>
                <Text style={styles.profile_text}>{props.userName}</Text>
              </View>
            </View>
            {isGoogleSignin ? null : (
              <View>
                <TouchableOpacity
                  onPress={props.onPressChangeProfilePic}
                  style={styles.profile}>
                  <Text style={styles.profile_text}>
                    {changeLang === 'English'
                      ? stringsOfLanguages._props.en.changeprofilepic
                      : stringsOfLanguages._props.hn.changeprofilepic}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={props.onPressNavigateProfile}>
              <View style={styles.profile}>
                <AntDesign
                  name="setting"
                  size={Size.ICON_MEDIUM}
                  color={Color.HEADING}
                  style={styles.profile_icon}
                />
                <Text style={styles.profile_text}>
                  {changeLang === 'English'
                    ? stringsOfLanguages._props.en.profile
                    : stringsOfLanguages._props.hn.profile}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onPressLogout}
              style={styles.modal_dataContainer}>
              <Text style={styles.profile_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.logout
                  : stringsOfLanguages._props.hn.logout}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const ImageOpenerModal = props => {
  const changeLang = useSelector(state => state.toggle);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
        hardwareAccelerated>
        <TouchableOpacity
          style={styles.mid_img_modal}
          activeOpacity={1}
          onPress={() => props.hideModal()}>
          <View style={styles.img_modal_container}>
            <TouchableOpacity
              onPress={props.onPressOpenCamera}
              style={styles.modalBtn}>
              <Text style={styles.btn_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.opencamera
                  : stringsOfLanguages._props.hn.opencamera}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onPressOpenGallery}
              style={styles.modalBtn}>
              <Text style={styles.btn_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.opengallery
                  : stringsOfLanguages._props.hn.opengallery}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const NoteBottomModal = props => {
  const changeLang = useSelector(state => state.toggle);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      hardwareAccelerated>
      <TouchableOpacity
        style={styles.bottom_note_modal}
        activeOpacity={1}
        onPress={() => props.hideModal()}>
        <View style={styles.bottom_modal_container}>
          <TouchableOpacity onPress={props.onPressDeleteNote}>
            <View style={styles.buttons}>
              <AntDesign
                name="delete"
                size={Size.ICON_MEDIUM}
                color={Color.HEADING}
              />
              <Text style={styles.btn_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.delete
                  : stringsOfLanguages._props.hn.delete}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressCopyNote}>
            <View style={styles.buttons}>
              <AntDesign
                name="copy1"
                size={Size.ICON_MEDIUM}
                color={Color.HEADING}
              />
              <Text style={styles.btn_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.makeacopy
                  : stringsOfLanguages._props.hn.makeacopy}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressSendNote}>
            <View style={styles.buttons}>
              <Entypo
                name="share"
                size={Size.ICON_MEDIUM}
                color={Color.HEADING}
              />
              <Text style={styles.btn_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.send
                  : stringsOfLanguages._props.hn.send}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressCollaborateNote}>
            <View style={styles.buttons}>
              <SimpleLineIcons
                name="user-follow"
                size={Size.ICON_MEDIUM}
                color={Color.HEADING}
              />
              <Text style={styles.btn_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.collaborator
                  : stringsOfLanguages._props.hn.collaborator}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressCreateLabels}>
            <View style={styles.buttons}>
              <MaterialCommunityIcons
                name="label-outline"
                size={Size.ICON_MEDIUM}
                color={Color.HEADING}
              />
              <Text style={styles.btn_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.labels
                  : stringsOfLanguages._props.hn.labels}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressNavigateToHelp}>
            <View style={styles.buttons}>
              <AntDesign
                name="questioncircleo"
                size={Size.ICON_MEDIUM}
                color={Color.HEADING}
              />
              <Text style={styles.btn_text}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.helpnfeedback
                  : stringsOfLanguages._props.hn.helpnfeedback}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export const DeleteBottomModal = props => {
  const changeLang = useSelector(state => state.toggle);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      hardwareAccelerated>
      <TouchableOpacity
        style={styles.bottom_note_modal}
        activeOpacity={1}
        onPress={() => props.hideModal()}>
        <View style={styles.bottom_modal_container}>
          <TouchableOpacity onPress={props.onPressRestore}>
            <View style={styles.buttons}>
              <MaterialIcons
                name="restore"
                size={Size.ICON_MEDIUM}
                color={Color.HEADING}
              />
              <Text style={styles.btn_text}>{changeLang === 'English'
                  ? stringsOfLanguages._props.en.restore
                  : stringsOfLanguages._props.hn.restore}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressDeleteForever}>
            <View style={styles.buttons}>
              <MaterialCommunityIcons
                name="delete-forever-outline"
                size={Size.ICON_MEDIUM}
                color={Color.HEADING}
              />
              <Text style={styles.btn_text}>{changeLang === 'English'
                  ? stringsOfLanguages._props.en.deleteforever
                  : stringsOfLanguages._props.hn.deleteforever}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  top_profile_modal: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
  },
  mid_img_modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom_note_modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: -2,
  },
  modal_container: {
    width: '95%',
    height: 230,
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#555',
  },
  img_modal_container: {
    width: '75%',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 20,
  },
  bottom_modal_container: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#555',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal_dataContainer: {
    margin: 10,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
  },
  profile_text: {
    fontSize: 15,
    color: 'white',
  },
  buttons: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 25,
    flexDirection: 'row',
  },
  modalBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  btn_text: {
    fontSize: 15,
    margin: 15,
    color: 'white',
  },
  profile_icon: {
    marginRight: 15,
    marginLeft: -35,
  },
  modal_img: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
