import MathJax from 'react-native-mathjax';
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {fetchNoteData} from '../services/NoteServices';
import pageStyles from '../utility/global.style';

const mmlOptions = {
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      'AMSmath.js',
      'AMSsymbols.js',
      'noErrors.js',
      'noUndefined.js',
    ],
  },
};

const NoteCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <MathJax mathJaxOptions={mmlOptions} html={props.note} />
    </View>
  );
};

const MathEqn = ({navigation}) => {
  const [eqnArray, setEqnArray] = useState([]);

  const {user} = useContext(AuthContext);

  const getAllNotes = async () => {
    const notes = await fetchNoteData(user);
    let noteArray = [];
    notes.forEach(element => {
      if (!element.trash && element.title.includes('Eqn')) {
        noteArray.push(element);
      }
    });
    setEqnArray(noteArray);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllNotes();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={pageStyles.container}>
      <View style={{justifyContent: 'center',alignItems: 'center', margin: 20}}>
        <Text style={{color: 'white',fontSize: 25}}>Math Notes</Text>
      </View>
      <ScrollView>
        <FlatList
          data={eqnArray}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listLayout}
              onPress={() => {
                this.goToEditNotes({item});
              }}>
              <NoteCard {...item} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default MathEqn;

const styles = StyleSheet.create({
  listLayout: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
  },
  container: {
    width: '100%',
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
});
