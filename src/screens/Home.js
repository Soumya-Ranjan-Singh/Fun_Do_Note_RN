/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Modal} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import pageStyles from '../utility/global.style';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Size, Color} from '../utility/Theme';
import {AuthContext} from '../navigation/AuthProvider';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {Alert} from 'react-native';
// import {Platform} from 'react-native';
// import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
//import Profile from '../components/Profile';

const HomeScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerModal, setInnerModal] = useState(false);
  const {logout} = useContext(AuthContext);
  //const [filePath, setFilePath] = useState({});
  const [imageFile, setImageFile] = useState();
  const [listView, setListView] = useState(false);

  const takePhotoFromCamera = () => {
    console.log('Take Photo');
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      console.log(image);
    });
  };

  const choosePhotoFromLibrary = () => {
    console.log('Choose Photo');
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      console.log(image);
      setImageFile(image.path);
    });
  };


  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permission',
  //           message: 'App needs camera permission',
  //         },
  //       );
  //       // If CAMERA Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // };

  // const requestExternalWritePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Write Permission',
  //           message: 'App needs write permission',
  //         },
  //       );
  //       // If WRITE_EXTERNAL_STORAGE Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       Alert.alert('Write permission err', err);
  //     }
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const captureImage = async type => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //     videoQuality: 'low',
  //     durationLimit: 30, //Video max duration in seconds
  //     saveToPhotos: true,
  //   };
  //   let isCameraPermitted = await requestCameraPermission();
  //   let isStoragePermitted = await requestExternalWritePermission();
  //   if (isCameraPermitted && isStoragePermitted) {
  //     launchCamera(options, response => {
  //       console.log('Response = ', response);

  //       if (response.didCancel) {
  //         Alert.alert('User cancelled camera picker');
  //         return;
  //       } else if (response.errorCode === 'camera_unavailable') {
  //         Alert.alert('Camera not available on device');
  //         return;
  //       } else if (response.errorCode === 'permission') {
  //         Alert.alert('Permission not satisfied');
  //         return;
  //       } else if (response.errorCode === 'others') {
  //         Alert.alert(response.errorMessage);
  //         return;
  //       }
  //       console.log('base64 -> ', response.base64);
  //       console.log('uri -> ', response.uri);
  //       console.log('width -> ', response.width);
  //       console.log('height -> ', response.height);
  //       console.log('fileSize -> ', response.fileSize);
  //       console.log('type -> ', response.type);
  //       console.log('fileName -> ', response.fileName);
  //       setFilePath(response);
  //     });
  //   }
  // };

  // const chooseFile = type => {
  //   let options = {
  //     mediaType: type,
  //     quality: 1,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       Alert.alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode === 'camera_unavailable') {
  //       Alert.alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode === 'permission') {
  //       Alert.alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode === 'others') {
  //       Alert.alert(response.errorMessage);
  //       return;
  //     }
  //     console.log('base64 -> ', response.assets[0].base64);
  //     console.log('uri -> ', response.assets[0].uri);
  //     console.log('width -> ', response.assets[0].width);
  //     console.log('height -> ', response.assets[0].height);
  //     console.log('fileSize -> ', response.assets[0].fileSize);
  //     console.log('type -> ', response.assets[0].type);
  //     console.log('fileName -> ', response.assets[0].fileName);
  //     setFilePath(response);
  //   });
  // };

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
          <View>
            <TouchableOpacity onPress={null}>
              <MaterialIcon
                color={'white'}
                name="menu"
                size={25}
                style={{padding: 10, paddingLeft: 10}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  paddingLeft: 10,
                  paddingRight: 170,
                }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setListView(!listView);
              }}>
              {listView ? (
                <Feather name="grid" color={'white'} size={25} style={{}} />
              ) : (
                <Icons
                  name="view-agenda-outline"
                  size={25}
                  color={'white'}
                  style={{}}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{paddingRight: 20, paddingLeft: 20}}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Avatar
                rounded
                source={
                  imageFile === undefined
                    ? require('../assets/logo/User.png')
                    : {uri: imageFile}
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              hardwareAccelerated>
              <View
                style={{
                  flex: 1,
                  marginTop: 80,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 350,
                    height: 250,
                    backgroundColor: 'black',
                    borderWidth: 1,
                    borderColor: '#555',
                    borderRadius: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setInnerModal(!innerModal);
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        marginTop: 10,
                      }}>
                      <Avatar
                        rounded
                        source={
                          imageFile === undefined
                            ? require('../assets/logo/User.png')
                            : {uri: imageFile}
                        }
                        size={50}
                      />
                      <Text style={{fontSize: 15, color: Color.HEADING}}>
                        Change Profile Picture
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Setting')}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        marginTop: 10,
                        flexDirection: 'row',
                      }}>
                      <AntDesign
                        name="setting"
                        size={Size.ICON_MEDIUM}
                        color={Color.HEADING}
                      />
                      <Text style={{fontSize: 15, margin: 15}}>Profile</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => logout()}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, margin: 10}}>Logout</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, margin: 10}}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <View style={{flex: 2}}>
        <ScrollView>
          <SafeAreaView>
            <View>
              <View style={{paddingLeft: 20, paddingTop: 15}}>
                <Text
                  style={{color: 'white', fontSize: 20, fontStyle: 'italic'}}>
                  Pinned Text
                </Text>
              </View>
            </View>
            <View>
              <View style={{paddingLeft: 20, paddingTop: 15}}>
                <Text
                  style={{color: 'white', fontSize: 20, fontStyle: 'italic'}}>
                  Other Text
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          justifyContent: 'flex-end',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
        <View
          style={{
            width: 100,
          }}>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Ionicons
                  name="checkbox-outline"
                  style={{color: 'white', padding: 15}}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcon
                  name="brush"
                  style={{color: 'white', padding: 15}}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcon
                  name="mic-none"
                  style={{color: 'white', padding: 15}}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setInnerModal(!innerModal);
                }}>
                <MaterialIcon
                  name="crop-original"
                  style={{color: 'white', padding: 15}}
                  size={25}
                />
              </TouchableOpacity>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={innerModal}
                  onRequestClose={() => setInnerModal(false)}
                  hardwareAccelerated>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 250,
                        height: 200,
                        backgroundColor: 'black',
                        borderWidth: 1,
                        borderColor: '#555',
                        borderRadius: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          takePhotoFromCamera();
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: '#555',
                          borderWidth: 1,
                          borderRadius: 10,
                          margin: 10,
                        }}>
                        <Text style={{fontSize: 15, margin: 10}}>Open Camera</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          choosePhotoFromLibrary();
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: '#555',
                          borderWidth: 1,
                          borderRadius: 10,
                          margin: 10,
                        }}>
                        <Text style={{fontSize: 15, margin: 10}}>Open Gallery</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setInnerModal(!innerModal);
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 10,
                        }}>
                        <Text style={{fontSize: 15, margin: 10}}>OK</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 10,
                position: 'absolute',
                width: 70,
                height: 70,
                bottom: '80%',
                left: '320%',
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  borderRadius: 20,
                  height: 70,
                  width: 70,
                  borderColor: '#555',
                  borderWidth: 5,
                  alignSelf: 'center',
                  elevation: 8,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                }}
                onPress={() => {
                  navigation.navigate('CreateNote');
                }}>
                <Feather name="plus-square" style={{padding: 10}} size={40} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 20,
//     color: '#333333',
//   },
// });
