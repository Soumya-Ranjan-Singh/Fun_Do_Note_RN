/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useCallback} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {addLabel, fetchLabelData} from '../services/LabelServices';
import LabelCard from '../components/LabelCard';
import {useSelector, useDispatch} from 'react-redux';
import {labelData} from '../redux/Action';
import {AuthContext} from '../navigation/AuthProvider';
import pageStyles from '../utility/global.style';
import stringsOfLanguages from '../utility/localization/Translation';

const CreateLabel = ({navigation}) => {
  const [changeIcon, setChangeIcon] = useState(true);
  const [label, setLabel] = useState('');
  const {user} = useContext(AuthContext);
  const labels_data = useSelector(state => state.labels_data);
  const changeLang = useSelector(state => state.toggle);
  const dispatch = useDispatch();

  const getLabels = useCallback(async () => {
    let data = await fetchLabelData(user);
    console.log(data, 'Data fetched!');
    dispatch(labelData(data));
  }, []);

  const onPressDone = async () => {
    setChangeIcon(!changeIcon);
    if (label !== '') {
      await addLabel(label, user);
      await getLabels();
      setLabel('');
      Keyboard.dismiss();
    }
  };

  const onPressBack = () => {
    setChangeIcon(true);
    setLabel('');
    navigation.goBack();
  };

  const onChangeText = text => {
    setLabel(text);
    if (text !== '') {
      setChangeIcon(false);
    } else {
      setChangeIcon(true);
    }
  };

  return (
    <View style={pageStyles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={onPressBack}>
          <Icons
            name="arrow-left"
            size={25}
            color={'white'}
            style={{padding: 10, paddingLeft: 10}}
          />
        </TouchableOpacity>
        <Text style={styles.editText}>
          {changeLang === 'English'
            ? stringsOfLanguages._props.en.editlabels
            : stringsOfLanguages._props.hn.editlabels}
        </Text>
      </View>
      <View style={styles.createLabelContainer}>
        <TouchableOpacity
          onPress={() => {
            setChangeIcon(!changeIcon);
          }}>
          <Ionicons
            name={changeIcon ? 'add-outline' : 'close-outline'}
            size={30}
          />
        </TouchableOpacity>
        <View style={{marginLeft: 25}}>
          <TextInput
            value={label}
            onChangeText={text => onChangeText(text)}
            placeholder={changeLang === 'English'
            ? stringsOfLanguages._props.en.create
            : stringsOfLanguages._props.hn.create}
            placeholderTextColor={'white'}
            style={styles.labelInput}
          />
        </View>
        <TouchableOpacity onPress={onPressDone}>
          <Ionicons
            name={changeIcon ? null : 'checkmark-outline'}
            size={30}
            style={{marginLeft: 35}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={labels_data}
          key={item => item.id}
          keyExtractor={item => item.id}
          renderItem={item => <LabelCard getLabels={getLabels} {...item} />}
        />
      </View>
    </View>
  );
};
export default CreateLabel;

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 25,
    justifyContent: 'flex-start',
  },

  editText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginHorizontal: 15,
  },

  createLabelContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 30,
  },

  labelInput: {
    height: 50,
    fontSize: 17,
    width: 250,
  },
});
