import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {Size, Color} from '../utility/Theme';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export const ReminderModal = ({
  showReminderModal,
  setShowReminderModal,
  reminderDate,
  setReminderDate,
}) => {
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);

  const changeSelectedDate = (event, selectedDate) => {
    setShow(false);
    let date = selectedDate.toISOString();
    setReminderDate(date);
  };

  const setDerivedReminderDate =
    (h = 0, d = 0, m = 0) =>
    () => {
      const selectedDate = moment().add(d, 'days').hour(h).minute(m);
      let date = selectedDate.toISOString();
      setReminderDate(date);
    };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <View>
        {show && (
          <RNDateTimePicker
            value={reminderDate ? new Date(reminderDate) : new Date()}
            mode={mode}
            is24Hour={true}
            display={'inline'}
            onChange={changeSelectedDate}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showReminderModal}
        onRequestClose={() => {
          setShowReminderModal(false);
        }}
        hardwareAccelerated>
        <TouchableOpacity
          style={styles.bottom_note_modal}
          activeOpacity={1}
          onPress={() => {
            setShowReminderModal(false);
          }}>
          <View style={styles.bottom_modal_container}>
            <TouchableOpacity onPress={setDerivedReminderDate(18)}>
              <View style={styles.buttons}>
                <Feather
                  name="clock"
                  size={Size.ICON_MEDIUM}
                  color={Color.HEADING}
                />
                <Text style={styles.btn_text1}>Later today</Text>
                <Text style={styles.btn_text2}>06 : 00 PM</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setDerivedReminderDate(8, 1)}>
              <View style={styles.buttons}>
                <Feather
                  name="clock"
                  size={Size.ICON_MEDIUM}
                  color={Color.HEADING}
                />
                <Text style={styles.btn_text1}>Tomorrow Morning</Text>
                <Text style={styles.btn_text2}>08 : 00 AM</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setDerivedReminderDate(8, 7)}>
              <View style={styles.buttons}>
                <Feather
                  name="clock"
                  size={Size.ICON_MEDIUM}
                  color={Color.HEADING}
                />
                <Text style={styles.btn_text1}>
                  {moment().add(7, 'days').format('dddd')} morning
                </Text>
                <Text style={styles.btn_text2}>
                  {moment().add(7, 'days').format('ddd')} 08 : 00 AM
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showMode('date');
              }}>
              <View style={styles.buttons}>
                <Feather
                  name="clock"
                  size={Size.ICON_MEDIUM}
                  color={Color.HEADING}
                />
                <Text style={styles.btn_text1}>Pick a date</Text>
                <Text style={styles.btn_text2}>
                  {reminderDate ? moment(reminderDate).format('DD-MM-YYYY') : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showMode('time');
              }}>
              <View style={styles.buttons}>
                <Feather
                  name="clock"
                  size={Size.ICON_MEDIUM}
                  color={Color.HEADING}
                />
                <Text style={styles.btn_text1}>Pick a time</Text>
                <Text style={styles.btn_text2}>
                  {reminderDate ? moment(reminderDate).format('hh : mm A') : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={null}>
              <View style={styles.buttons}>
                <Ionicons
                  name="location"
                  size={Size.ICON_MEDIUM}
                  color={Color.HEADING}
                />
                <Text style={styles.btn_text1}>Pick a place</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom_note_modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: -2,
  },

  bottom_modal_container: {
    backgroundColor: 'black',
  },
  modal_dataContainer: {
    margin: 10,
  },

  buttons: {
    alignContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 25,
    flexDirection: 'row',
  },

  btn_text1: {
    fontSize: 15,
    margin: 15,
    color: 'white',
  },
  btn_text2: {
    fontSize: 15,
    margin: 15,
    color: 'white',
    marginLeft: 'auto',
  },
});
