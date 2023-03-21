import firestore from '@react-native-firebase/firestore';

export const addUserSignUp = async (email, name, photo, user) => {
  try {
    await firestore()
      .collection('Profile Details')
      .doc(user)
      .set({email, name, photo});

    console.log('User added successfully!');
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserData = async user => {
  try {
    const array = [];
    const documentSnapshot = await firestore()
      .collection('Profile Details')
      .doc(user.uid)
      .get();
    const name = documentSnapshot.data().name;
    const image = documentSnapshot.data().photo;
    array.push(name);
    array.push(image);

    console.log('User Details fetched!');
    return array;
  } catch (e) {
    console.log(e);
  }
};

export const updateUserData = async (user, photo) => {
  try {
    await firestore()
      .collection('Profile Details')
      .doc(user.uid)
      .update({photo});

    console.log('User Details Updated!');
  } catch (e) {
    console.log(e);
  }
};
