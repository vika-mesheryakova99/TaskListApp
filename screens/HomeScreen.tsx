import React, {useState, useCallback} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import MiniButton from '../components/MiniButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// functional component for screen
const HomeScreen = ({ navigation }) => {

  const [tasks, setTasks] = useState([]);

  // refresh data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      //AsyncStorage.clear(); // removed ALL
      fetchDataFromAsyncStorage();
    }, [])
  );

  // read from AsyncStorage db
  const fetchDataFromAsyncStorage = async () => {
    try {
      // ["1693202679932", "1693203480391"]
      const readyOnlyKeys = await AsyncStorage.getAllKeys(); // time-stamps

      // copying read-only array into mutable array
      // sorting array and reversing its order
      const sortedKeys = [...readyOnlyKeys].sort().reverse();

      // [["1693202679932", "T1"], ["1693203480391", "T2"]]
      const pairs = await AsyncStorage.multiGet(sortedKeys)

      // extracting 'titles' from pairs of key-value
      // ["T1", "T2"]
      const titles = pairs.map(pair => pair[1]);
      setTasks(titles);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // render individual task item
  function RenderTaskItem({ item }) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.taskContainer}>
          <Text style={styles.task}>{item}</Text>
        </View>
        <MiniButton text=' - ' onPress={() => handleRemoveTask(item)} />
      </View>
    );
  }


  // **************************************
  // *********** event handlers ***********
  // **************************************
  
  // add new task button handler
  const handleAddNewTask = async () => {
    console.log('>>> navigate Add Task screen');
    navigation.navigate('AddTask');
  }

  // clear all tasks from AsyncStorage
  const handleClearAllTasks = async () => {
    await AsyncStorage.clear();
    navigation.navigate('AddTask');
  }

  // clear all tasks from AsyncStorage
  const handleRemoveTask = async (key: string) => {
    console.info('removing task with key: ', key)

    // removing task by its key from db
    await AsyncStorage.removeItem(key);

    // re-render updated task list
    fetchDataFromAsyncStorage();
  }

  // render function
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <RenderTaskItem  item={item} /> }
        keyExtractor={(item, index) => index.toString()}
      />
      <PrimaryButton text='Add Task' onPress={handleAddNewTask} />
      {/* <SecondaryButton text='Clear' onPress={handleClearAllTasks} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: 'pink',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  taskContainer: {
    backgroundColor: '#FFEFDF',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    minWidth: 320,
    borderRadius: 8,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center'
  },
  task: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default HomeScreen;