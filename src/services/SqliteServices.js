import {Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MathEqnDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export const createDatabase = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_note'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length === 0) {
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_note(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id VARCHAR(25), note_id VARCHAR(25), title VARCHAR(50), note VARCHAR(255))',
            [],
            (_tx, _res) => {
              console.log('Table created !');
            },
            error => {
              console.log('Error on creating table', error.message);
            },
          );
        }
      },
    );
  });
};

export const addNotes = async (user_id, note_id, title, note) => {
  console.log(user_id, note_id, title, note);

  if (!user_id) {
    Alert.alert('Please fill UserID');
    return;
  }
  if (!note_id) {
    Alert.alert('Please fill NoteID');
    return;
  }
  if (!title) {
    Alert.alert('Please fill Note Title');
    return;
  }
  if (!note) {
    Alert.alert('Please fill Note Description');
    return;
  }

  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_note (user_id, note_id, title, note) VALUES (?,?,?,?)',
      [user_id, note_id, title, note],
      (_tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('Note added Successfully');
        } else {
          console.log('Note added Error');
        }
      },
    );
  });
};

export const updateNotes = async (user_id, note_id, title, note) => {
  console.log(user_id, note_id, title, note);

  if (!user_id) {
    Alert.alert('Please fill UserID');
    return;
  }
  if (!note_id) {
    Alert.alert('Please fill NoteID');
    return;
  }
  if (!title) {
    Alert.alert('Please fill Note Title');
    return;
  }
  if (!note) {
    Alert.alert('Please fill Note Description');
    return;
  }

  db.transaction(tx => {
    tx.executeSql(
      'UPDATE table_note set user_id=?, title=?, note=? where note_id=?',
      [user_id, title, note, note_id],
      (_tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('Note updated Successfully');
        } else {
          console.log('Note updated Error');
        }
      },
    );
  });
};

export const deleteNotes = async note_id => {
  console.log(note_id);
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM  table_note where note_id=?',
      [note_id],
      (_tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('Note deleted Successfully');
        } else {
          console.log('Note deleted Error');
        }
      },
    );
  });
};
