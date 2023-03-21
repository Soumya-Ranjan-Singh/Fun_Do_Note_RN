import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import NoteCard from '../components/NoteCard';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
import pageStyles from '../utility/global.style';
import stringsOfLanguages from '../utility/localization/Translation';
import {useSelector} from 'react-redux';

const SearchNote = ({navigation}) => {
  const [searchData, setSearchData] = useState([]);
  const [input, setInput] = useState('');
  const [searchedNotes, setSearchedNotes] = useState([]);
  const {user} = useContext(AuthContext);
  const changeLang = useSelector(state => state.toggle);

  const getSearchedNotes = async () => {
    const data = await fetchNoteData(user);
    console.log(data, 'search data exist?');
    setSearchData(data);
  };

  function searchFun(text) {
    if (text !== '') {
      let searchItems = searchData.filter(
        element =>
          element.title.toLowerCase().includes(text.toLowerCase()) ||
          element.note.toLowerCase().includes(text.toLowerCase()),
      );
      setSearchedNotes(searchItems);
    } else {
      setSearchedNotes(null);
    }
  }

  const onChangeText = text => {
    setInput(text);
    searchFun(text);
  };

  const onPressReset = () => {
    setInput('');
    searchFun('');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSearchedNotes();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToEditNotes = ({item}) => {
    navigation.navigate('CreateNote', {
      editdata: item,
      noteId: item.id,
    });
  };

  return (
    <View style={pageStyles.container}>
      <View style={styles.header}>
        <View
          style={styles.headerContainer}>
          <TouchableOpacity
          style={styles.navigationBtn}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icons
              name="arrow-left"
              color={'white'}
              size={25}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={changeLang === 'English'
            ? stringsOfLanguages._props.en.search
            : stringsOfLanguages._props.hn.search}
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={input}
            autoFocus={true}
          />
          {input !== '' ? (
            <TouchableOpacity
              onPress={onPressReset}>
              <Entypo name="cross" size={30} color={'white'} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View>
        <FlatList
          data={searchedNotes}
          keyExtractor={item => item.id}
          key={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listLayout}
              onPress={() => {
                goToEditNotes({item});
              }}>
              <NoteCard {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SearchNote;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    padding: 10,
    paddingTop: 25,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationBtn: {
    padding: 10,
    paddingLeft: 15,
  },
  input: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 115,
  },
  listLayout: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
  },
});
