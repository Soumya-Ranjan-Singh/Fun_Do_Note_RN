/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
//import {useBottomSheet} from '@gorhom/bottom-sheet';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import AntDesign from 'react-native-vector-icons/AntDesign';
//import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import pageStyles from '../utility/global.style';
import firestore from '@react-native-firebase/firestore';
//import {BottomSheet} from '@gorhom/bottom-sheet';
import { AuthContext } from '../navigation/AuthProvider';

const CreateNote = ({navigation}) => {
  //const [state, setState] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  //const {expand} = useBottomSheet();
  const [visible, setVisible] = useState(false);
  const {user} = useContext(AuthContext);

  const onPressBack = () => {
    firestore()
      .collection('Users')
      .add({
        title,
        note,
      })
      .then(() => {
        console.log('Data added!');
      });
      navigation.goBack();
  };

  return (
    <View style={pageStyles.container}>
      <View style={{justifyContent: 'center', padding: 10, paddingTop: 25}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onPressBack}>
            <Icons
              name="arrow-left"
              size={25}
              style={{padding: 10, paddingLeft: 20}}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 180}} onPress={{}}>
            <Icons name="pin-outline" size={25} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={{}} style={{marginLeft: 20}}>
            <Icons name="bell-plus-outline" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={{}} style={{marginLeft: 20}}>
            <Ionicons name="archive-outline" size={25} color={{}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 15, margin: 10}}>
        <View>
          <TextInput
            style={{
              fontSize: 25,
              margin: 10,
            }}
            value={title}
            placeholder="Title"
            placeholderTextColor="white"
            onChangeText={value => setTitle(value)}
            selectionColor={'white'}
          />
        </View>
        <ScrollView>
          <View>
            <TextInput
              style={{
                fontSize: 25,
                margin: 10,
              }}
              value={note}
              placeholder="Note"
              placeholderTextColor="white"
              onChangeText={value => setNote(value)}
              multiline={true}
              selectionColor={{}}
            />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={null} style={{marginRight: 15}}>
            <Icons name="plus-box-outline" size={25} />
          </TouchableOpacity>

          <TouchableOpacity onPress={null} style={{marginLeft: 15}}>
            <Ionicons name="color-palette-outline" size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={{}}>
          <Text style={{fontSize: 25}}>Edited </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setVisible(!visible);
          }}>
          <Icons name="dots-vertical" size={25} />
        </TouchableOpacity>
      </View>
      {/* <BottomSheet>
        <View>
          <TouchableOpacity onPress={null}>
            <View style={{}}>
              <AntDesign name="delete" size={25} color={{}} />
              <Text style={{}}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={null}>
            <View style={{}}>
              <SimpleLineIcons name="share" size={25} color={{}} />
              <Text style={{}}>Share</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={null}>
            <View style={{}}>
              <Icons name="label-outline" />
              <Text style={{}}>Labels</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet> */}
    </View>
  );
};

export default CreateNote;
