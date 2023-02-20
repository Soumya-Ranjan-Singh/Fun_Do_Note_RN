import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NoteCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <Text style={styles.text_note}>{props.note}</Text>
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'black',
    borderColor: '#fff',
    borderWidth: 2,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  text_note: {
    color: 'white',
    fontSize: 15,
  },
});
