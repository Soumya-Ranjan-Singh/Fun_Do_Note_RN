/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import pageStyles from '../utility/global.style';


const SearchNote = ({navigation}) => {
  //const [search, setSearch] = useState('');
  return (
    <View style={pageStyles.container}>
      <View style={{justifyContent: 'center', padding: 10, paddingTop: 25}}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icons
              name="arrow-left"
              color={'white'}
              size={25}
              style={{padding: 10, paddingLeft: 10}}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search your Notes"
            style={{
              color: 'white',
              fontSize: 20,
              paddingLeft: 10,
              paddingRight: 170,
            }}
            //onChangeText={text => getSearchTerm(text)}
          />
        </View>
      </View>
      <View>
        {/* //list */}
      </View>
    </View>
  );
};

export default SearchNote;
