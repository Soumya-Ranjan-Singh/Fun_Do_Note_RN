import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';

const DashBoardTopBar = props => {
  const changeLang = useSelector(state => state.toggle);
  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <View style={styles.innerContainer}>
          <View style={styles.menuIcon}>
            <TouchableOpacity onPress={props.onPressDrawerNavigation}>
              <MaterialIcon color={'white'} name="menu" size={25} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={props.onPressSearchNavigation}>
              <Text style={styles.searchTxt}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.searchnotes
                  : stringsOfLanguages._props.hn.searchnotes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={props.onPressSetListView}>
            {props.listView ? (
              <Feather name="grid" color={'white'} size={25} />
            ) : (
              <Icons name="view-agenda-outline" size={25} color={'white'} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.dotBtn}>
          <TouchableOpacity onPress={props.onPressSetModalVisibility}>
            <Avatar rounded source={props.source} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashBoardTopBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 25,
  },
  innerView: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  menuIcon: {
    padding: 10,
    paddingLeft: 10,
  },
  searchBtn: {
    margin: 10,
    paddingRight: 150,
  },
  searchTxt: {
    color: 'white',
    fontSize: 20,
  },
  dotBtn: {
    paddingRight: 5,
    paddingLeft: 20,
  },
});
