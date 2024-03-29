import React from 'react';
import pageStyles from '../utility/global.style';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import NoteCard from '../components/NoteCard';
import {fetchNoteData} from '../services/NoteServices';
import {AuthContext} from '../navigation/AuthProvider';
import {ScrollView} from 'react-native-gesture-handler';
import stringsOfLanguages from '../utility/localization/Translation';
import {TrashTopBar} from '../components/CustomTopBar';
import {connect} from 'react-redux';

class Trash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trashNotes: [],
    };
  }
  static contextType = AuthContext;

  unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getNotes();
  });

  getNotes = async () => {
    let noteData = await fetchNoteData(this.context.user);
    let trash = [];
    noteData.forEach(element => {
      if (element.trash) {
        trash.push(element);
      }
    });
    this.setState({trashNotes: trash});
  };

  componentDidMount() {
    this.unsubscribe;
  }

  componentWillUnmount() {
    return this.unsubscribe;
  }

  componentDidUpdate() {
    this.props.navigation;
  }

  goToEditNotes = ({item}) => {
    this.props.navigation.navigate('CreateNote', {
      editdata: item,
      noteId: item.id,
    });
  };

  render() {
    return (
      <View style={pageStyles.container}>
        <TrashTopBar
          onPressOpenDrawer={() => {
            this.props.navigation.openDrawer();
          }}
          text={
            this.props.changeLang === 'English'
              ? stringsOfLanguages._props.en.trash
              : stringsOfLanguages._props.hn.trash
          }
          onPressMenuModal={null}
        />
        <ScrollView>
          <FlatList
            data={this.state.trashNotes}
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
  }
}

const mapStateToProps = state => {
  return {
    changeLang: state.toggle,
  };
};

export default connect(mapStateToProps)(Trash);

const styles = StyleSheet.create({
  listLayout: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
  },
});
