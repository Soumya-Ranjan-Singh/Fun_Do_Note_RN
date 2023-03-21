import React, {useState} from 'react';
import pageStyles from '../utility/global.style';
import {View, StyleSheet} from 'react-native';
import {CustomTopBar} from '../components/CustomTopBar';
import DashBoardBottomBar from '../components/DashBoardBottomBar';
import stringsOfLanguages from '../utility/localization/Translation';
import {useDispatch, useSelector} from 'react-redux';
import {listViewPress} from '../redux/Action';
//import { ImageOpenerModal } from '../components/CustomModal';

const Reminder = ({navigation}) => {
  const changeLang = useSelector(state => state.toggle);
  const listView = useSelector(state => state.listView);
  const dispatch = useDispatch();
  const [innerModal, setInnerModal] = useState(false);

  return (
    <View style={pageStyles.container}>
      <View>
        <CustomTopBar
          onPressOpenDrawer={() => {
            navigation.openDrawer();
          }}
          text={
            changeLang === 'English'
              ? stringsOfLanguages._props.en.reminders
              : stringsOfLanguages._props.hn.reminders
          }
          onPressOpenSearch={() => {
            navigation.navigate('Search');
          }}
          onPressListView={() => dispatch(listViewPress())}
          view={listView}
        />
      </View>
      <View style={styles.footer}>
        <DashBoardBottomBar
          onPressCheckbox={null}
          onPressBrush={null}
          onPressMic={null}
          onPressImage={() => {
            setInnerModal(!innerModal);
          }}
          onPressOpenNoteCreator={() => {
            navigation.navigate('CreateNote');
          }}
        />
      </View>
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  footer: {
    marginTop: 660,
  },
});
