import firestore from '@react-native-firebase/firestore';

export const addNote = async (user, noteID, newNoteData) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('Notes')
      .doc(noteID)
      .set({
        ...newNoteData,
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
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      data.id = documentSnapshot.id;
      array.push(data);
    });

    console.log('Data fetched!');
    return array;
  } catch (e) {
    console.log(e);
  }
};

export const updateNoteData = async (user, obtainedID, newNoteData) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('Notes')
      .doc(obtainedID)
      .update({
        ...newNoteData,
      });

    console.log('Data updated!');
  } catch (e) {
    console.log(e);
  }
};

export const deleteNoteData = async (user, obtainedID) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('Notes')
      .doc(obtainedID)
      .delete();

    console.log('Data Deleted!');
  } catch (e) {
    console.log(e);
  }
};
