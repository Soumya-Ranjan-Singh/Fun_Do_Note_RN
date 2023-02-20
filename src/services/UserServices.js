import firestore from '@react-native-firebase/firestore';

export const addUserSignUp = async (email,name,photo,user) => {
    await firestore()
      .collection('Profile Details')
      .doc(user)
      .set({email,name,photo});
  };

export const fetchUserData = async user => {
  const array = [];
    const documentSnapshot = await firestore()
    .collection('Profile Details')
    .doc(user.uid)
    .get();
    console.log(user.uid);
    console.log(documentSnapshot.exists, 'Doc exist?');
    console.log('User data: ', documentSnapshot.data());
    const name = documentSnapshot.data().name;
    const image = documentSnapshot.data().photo;
    //console.log(name);
    //console.log(image);
    array.push(name);
    array.push(image);
    //console.log(array);
    return array;
};

export const updateUserData = async (user,photo) => {
  await firestore()
    .collection('Profile Details')
    .doc(user.uid)
    .update({photo});
};
