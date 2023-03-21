import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export const CustomTopBar = props => {
  return (
    <View style={styles.topbarContainer}>
      <View style={styles.menuIcon}>
        <TouchableOpacity onPress={props.onPressOpenDrawer}>
          <MaterialIcon color={'white'} name="menu" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerBtn}>
        <Text style={styles.topBarTxt}>{props.text}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={props.onPressOpenSearch}>
          <Feather color={'white'} name="search" size={25} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={props.onPressListView}
          style={styles.menuIcon}>
          {props.view ? (
            <Feather name="grid" color={'white'} size={25} />
          ) : (
            <Icons name="view-agenda-outline" size={25} color={'white'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const LabelCustomTopBar = props => {
  return (
    <View style={styles.topbarContainer}>
      <View style={styles.labelTopbarView}>
        <View style={styles.menuIcon}>
          <TouchableOpacity onPress={props.onPressOpenDrawer}>
            <MaterialIcon color={'white'} name="menu" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.labelTopbarTxt}>
          <Text style={styles.topBarTxt}>{props.text}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.labelSearchIcon}
          onPress={props.onPressOpenSearch}>
          <Feather color={'white'} name="search" size={25} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={props.onPressListView}
          style={styles.otherIcon}>
          {props.view ? (
            <Feather name="grid" color={'white'} size={25} />
          ) : (
            <Icons name="view-agenda-outline" size={25} color={'white'} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.otherIcon}
          onPress={props.onPressMenuModal}>
          <Icons color={'white'} name="dots-vertical" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TrashTopBar = props => {
  return (
    <View style={styles.topbarContainer}>
      <View>
        <TouchableOpacity
          onPress={props.onPressOpenDrawer}
          style={styles.menuIcon}>
          <MaterialIcon color={'white'} name="menu" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerBtn}>
        <Text style={styles.topBarTxt}>{props.text}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.otherIcon}
          onPress={props.onPressMenuModal}>
          <Icons color={'white'} name="dots-vertical" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 25,
    justifyContent: 'flex-start',
  },
  menuIcon: {
    padding: 10,
    paddingLeft: 15,
  },
  containerBtn: {
    marginLeft: 10,
    marginRight: 'auto',
  },
  topBarTxt: {
    fontSize: 20,
    color: 'white',
  },
  otherIcon: {
    padding: 10,
  },
  labelTopbarView: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  labelTopbarTxt: {
    margin: 10,
  },
  labelSearchIcon: {
    padding: 10,
    paddingLeft: 10,
    marginLeft: 120,
  },
});
