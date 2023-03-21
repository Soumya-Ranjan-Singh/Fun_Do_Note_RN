import React from 'react';
import pageStyles from '../utility/global.style';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import stringsOfLanguages from '../utility/localization/Translation';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLang} from '../redux/Action';
import {LanguagePicker} from '../components/CustomLanguagePicker';

const Settings = ({navigation}) => {
  const changeLang = useSelector(state => state.toggle);
  const dispatch = useDispatch();
  return (
    <View style={pageStyles.container}>
      <View style={styles.topbarContainer}>
        <View>
          <TouchableOpacity
            style={styles.navigationBtn}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <MaterialIcon color={'white'} name="menu" size={25} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.topbarTxt}>
            {changeLang === 'English'
              ? stringsOfLanguages._props.en.settings
              : stringsOfLanguages._props.hn.settings}
          </Text>
        </View>
      </View>
      <View style={{margin: 10,}}>
        <View style={styles.body}>
          <Text style={styles.bodyTxt}>
            {changeLang === 'English'
              ? stringsOfLanguages._props.en.chooselang
              : stringsOfLanguages._props.hn.chooselang}
          </Text>
          <LanguagePicker
            selectedValue={changeLang}
            onValueChange={(itemValue, itemIndex) =>
              dispatch(toggleLang(itemValue))
            }
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Data Chart');
          }}>
          <Text style={styles.bodyTxt}>Show Data Charts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Math Data');
          }}>
          <Text style={styles.bodyTxt}>Any math data available?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  topbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 25,
    justifyContent: 'flex-start',
  },
  navigationBtn: {
    padding: 10,
    paddingLeft: 15,
  },
  topbarTxt: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 150,
    color: 'white',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyTxt: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 20,
    color: 'white',
  },
});
