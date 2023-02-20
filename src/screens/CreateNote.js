/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
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
import pageStyles from '../utility/global.style';
import {addNote, updateNoteData} from '../services/NoteServices';
import {AuthContext} from '../navigation/AuthProvider';
//import {BottomSheet} from '@gorhom/bottom-sheet';

const CreateNote = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [pinned, setPinned] = useState(false);
  const [archive, setArchive] = useState(false);
  //const {expand} = useBottomSheet();
  const [visible, setVisible] = useState(false);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (noteData?.editdata?.title !== '') {
      setTitle(noteData?.editdata?.title);
    }
    if (noteData?.editdata?.note !== '') {
      setNote(noteData?.editdata?.note);
    }
    if (noteData?.editdata?.pinned) {
      setPinned(noteData?.editdata?.pinned);
    }
  },[]);

  const noteData = route.params;
  const obtainedID = noteData?.noteId;

  const onPressBack = async () => {
    if (obtainedID) {
      await updateNoteData(title, note, pinned, user, obtainedID);
    } else {
      await addNote(title, note, pinned, user);
    }
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
              style={{padding: 10, paddingLeft: 10}}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 180}}
            onPress={() => {
              setPinned(!pinned);
            }}>
            <Icons
              name={pinned ? 'pin' : 'pin-outline'}
              size={25}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={null} style={{marginLeft: 20}}>
            <Icons name="bell-plus-outline" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setArchive(!archive);
            }}
            style={{marginLeft: 20}}>
            <Icons
              name={
                archive ? 'archive-arrow-down' : 'archive-arrow-down-outline'
              }
              size={25}
              color={{}}
            />
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
                fontSize: 20,
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
            <Icons name="plus-box-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={null} style={{marginLeft: 15}}>
            <Ionicons name="color-palette-outline" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={{}}>
          <Text style={{fontSize: 20}}>Edited </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setVisible(!visible);
          }}>
          <Icons name="dots-vertical" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateNote;
