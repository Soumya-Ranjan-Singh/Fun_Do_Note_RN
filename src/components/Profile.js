import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Color, Size} from '../utility/Theme';

const Profile = (props,{navigation}) => {
  const [modalVisible, setModalVisible] = useState(props.value);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
      hardwareAccelerated>
      <View style={{}}>
        <TouchableOpacity>
          <View style={{}}>
            <AntDesign name="picture" size={30} color={{}} />
            <Text style={{}}>Change Profile Picture</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <View style={{}}>
            <AntDesign
              name="setting"
              size={Size.ICON_MEDIUM}
              color={Color.HEADING}
            />
            <Text style={{}}>Setting</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={{}} style={{}}>
          <Text style={{}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Profile;
