/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useContext} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {labelData} from '../redux/Action';
import {useSelector, useDispatch} from 'react-redux';
import {fetchLabelData} from '../services/LabelServices';
import {AuthContext} from '../navigation/AuthProvider';
import stringsOfLanguages from '../utility/localization/Translation';
import { Size } from '../utility/Theme';
import pageStyles from '../utility/global.style';

const CustomDrawer = ({props, navigation}) => {
  const labels_data = useSelector(state => state.labels_data);
  const changeLang = useSelector(state => state.toggle);
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLabels();
    });
    return unsubscribe;
  }, [navigation]);

  const getLabels = async () => {
    let data = await fetchLabelData(user);
    dispatch(labelData(data));
  };

  return (
    <View style={pageStyles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>
            {changeLang === 'English'
              ? stringsOfLanguages._props.en.fundoonotes
              : stringsOfLanguages._props.hn.fundoonotes}
          </Text>
        </View>
        <View>
          <DrawerItem
            icon={() => (
              <Ionicons name="bulb-outline" size={Size.ICON_LARGE} color={'white'} />
            )}
            label={() => (
              <Text style={styles.screenText}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.note
                  : stringsOfLanguages._props.hn.note}
              </Text>
            )}
            onPress={() => navigation.navigate('Note')}
          />
          <View style={styles.labelsContainer}>
            <View style={styles.labelsHeading}>
              <Text style={styles.labelsText}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.labels
                  : stringsOfLanguages._props.hn.labels}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Create new lable')}>
                <Text style={styles.labelsText}>
                  {changeLang === 'English'
                    ? stringsOfLanguages._props.en.edit
                    : stringsOfLanguages._props.hn.edit}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.labelItems}>
              {labels_data?.map(item => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Labels', {...item});
                  }}
                  style={styles.itemView}
                  key={item.id}>
                  <View>
                    <Icons name="label-outline" size={Size.ICON_MEDIUM} color={'white'} />
                  </View>
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <DrawerItem
              icon={() => (
                <Ionicons name="add-outline" size={Size.ICON_LARGE} color={'white'} />
              )}
              label={() => (
                <Text style={styles.screenText}>
                  {changeLang === 'English'
                    ? stringsOfLanguages._props.en.create
                    : stringsOfLanguages._props.hn.create}
                </Text>
              )}
              onPress={() => navigation.navigate('Create new lable')}
            />
          </View>
          <DrawerItem
            icon={() => (
              <Ionicons
                name="notifications-outline"
                size={25}
                color={'white'}
              />
            )}
            label={() => (
              <Text style={styles.screenText}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.reminders
                  : stringsOfLanguages._props.hn.reminders}
              </Text>
            )}
            onPress={() => navigation.navigate('Reminder')}
          />
          <DrawerItem
            icon={() => (
              <Ionicons name="archive-outline" size={Size.ICON_LARGE} color={'white'} />
            )}
            label={() => (
              <Text style={styles.screenText}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.archive
                  : stringsOfLanguages._props.hn.archive}
              </Text>
            )}
            onPress={() => navigation.navigate('Archive')}
          />
          <DrawerItem
            icon={() => (
              <Ionicons name="trash-outline" size={Size.ICON_LARGE} color={'white'} />
            )}
            label={() => (
              <Text style={styles.screenText}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.trash
                  : stringsOfLanguages._props.hn.trash}
              </Text>
            )}
            onPress={() => navigation.navigate('Trash')}
          />
          <DrawerItem
            icon={() => (
              <Ionicons name="settings-outline" size={Size.ICON_LARGE} color={'white'} />
            )}
            label={() => (
              <Text style={styles.screenText}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.settings
                  : stringsOfLanguages._props.hn.settings}
              </Text>
            )}
            onPress={() => navigation.navigate('Settings')}
          />
          <DrawerItem
            icon={() => (
              <AntDesign name="questioncircleo" size={Size.ICON_LARGE} color={'white'} />
            )}
            label={() => (
              <Text style={styles.screenText}>
                {changeLang === 'English'
                  ? stringsOfLanguages._props.en.helpnfeedback
                  : stringsOfLanguages._props.hn.helpnfeedback}
              </Text>
            )}
            onPress={() => navigation.navigate('Help')}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
  },
  headerText: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 25,
    fontWeight: 'bold',
  },
  screenText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    margin: -10,
    color: 'white',
  },
  labelsContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  labelsHeading: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelsText: {
    color: 'white',
  },
  labelItems: {
    marginLeft: 10,
  },
  itemView: {
    flexDirection: 'row',
    padding: 10,
  },
  itemText: {
    marginLeft: 20,
    fontSize: 15,
    color: 'white',
  },
});
