import firestore from '@react-native-firebase/firestore';

export const addNote = async (title, note, pinned, user) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('Notes')
      .add({
        title: title,
        note: note,
        pinned: pinned,
      });

    console.log('Data added!');
  } catch (e) {
    console.log(e);
  }
};

export const fetchNoteData = async user => {
  try {
    const array = [];
    const querySnapshot = await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('Notes')
      .get();
    // console.log(user.uid);
    // console.log(querySnapshot.size, 'Doc exist?');
    querySnapshot.forEach(documentSnapshot => {
      // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      const data = documentSnapshot.data();
      data.id = documentSnapshot.id;
      array.push(data);
    });
    return array;
  } catch (e) {
    console.log(e);
  }
};

export const updateNoteData = async (title, note, pinned, user, obtainedID) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('Notes')
      .doc(obtainedID)
      .update({
        title: title,
        note: note,
        pinned: pinned,
      });
    // console.log(user.uid);
    // console.log(obtainedID);
  } catch (e) {
    console.log(e);
  }
};
