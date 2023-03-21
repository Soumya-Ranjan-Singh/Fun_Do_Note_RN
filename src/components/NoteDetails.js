/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  SectionList,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
import NoteCard from './NoteCard';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';

const NoteDetails = ({navigation, changeLayout}, props) => {
  const [otherNotes, setOtherNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const {user} = useContext(AuthContext);
  const changeLang = useSelector(state => state.toggle);

  const getNotes = async () => {
    let noteData = await fetchNoteData(user);
    let pinned = [];
    let unPinned = [];
    noteData.forEach(element => {
      if (element.pinned) {
        pinned.push(element);
      } else if (!element.pinned && !element.archive && !element.trash) {
        unPinned.push(element);
      }
    });
    setPinnedNotes(pinned);
    setOtherNotes(unPinned);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const goToEditNotes = ({item}) => {
    navigation.navigate('CreateNote', {
      editdata: item,
      noteId: item.id,
    });
  };

  const renderItem = ({item}) => {
    return (
      <FlatList
        data={item.list}
        scrollEnabled={false}
        numColumns={changeLayout ? 2 : 1}
        key={changeLayout ? 2 : 1}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={changeLayout ? styles.gridLayout : styles.listLayout}
            onPress={() => {
              goToEditNotes({item});
            }}>
            <NoteCard {...item} />
          </TouchableOpacity>
        )}
      />
    );
  };

  const section = [
    {
      title:
        changeLang === 'English'
          ? stringsOfLanguages._props.en.pinned
          : stringsOfLanguages._props.hn.pinned,
      data: [{list: pinnedNotes}],
    },
    {
      title:
        changeLang === 'English'
          ? stringsOfLanguages._props.en.others
          : stringsOfLanguages._props.hn.others,
      data: [{list: otherNotes}],
    },
  ];

  const header = ({section}) => {
    if (pinnedNotes?.length) {
      return (
        <View>
          <Text style={styles.listText}>{section.title}</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <View>
        <SectionList
          sections={section}
          renderSectionHeader={header}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  listText: {
    color: 'white',
    margin: '1%',
    marginLeft: '3%',
    fontWeight: 'bold',
    fontSize: 20,
  },

  listLayout: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
  },

  gridLayout: {
    width: '45%',
    margin: '2%',
  },
});
