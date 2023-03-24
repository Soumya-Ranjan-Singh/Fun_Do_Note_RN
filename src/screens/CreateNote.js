/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Modal,
  StyleSheet,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NoteBottomModal, DeleteBottomModal} from '../components/CustomModal';
import {
  addNote,
  updateNoteData,
  deleteNoteData,
} from '../services/NoteServices';
import {AuthContext} from '../navigation/AuthProvider';
import ColorPalette from 'react-native-color-palette';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {addLabelsToNotes, deleteAddedLabels} from '../services/LabelServices';
import Chip from '../components/Chip';
import {ReminderModal} from '../components/ReminderModal';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import { addNotes,updateNotes,deleteNotes } from '../services/SqliteServices';

const CreateNote = ({navigation, route}) => {
  const noteData = route.params;
  const obtainedID = noteData?.noteId;
  const noteID = uuid.v4();
  let labelData =
    route.params?.selectedLabelsData || noteData?.editdata?.labelData || [];
  const [title, setTitle] = useState(noteData?.editdata?.title || '');
  const [note, setNote] = useState(noteData?.editdata?.note || '');
  const [pinned, setPinned] = useState(noteData?.editdata?.pinned || false);
  const [archive, setArchive] = useState(noteData?.editdata?.archive || false);
  const [trash, setTrash] = useState(noteData?.editdata?.trash || false);
  const [visible, setVisible] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const {user} = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState('');
  const [reminderDate, setReminderDate] = useState(
    noteData?.editdata?.reminderDate || '',
  );
  const [noteFetchedLabelData, setNoteFetchedLabelData] = useState([]);
  const [bcgColor, setBcgColor] = useState(
    noteData?.editdata?.bcgColor || '#000000B2',
  );
  const [colorModal, setColorModal] = useState(false);
  const changeLang = useSelector(state => state.toggle);

  useEffect(() => {
    const myFun = async (
      data1 = title,
      data2 = note,
      data3 = pinned,
      data4 = archive,
      data5 = trash,
      data6 = labelData,
      data7 = currentTime,
      data8 = bcgColor,
      data9 = reminderDate,
    ) => {
      const newNoteData = {
        title: data1,
        note: data2,
        pinned: data3,
        archive: data4,
        trash: data5,
        labelData: data6,
        currentTime: data7,
        bcgColor: data8,
        reminderDate: data9,
      };
      if (note !== '' || title !== '') {
        if (obtainedID) {
          await updateNoteData(user, obtainedID, newNoteData);
          await updateNotes(user.uid,obtainedID,title,note);
        } else {
          await addNote(user, noteID, newNoteData);
          await addNotes(user.uid,noteID,title,note);
        }
        labelsUpdate();
        reminderDate ? handleNotification() : null;
        navigation.goBack();
      } else {
        navigation.goBack();
      }

      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      myFun,
    );
    return () => backHandler.remove();
  }, [
    title,
    note,
    pinned,
    archive,
    trash,
    labelData,
    currentTime,
    bcgColor,
    reminderDate,
  ]);

  useEffect(() => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    setCurrentTime(hours + ' ' + ':' + ' ' + minutes);
    setNoteFetchedLabelData(noteData?.editdata?.labelData);
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task Reminder Notification',
        channelDescription: 'Reminder for any task',
      },
      () => {},
    );
  };

  const handleNotification = () => {
    PushNotification.localNotificationSchedule({
      id: moment(reminderDate).unix(),
      channelId: 'reminders',
      title: title,
      message: note,
      date: moment(reminderDate).toDate(),
    });
  };

  const cancelNotification = () => {
    setReminderDate(null);
    PushNotification.cancelLocalNotification(moment(reminderDate).unix());
  };

  const onPressBack =
    (
      data1 = title,
      data2 = note,
      data3 = pinned,
      data4 = archive,
      data5 = trash,
      data6 = labelData,
      data7 = currentTime,
      data8 = bcgColor,
      data9 = reminderDate,
    ) =>
    async () => {
      const newNoteData = {
        title: data1,
        note: data2,
        pinned: data3,
        archive: data4,
        trash: data5,
        labelData: data6,
        currentTime: data7,
        bcgColor: data8,
        reminderDate: data9,
      };
      if (note !== '' || title !== '') {
        if (obtainedID) {
          await updateNoteData(user, obtainedID, newNoteData);
          await updateNotes(user.uid,obtainedID,title,note);
        } else {
          await addNote(user, noteID, newNoteData);
          await addNotes(user.uid,noteID,title,note);
        }
        labelsUpdate();
        reminderDate ? handleNotification() : null;
        navigation.goBack();
      } else {
        navigation.goBack();
      }
    };

  const pinningFun = () => {
    setPinned(!pinned);
    setArchive(false);
  };

  const onPressPermanentDelete = async () => {
    await deleteNoteData(user, obtainedID).then(await deleteNotes(obtainedID)).then(navigation.goBack());
  };

  const labelsUpdate = async () => {
    if (noteFetchedLabelData?.length !== 0) {
      let data =
        route.params?.selectedLabelsData !== undefined
          ? route.params?.selectedLabelsData
          : labelData;

      let elements1 = noteFetchedLabelData?.filter(
        ({id: id1}) => !data.some(({id: id2}) => id2 === id1),
      );

      elements1?.forEach(async labelsDetails => {
        await deleteAddedLabels(user, labelsDetails.id, obtainedID);
      });
    }
    if (labelData.length !== 0) {
      let elements2 = labelData.filter(
        ({id: id1}) => !noteFetchedLabelData.some(({id: id2}) => id2 === id1),
      );

      elements2.forEach(async details => {
        obtainedID
          ? await addLabelsToNotes(user, details.id, obtainedID)
          : await addLabelsToNotes(user, details.id, noteID);
      });
    }
  };

  const ControlledColorPicker = () => {
    <ColorPalette
      onChange={color => setBcgColor(color)}
      value={bcgColor}
      colors={[
        '#C0392B',
        '#E74C3C',
        '#9B59B6',
        '#8E44AD',
        '#2980B9',
        '#e9967a',
        '#5f9ea0',
        '#800000',
        '#b8860b',
      ]}
      title={null}
      icon={
        <Icons name={'check-circle-outline'} size={25} color={'white'} />
        // React-Native-Vector-Icons Example
      }
    />;
  };

  return (
    <View style={[styles.createNoteContainer, {backgroundColor: bcgColor}]}>
      <View style={styles.topbarContainer}>
        <TouchableOpacity style={styles.navigationBtn} onPress={onPressBack()}>
          <Icons name="arrow-left" size={25} color={'white'} />
        </TouchableOpacity>
        {noteData?.editdata?.trash ? null : (
          <>
            <TouchableOpacity style={styles.pinningBtn} onPress={pinningFun}>
              <Icons
                name={pinned ? 'pin' : 'pin-outline'}
                size={25}
                color={'white'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowReminderModal(!showReminderModal);
              }}
              style={styles.otherBtn}>
              <Icons name="bell-plus-outline" size={25} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressBack(
                title,
                note,
                false,
                archive ? false : true,
                trash,
                labelData,
                currentTime,
                bcgColor,
                reminderDate,
              )}
              style={styles.otherBtn}>
              <Icons
                name={
                  archive ? 'archive-arrow-down' : 'archive-arrow-down-outline'
                }
                size={25}
                color={'white'}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.body}>
        <View>
          <TextInput
            style={styles.titleInput}
            value={title}
            placeholder={
              changeLang === 'English'
                ? stringsOfLanguages._props.en.title
                : stringsOfLanguages._props.hn.title
            }
            placeholderTextColor="white"
            onChangeText={input => setTitle(input)}
            readOnly={noteData?.editdata?.trash ? true : false}
          />
        </View>
        <ScrollView>
          <View>
            <TextInput
              style={styles.noteInput}
              value={note}
              placeholder={
                changeLang === 'English'
                  ? stringsOfLanguages._props.en.note
                  : stringsOfLanguages._props.hn.note
              }
              placeholderTextColor="white"
              onChangeText={input => setNote(input)}
              multiline={true}
              readOnly={noteData?.editdata?.trash ? true : false}
            />
          </View>

          <View style={styles.labelContainer}>
            {reminderDate ? (
              <View style={styles.reminderChip}>
                <View style={styles.reminderContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowReminderModal(!showReminderModal);
                    }}>
                    <Icons name="alarm" size={25} color={'white'} />
                  </TouchableOpacity>
                  <Text style={styles.reminderText}>
                    {reminderDate ? moment(reminderDate).format('LLLL') : null}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      cancelNotification();
                    }}>
                    <Icons name="close" size={25} color={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {labelData.map(label => (
              <Chip key={label.id}>{label.label}</Chip>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomBarContainer}>
        <TouchableOpacity
          onPress={noteData?.editdata?.trash ? null : null}
          activeOpacity={noteData?.editdata?.trash ? 1 : 0.5}
          style={styles.addBtn}>
          <Icons
            name="plus-box-outline"
            size={20}
            color={noteData?.editdata?.trash ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            noteData?.editdata?.trash
              ? null
              : () => {
                  setColorModal(true);
                }
          }
          activeOpacity={noteData?.editdata?.trash ? 1 : 0.5}
          style={styles.paletteBtn}>
          <Ionicons
            name="color-palette-outline"
            size={20}
            color={noteData?.editdata?.trash ? '#202121' : 'white'}
          />
        </TouchableOpacity>
        <Text style={styles.bottomBarTxt}>Edited {currentTime}</Text>
        <TouchableOpacity
          onPress={() => {
            setVisible(!visible);
          }}>
          <Icons name="dots-vertical" size={20} />
        </TouchableOpacity>
      </View>
      <View>
        {visible ? (
          noteData?.editdata?.trash ? (
            <DeleteBottomModal
              visible={visible}
              onRequestClose={() => setVisible(false)}
              onPressRestore={onPressBack(
                title,
                note,
                false,
                archive,
                false,
                labelData,
                currentTime,
                bcgColor,
                reminderDate,
              )}
              onPressDeleteForever={onPressPermanentDelete}
              hideModal={() => setVisible(false)}
            />
          ) : (
            <NoteBottomModal
              visible={visible}
              onRequestClose={() => setVisible(false)}
              onPressDeleteNote={onPressBack(
                title,
                note,
                false,
                archive,
                true,
                labelData,
                currentTime,
                bcgColor,
                '',
              )}
              onPressCopyNote={null}
              onPressSendNote={null}
              onPressCollaborateNote={null}
              onPressCreateLabels={() => {
                navigation.navigate('AddLablestoNote', {
                  noteId: obtainedID,
                  labelData: labelData,
                });
              }}
              onPressNavigateToHelp={() => {
                navigation.navigate('Help');
              }}
              hideModal={() => setVisible(false)}
            />
          )
        ) : null}
      </View>
      <View>
        {colorModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={colorModal}
            onRequestClose={() => setColorModal(false)}
            hardwareAccelerated>
            <TouchableOpacity
              style={styles.paletteModalContainer}
              activeOpacity={1}
              onPress={() => setColorModal(false)}>
              <View style={styles.paletteBody}>
                <ScrollView horizontal={true}>
                  <ControlledColorPicker />
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        ) : null}
      </View>
      <View>
        <ReminderModal
          showReminderModal={showReminderModal}
          setShowReminderModal={setShowReminderModal}
          reminderDate={reminderDate}
          setReminderDate={setReminderDate}
        />
      </View>
    </View>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  createNoteContainer: {
    flex: 1,
  },
  topbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 25,
    justifyContent: 'flex-start',
  },
  navigationBtn: {
    padding: 10,
    paddingLeft: 15,
  },
  pinningBtn: {
    marginLeft: 200,
  },
  otherBtn: {
    marginLeft: 20,
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    margin: 10,
  },
  titleInput: {
    fontSize: 25,
    margin: 10,
    color: 'white',
  },
  noteInput: {
    fontSize: 20,
    margin: 10,
    color: 'white',
  },
  labelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  addBtn: {
    marginRight: 30,
  },
  paletteBtn: {
    marginRight: 90,
  },
  bottomBarTxt: {
    fontSize: 15,
    marginRight: 90,
  },
  paletteModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  paletteBody: {
    height: 70,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#555',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  reminderChip: {
    borderRadius: 15,
    backgroundColor: 'grey',
    padding: 5,
    margin: 10,
  },
  reminderText: {
    fontSize: 15,
    color: 'white',
    marginTop: 3,
    marginHorizontal: 5,
  },
  reminderContainer: {
    flexDirection: 'row',
  },
});
