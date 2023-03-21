import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chip from './Chip';

const NoteCard = props => {
  return (
    <View style={[styles.container, {backgroundColor: props.bcgColor}]}>
      <Text style={styles.text}>{props.title}</Text>
      <Text style={styles.text_note}>{props.note}</Text>
      <View style={styles.chipContainer}>
        {props.reminderDate ? (
          <View style={styles.reminderChip}>
            <View style={styles.reminderContainer}>
              <View>
                <Icons name="alarm" size={25} color={'white'} />
              </View>
              <Text style={styles.reminderText}>
                {props.reminderDate
                  ? moment(props.reminderDate).format('LLLL')
                  : null}
              </Text>
            </View>
          </View>
        ) : null}
        {props.labelData.map(label => (
          <Chip key={label.id}>{label.label}</Chip>
        ))}
      </View>
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: '#fff',
    borderWidth: 2,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  text_note: {
    color: 'white',
    fontSize: 15,
    margin: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
