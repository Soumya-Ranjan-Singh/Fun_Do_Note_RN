/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {Alert, Platform, View} from 'react-native';
import CustomModal from '../components/CustomModal';
import DashBoardTopBar from '../components/DashBoardTopBar';
import DashBoardBottomBar from '../components/DashBoardBottomBar';
import ImageOpenerModal from '../components/ImageOpnerModal';
import {AuthContext} from '../navigation/AuthProvider';
import ImagePicker from 'react-native-image-crop-picker';
import {fetchUserData, updateUserData} from '../services/UserServices';
import storage from '@react-native-firebase/storage';
import pageStyles from '../utility/global.style';
import NoteDetails from '../components/NoteDetails';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerModal, setInnerModal] = useState(false);
  const {user, logout} = useContext(AuthContext);
  const [imageFile, setImageFile] = useState();
  const [listView, setListView] = useState(false);
  const [userName, setUserName] = useState();
  const photoDetails = user.photoURL;

  const isGoogleSignin = () => {
    console.log(photoDetails);
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
    console.log(filename);
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    try {
      await task.then(downloadImage(filename));
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!',
      );
    } catch (e) {
      console.error(e);
    }
  };

  const downloadImage = async filename => {
    try {
      console.log(filename);
      const url = await storage().ref(filename).getDownloadURL();
      setImageFile(url);
      updateUserData(user, imageFile);
    } catch (e) {
      console.log(e);
    }
  };

  const dataReceiver = async () => {
    try {
      const userdata = await fetchUserData(user);
      setUserName(userdata[0]);
      setImageFile(userdata[1]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      isGoogleSignin();
      dataReceiver();
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profilePicChecker = () => {
    try {
      if (imageFile === null || photoDetails === null) {
        return require('../assets/logo/User.png');
      } else {
        return {uri: imageFile};
      }
    } catch (e) {
      console.log(e);
    }
  };

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
        // uploadImage(image.path);
        // console.log(image.path);
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
        onPressSetListView={() => {
          setListView(!listView);
        }}
        listView={listView}
        onPressSetModalVisibility={() => {
          setModalVisible(!modalVisible);
        }}
        source={profilePicChecker()}
      />
      <View>
        {modalVisible ? (
          <CustomModal
            isGoogleSignin={isGoogleSignin()}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            source={profilePicChecker()}
            userName={userName}
            onPressChangeProfilePic={() => setInnerModal(!innerModal)}
            onPressNavigateProfile={() => navigation.navigate('Setting')}
            onPressLogout={() => logout()}
            hideModal={() => setModalVisible(false)}
          />
        ) : null}
      </View>
      <View style={{flex: 2}}>
        <NoteDetails
          navigation={navigation}
          changeLayout={listView}
          setChangeLayout={setListView}
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

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 20,
//     color: '#333333',
//   },
// });
