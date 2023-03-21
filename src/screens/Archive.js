import React from 'react';
import pageStyles from '../utility/global.style';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import NoteCard from '../components/NoteCard';
import {CustomTopBar} from '../components/CustomTopBar';
import {fetchNoteData} from '../services/NoteServices';
import {AuthContext} from '../navigation/AuthProvider';
import {connect} from 'react-redux';
import {listViewPress} from '../redux/Action';
import { ScrollView } from 'react-native-gesture-handler';
import stringsOfLanguages from '../utility/localization/Translation';

//It should be on class component
class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      archiveNotes: [],
    };
  }

  static contextType = AuthContext;

  unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getNotes();
  });

  getNotes = async () => {
    let noteData = await fetchNoteData(this.context.user);
    let archive = [];
    noteData.forEach(element => {
      if (element.archive && !element.trash) {
        archive.push(element);
      }
    });
    this.setState({archiveNotes: archive});
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
        <CustomTopBar
          onPressOpenDrawer={() => {
            this.props.navigation.openDrawer();
          }}
          text={this.props.changeLang === 'English'
          ? stringsOfLanguages._props.en.archive
          : stringsOfLanguages._props.hn.archive}
          onPressOpenSearch={() => {
            this.props.navigation.navigate('Search');
          }}
          onPressListView={() => this.props.handlePress()}
          view={this.props.listView}
        />
        <ScrollView>
          <FlatList
            data={this.state.archiveNotes}
            scrollEnabled={false}
            numColumns={this.props.listView ? 2 : 1}
            key={this.props.listView ? 2 : 1}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={
                  this.props.listView ? styles.gridLayout : styles.listLayout
                }
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
    listView: state.listView,
    changeLang: state.toggle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handlePress: () => dispatch(listViewPress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archive);

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
