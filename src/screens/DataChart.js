import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {fetchNoteData} from '../services/NoteServices';
import {AuthContext} from '../navigation/AuthProvider';
import pageStyles from '../utility/global.style';

const DataChart = ({navigation}) => {
  const [chartData, setChartData] = useState([]);
  const [trashData, setTrashData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
  const [pinnedData, setPinnedData] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const totalNotes = chartData.length;
  const trashNotes = trashData.length;
  const archiveNotes = archiveData.length;
  const pinnedNotes = pinnedData.length;
  console.log('length', totalNotes, trashNotes, archiveNotes, pinnedNotes);

  const array = [
    {
      name: 'Pinned Notes',
      count: pinnedNotes,
      color: 'yellow',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'Archived Notes',
      count: archiveNotes,
      color: 'green',
      legendFontColor: 'white',
      legendFontSize: 15,
    },

    {
      name: 'Trash Notes',
      count: trashNotes,
      color: 'purple',
      legendFontColor: 'white',
      legendFontSize: 15,
    },

    {
      name: 'Total Notes',
      count: totalNotes,
      color: 'navy',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const {user} = useContext(AuthContext);

  const getAllNotes = async () => {
    const notes = await fetchNoteData(user);
    let pinned = [];
    let archive = [];
    let trash = [];
    notes.forEach(element => {
      if (element.pinned) {
        pinned.push(element);
      } else if (element.archive) {
        archive.push(element);
      } else if (element.trash) {
        trash.push(element);
      }
    });
    setChartData(notes);
    setPinnedData(pinned);
    setArchiveData(archive);
    setTrashData(trash);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllNotes();
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  return (
    <View style={pageStyles.container}>
      <View style={styles.noteContainer}>
        <View style={styles.textView}>
          <Text style={styles.txt}>Notes Data</Text>
        </View>
        <PieChart
          data={array}
          width={screenWidth}
          height={230}
          chartConfig={chartConfig}
          accessor={'count'}
          backgroundColor={'transparent'}
          center={[10, 0]}
          absolute
        />
      </View>
    </View>
  );
};
export default DataChart;

const styles = StyleSheet.create({
  noteContainer: {
    marginTop: 50,
  },
  textView: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 5,
  },
  txt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
});
