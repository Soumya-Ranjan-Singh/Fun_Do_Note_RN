/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import pageStyles from '../utility/global.style';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import NoteCard from '../components/NoteCard';
import {LabelCustomTopBar} from '../components/CustomTopBar';
import {fetchNoteData} from '../services/NoteServices';
import {AuthContext} from '../navigation/AuthProvider';
import {listViewPress} from '../redux/Action';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchNotesWithLabels} from '../services/LabelServices';

const Labels = ({navigation, route}) => {
  const labelId = route.params?.id;
  const labelName = route.params?.label;
  const {user} = useContext(AuthContext);
  const [labelNotes, setLabelNotes] = useState([]);
  const listView = useSelector(state => state.listView);
  const dispatch = useDispatch();

  const getNotes = async () => {
    let labelWithNoteData = await fetchNotesWithLabels(user, labelId);
    let noteData = await fetchNoteData(user);
    let notes = [];

    labelWithNoteData.forEach(f => {
      noteData.forEach(element => {
        if (!element.trash) {
          if (f.id === element.id) {
            notes.push(element);
          }
        }
      });
    });
    setLabelNotes(notes);
  };

  useEffect(() => {
    getNotes();
  }, [labelId]);

  const goToEditNotes = ({item}) => {
    navigation.navigate('CreateNote', {
      editdata: item,
      noteId: item.id,
    });
  };

  return (
    <View style={pageStyles.container}>
      <LabelCustomTopBar
        onPressOpenDrawer={() => {
          navigation.openDrawer();
        }}
        text={labelName}
        onPressOpenSearch={() => {
          navigation.navigate('Search');
        }}
        onPressListView={() => dispatch(listViewPress())}
        view={listView}
        onPressMenuModal={null}
      />
      <ScrollView>
        <FlatList
          data={labelNotes}
          scrollEnabled={false}
          numColumns={listView ? 2 : 1}
          key={listView ? 2 : 1}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={listView ? styles.gridLayout : styles.listLayout}
              onPress={() => {
                goToEditNotes({item});
              }}>
              <NoteCard {...item} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Labels;

const styles = StyleSheet.create({
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
