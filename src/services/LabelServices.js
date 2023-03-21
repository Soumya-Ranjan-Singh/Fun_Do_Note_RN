import firestore from '@react-native-firebase/firestore';

export const addLabel = async (label, user) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('LabelData')
      .add({
        label: label,
      });

    console.log('Level added!');
  } catch (e) {
    console.log(e);
  }
};

export const fetchLabelData = async user => {
  const labelsArray = [];
  try {
    const querySnapshot = await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('LabelData')
      .get();
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      data.id = documentSnapshot.id;
      labelsArray.push(data);
    });
    return labelsArray;
  } catch (e) {
    console.log(e);
  }
};

export const updateLabel = async (labelName, user, labelId) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('LabelData')
      .doc(labelId)
      .update({
        label: labelName,
      });

    console.log('Label Updated!');
  } catch (e) {
    console.log(e);
  }
};

export const deleteLabel = async (user, labelId) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('LabelData')
      .doc(labelId)
      .delete();

    console.log('Label Deleted!');
  } catch (e) {
    console.log(e);
  }
};

export const deleteAddedLabels = async (user, labelId, obtainedID) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('LabelDataWithNote')
      .doc(labelId)
      .collection('NoteId')
      .doc(obtainedID)
      .delete();

    console.log('Levels from note deleted!');
  } catch (e) {
    console.log(e);
  }
};

export const addLabelsToNotes = async (user, labelId, noteId) => {
  try {
    await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('LabelDataWithNote')
      .doc(labelId)
      .collection('NoteId')
      .doc(noteId)
      .set({noteId: noteId});

    console.log('Added levels to note!');
  } catch (e) {
    console.log(e);
  }
};

export const fetchNotesWithLabels = async (user, labelId) => {
  const notesWithLabels = [];
  try {
    const querySnapshot = await firestore()
      .collection('UserDetails')
      .doc(user.uid)
      .collection('LabelDataWithNote')
      .doc(labelId)
      .collection('NoteId')
      .get();

    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      data.id = documentSnapshot.id;
      notesWithLabels.push(data);
    });
    return notesWithLabels;
  } catch (e) {
    console.log(e);
  }
};
