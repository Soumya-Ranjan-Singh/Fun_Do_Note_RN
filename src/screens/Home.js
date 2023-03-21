import React, {useState, useContext, useEffect} from 'react';
import {Alert, Platform, View, StyleSheet} from 'react-native';
import {ProfileModal, ImageOpenerModal} from '../components/CustomModal';
import DashBoardTopBar from '../components/DashBoardTopBar';
import DashBoardBottomBar from '../components/DashBoardBottomBar';
import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker from 'react-native-image-crop-picker';
import {fetchUserData, updateUserData} from '../services/UserServices';
import storage from '@react-native-firebase/storage';
import pageStyles from '../utility/global.style';
import NoteDetails from '../components/NoteDetails';
import {useDispatch, useSelector} from 'react-redux';
import {listViewPress} from '../redux/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerModal, setInnerModal] = useState(false);
  const {user, logout} = useContext(AuthContext);
  const [imageFile, setImageFile] = useState('');
  // const [listView, setListView] = useState(false);
  //const [isLongPress, setIsLongPress] = useState(false);
  const [userName, setUserName] = useState();
  const photoDetails = user.photoURL;
  const listView = useSelector(state => state.listView);
  const dispatch = useDispatch();

  const isGoogleSignin = () => {
    //console.log(photoDetails);
    if (photoDetails !== null && photoDetails.includes('googleusercontent')) {
      return true;
    } else {
      return false;
    }
  };

  const uploadImage = async props => {
    const uri = props;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    //console.log(uploadUri);
    await storage()
      .ref(filename)
      .putFile(uploadUri)
      .then(async () => {
        const url = await storage().ref(filename).getDownloadURL();
        await AsyncStorage.setItem('PhotoData', url);
        setImageFile(url);
        updateUserData(user, url);
      });
    try {
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!',
      );
    } catch (e) {
      console.error(e);
    }
  };

  const dataReceiver = async () => {
    try {
      const userdata = await fetchUserData(user);
      const value = await AsyncStorage.getItem('PhotoData');
      // console.log(userdata);
      // console.log(value,'Photo url getting?');
      setUserName(userdata[0]);
      value !== null ? setImageFile(value) : setImageFile(userdata[1]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      isGoogleSignin() ? null : dataReceiver();
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takePhotoFromCamera = () => {
    console.log('Take Photo');
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        console.log(image);
        uploadImage(image.path);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const choosePhotoFromLibrary = () => {
    console.log('Choose Photo');
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        console.log(image);
        uploadImage(image.path);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={pageStyles.container}>
      <DashBoardTopBar
        isGoogleSignin={isGoogleSignin()}
        onPressDrawerNavigation={() => {
          navigation.openDrawer();
        }}
        onPressSearchNavigation={() => {
          navigation.navigate('Search');
        }}
        onPressSetListView={() => dispatch(listViewPress())}
        listView={listView}
        onPressSetModalVisibility={() => {
          setModalVisible(!modalVisible);
        }}
        source={
          isGoogleSignin()
            ? {uri: user.photoURL}
            : !imageFile
            ? require('../assets/logo/User.png')
            : {uri: imageFile}
        }
      />
      <View>
        {modalVisible ? (
          <ProfileModal
            isGoogleSignin={isGoogleSignin()}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            source={
              isGoogleSignin()
                ? {uri: user.photoURL}
                : !imageFile
                ? require('../assets/logo/User.png')
                : {uri: imageFile}
            }
            userName={isGoogleSignin() ? user.displayName : userName}
            onPressChangeProfilePic={() => setInnerModal(!innerModal)}
            onPressNavigateProfile={() => navigation.navigate('Setting')}
            onPressLogout={() => logout()}
            hideModal={() => setModalVisible(false)}
          />
        ) : null}
      </View>
      <View style={styles.body}>
        <NoteDetails
          navigation={navigation}
          changeLayout={listView}
          setChangeLayout={listView}
          onLongPress={null}
        />
      </View>
      <View>
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
      <View>
        {innerModal ? (
          <ImageOpenerModal
            visible={innerModal}
            onRequestClose={() => setInnerModal(false)}
            onPressOpenCamera={() => {
              takePhotoFromCamera();
            }}
            onPressOpenGallery={() => {
              choosePhotoFromLibrary();
            }}
            hideModal={() => setInnerModal(!innerModal)}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    flex: 2,
  },
});
