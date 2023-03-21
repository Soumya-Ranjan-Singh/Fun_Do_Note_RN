/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import { updateLabel, deleteLabel } from '../services/LabelServices';

const LabelCard = ({item, getLabels}) => {
  const {user} = useContext(AuthContext);
  const [changeIcon, setChangeIcon] = useState(true);
  const [labelName, setLabelName] = useState(item.label);

  const onEditLabel = async () => {
    const labelId = item.id;
    setChangeIcon(!changeIcon);
    if (labelName !== '') {
      await updateLabel(labelName, user, labelId);
      await getLabels();
    }
  };

  const onDeleteLabel = async () => {
    const labelId = item.id;
    await deleteLabel(user, labelId);
    await getLabels();
  };

  return (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.itemCard,
          {
            borderColor: changeIcon ? null : 'white',
            borderTopWidth: changeIcon ? null : 1,
          },
        ]}>
        <TouchableOpacity
        onPress={changeIcon ? null : onDeleteLabel}
        >
          <Icon
            name={changeIcon ? 'label-outline' : 'trash-can-outline'}
            size={20}
            color={'white'}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.labelText}
          value={labelName}
          onChangeText={text => {
            setLabelName(text);
          }}
        />
        <View>
          <TouchableOpacity
            onPress={() => {
              onEditLabel();
            }}>
            <Icon
              name={changeIcon ? 'pencil' : 'check'}
              size={20}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default LabelCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  labelText: {
    fontSize: 20,
    color: 'white',
    marginLeft: -130,
  },

  itemCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 15,
  },
});
