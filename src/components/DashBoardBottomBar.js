import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DashBoardBottomBar = props => {
  return (
    <View style={styles.container}>
      <View style={styles.containerView}>
        <View style={styles.innerContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={props.onPressCheckbox}>
              <Ionicons
                name="checkbox-outline"
                style={styles.iconView}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressBrush}>
              <MaterialIcon name="brush" style={styles.iconView} size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressMic}>
              <MaterialIcon name="mic-none" style={styles.iconView} size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressImage}>
              <MaterialIcon
                name="crop-original"
                style={styles.iconView}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.plusIconView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.plusBtn}
              onPress={props.onPressOpenNoteCreator}>
              <Feather name="plus-square" style={styles.plusIcon} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashBoardBottomBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  containerView: {
    width: 100,
  },
  innerContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconView: {
    color: 'white',
    padding: 15,
  },
  plusIconView: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 10,
    position: 'absolute',
    width: 70,
    height: 70,
    bottom: '80%',
    left: '320%',
  },
  plusBtn: {
    borderRadius: 20,
    height: 70,
    width: 70,
    borderColor: '#555',
    borderWidth: 5,
    alignSelf: 'center',
    elevation: 8,
    backgroundColor: 'black',
  },
  plusIcon: {
    padding: 10,
  },
});
