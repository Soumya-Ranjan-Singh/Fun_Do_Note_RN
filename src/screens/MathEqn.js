import MathJax from 'react-native-mathjax';
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import pageStyles from '../utility/global.style';
import SQLite from 'react-native-sqlite-storage';

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

const NoteCard = ({...item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.title}</Text>
      <MathJax mathJaxOptions={mmlOptions} html={item.note} />
    </View>
  );
};

const MathEqn = ({navigation}) => {
  const [eqnArray, setEqnArray] = useState([]);

  const db = SQLite.openDatabase(
    {
      name: 'MathEqnDB',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  const goToEditNotes = ({item}) => {
    navigation.navigate('CreateNote', {
      editdata: item,
      noteId: item.id,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_note', [], (_tx, results) => {
          let temp = [];
          let notesArray = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          temp.forEach(element => {
            if (element.title.includes('Eqn')) {
              notesArray.push(element);
            }
          });
          setEqnArray(notesArray);
        });
      });
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={pageStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Math Notes</Text>
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  headerTxt: {
    color: 'white',
    fontSize: 25,
  },
});
