/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';

const NoteDetails = ({navigation, changeLayout}) => {
  const [otherNotes, setOtherNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const {user} = useContext(AuthContext);

  const getNotes = async () => {
    let noteData = await fetchNoteData(user);
    let pinned = [];
    let unPinned = [];
    console.log(noteData, 'Data exist?');
    noteData.forEach(element => {
      if (element.pinned) {
        pinned.push(element);
      } else if (!element.pinned) {
        unPinned.push(element);
      }
    });
    console.log(pinned);
    console.log(unPinned);
    setPinnedNotes(pinned);
    setOtherNotes(unPinned);
  };

  useEffect(() => {
      getNotes();
  }, []);

  const goToEditNotes = item => {
    navigation.navigate('CreateNote', {
      editdata: item,
      noteId: item[0],
    });
  };

  // const PinnedNotesFlatList = () => {
  //   return (
  //     <View>
  //       <Text style={styles.listText}>
  //         {pinnedNotes.length > 0 ? 'Pinned' : ''}
  //       </Text>
  //       <FlatList
  //         overScrollMode="auto"
  //         numColumns={changeLayout ? 2 : 1}
  //         key={changeLayout ? 2 : 1}
  //         data={pinnedNotes}
  //         keyExtractor={item => item.id}
  //         ListFooterComponent={<OtherNotesFlatList />}
  //         renderItem={({item}) => (
  //           <TouchableOpacity
  //             style={changeLayout ? styles.gridLayout : styles.listLayout}
  //             onPress={() => {
  //               goToEditNotes({item});
  //             }}>
  //             <NoteCard {...item} />
  //           </TouchableOpacity>
  //         )}
  //       />
  //     </View>
  //   );
  // };

  // const OtherNotesFlatList = () => {
  //   return (
  //     <View>
  //       <Text style={styles.listText}>
  //         {otherNotes.length > 0 ? 'Other' : ''}
  //       </Text>
  //       <FlatList
  //         overScrollMode="auto"
  //         numColumns={changeLayout ? 2 : 1}
  //         key={changeLayout ? 2 : 1}
  //         data={otherNotes}
  //         keyExtractor={item => item.id}
  //         renderItem={({item}) => (
  //           <TouchableOpacity
  //             style={changeLayout ? styles.gridLayout : styles.listLayout}
  //             onPress={() => {
  //               goToEditNotes({item});
  //             }}>
  //             <NoteCard {...item} />
  //           </TouchableOpacity>
  //         )}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View>
      <View>
        {/* <FlatList
          numColumns={changeLayout ? 2 : 1}
          key={changeLayout ? 2 : 1}
          keyExtractor={item => item.id}
          ListHeaderComponent={<PinnedNotesFlatList />}
          renderItem={({item}) => (
            <TouchableOpacity
              style={changeLayout ? styles.gridLayout : styles.listLayout}
              onPress={() => {
                goToEditNotes({item});
              }}>
              <NoteCard {...item} />
            </TouchableOpacity>
          )}
        /> */}

        <View>
          <View>
            <Text style={styles.listText}>
              {pinnedNotes.length > 0 ? 'Pinned' : ''}
            </Text>
          </View>
          {pinnedNotes.map(element => {
            return (
              <View
                style={{
                  backgroundColor: 'black',
                  margin: 10,
                  borderColor: 'white',
                  borderWidth: 0.8,
                }}>
                <Text style={{}}>{element.title}</Text>
                <Text style={{}}>{element.note}</Text>
              </View>
            );
          })}
        </View>

        <View>
          <View>
            <Text style={styles.listText}>
              {otherNotes.length > 0 ? 'Other' : ''}
            </Text>
          </View>
          {otherNotes.map(element => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  margin: 10,
                  borderColor: 'white',
                  borderWidth: 0.8,
                }}
                onPress={() => {
                  goToEditNotes({element});
                }}>
                <Text style={{}}>{element.title}</Text>
                <Text style={{}}>{element.note}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  listText: {
    color: 'white',
    margin: '4%',
    fontWeight: 'bold',
    fontSize: 20,
  },

  listLayout: {
    width: '90%',
    margin: '4%',
  },

  gridLayout: {
    width: '45%',
    margin: '2%',
  },
});
