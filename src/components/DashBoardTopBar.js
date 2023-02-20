/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfilePicture} from 'react-native-profile-picture';
import {AuthContext} from '../navigation/AuthProvider';

const DashBoardTopBar = props => {
  const {user} = useContext(AuthContext);
  const isGoogleSignin = props.isGoogleSignin;
  const photoDetails = user.photoURL;
  return (
    <View style={{justifyContent: 'center', padding: 10, paddingTop: 25}}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <TouchableOpacity onPress={props.onPressDrawerNavigation}>
            <MaterialIcon
              color={'white'}
              name="menu"
              size={25}
              style={{padding: 10, paddingLeft: 10}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={props.onPressSearchNavigation}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                paddingLeft: 10,
                paddingRight: 170,
              }}>
              Search
            </Text>
          </TouchableOpacity>
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
        <View style={{paddingRight: 20, paddingLeft: 20}}>
          <TouchableOpacity onPress={props.onPressSetModalVisibility}>
            {isGoogleSignin ? (
              <Avatar rounded source={{uri: photoDetails}} />
            ) : (
              <Avatar rounded source={props.source} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashBoardTopBar;
