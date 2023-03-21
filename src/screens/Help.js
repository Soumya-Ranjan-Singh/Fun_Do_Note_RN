import React from 'react';
import pageStyles from '../utility/global.style';
import {View, Text, StyleSheet} from 'react-native';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';

const Help = () => {
  const changeLang = useSelector(state => state.toggle);
  return (
    <View style={pageStyles.container}>
      <Text style={styles.headerTxt}>
        {changeLang === 'English'
          ? stringsOfLanguages._props.en.helpnfeedback
          : stringsOfLanguages._props.hn.helpnfeedback}
      </Text>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  headerTxt: {
    color: 'white',
    fontSize: 30,
  },
});
