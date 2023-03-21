/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchLabelData} from '../services/LabelServices';
import {labelData} from '../redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../navigation/AuthProvider';
import pageStyles from '../utility/global.style';
import stringsOfLanguages from '../utility/localization/Translation';

const LabelCheckBox = ({data, onCheck, isCheck}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
      }}>
      <Icon name="label-outline" size={20} color={'white'} />
      <Text
        style={{
          fontSize: 20,
          color: 'white',
        }}>
        {data.label}
      </Text>
      <TouchableWithoutFeedback onPress={onCheck}>
        <Icons
          size={25}
          name={isCheck ? 'check-box' : 'check-box-outline-blank'}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const LabelCheckWithMemo = React.memo(LabelCheckBox);

const AddLablestoNote = ({navigation, route}) => {
  const labels = route.params?.labelData;
  const noteId = route.params?.noteId;
  const [selectedLabels, setSelectedLabels] = useState(labels || []);
  const [searchData, setSearchData] = useState([]);
  const [label, setLabel] = useState('');
  const labels_data = useSelector(state => state.labels_data);
  const changeLang = useSelector(state => state.toggle);
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLabels();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    const myFun = () => {
      navigation.navigate('CreateNote', {
        selectedLabelsData: selectedLabels,
        noteId: noteId,
      });
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      myFun,
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLabels]);

  const getLabels = async () => {
    let data = await fetchLabelData(user);
    dispatch(labelData(data));
    setSearchData(labels_data);
  };

  const handleCheck = data => () => {
    if (!selectedLabels.find(element => element.id === data.id)) {
      setSelectedLabels([...selectedLabels, data]);
    } else {
      let temp = selectedLabels.filter(element => element.id !== data.id);
      setSelectedLabels(temp);
    }
  };

  const isChecked = data => {
    return selectedLabels.find(element => element.id === data.id);
  };

  const onChangeText = text => {
    setLabel(text);
    let searchItems = labels_data.filter(element =>
      element.label.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchData(searchItems);
  };

  return (
    <View style={pageStyles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          marginTop: 25,
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateNote', {
              selectedLabelsData: selectedLabels,
              noteId: noteId,
            });
          }}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={'white'}
            style={{padding: 10, paddingLeft: 10}}
          />
        </TouchableOpacity>
        <TextInput
          value={label}
          onChangeText={text => onChangeText(text)}
          placeholder={
            changeLang === 'English'
              ? stringsOfLanguages._props.en.enterlabel
              : stringsOfLanguages._props.hn.enterlabel
          }
          placeholderTextColor={'white'}
          style={{
            height: 50,
            fontSize: 17,
            marginHorizontal: 25,
            width: '80%',
          }}
        />
      </View>
      <ScrollView>
        <View style={{marginTop: 15}}>
          {searchData.map(item => (
            <LabelCheckWithMemo
              key={item.id}
              data={item}
              isCheck={isChecked(item)}
              onCheck={handleCheck(item)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddLablestoNote;
