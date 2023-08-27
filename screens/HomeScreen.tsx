import React, {useState, useCallback} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// functional component for screen
const HomeScreen = ({ navigation }) => {

  const [tasks, setTasks] = useState([]);

  // refresh data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchDataFromAsyncStorage();
    }, [])
  );

  // read from AsyncStorage db
  const fetchDataFromAsyncStorage = async () => {
    try {
      //console.log(await AsyncStorage.getAllKeys());
      const storedData = await AsyncStorage.getAllKeys();
      if (storedData !== null) {
        console.info(storedData);
        setTasks(storedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // render individual task item
  function RenderTaskItem({ item }) {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.task}>{item}</Text>
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

  // render function
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <RenderTaskItem  item={item} /> }
        keyExtractor={(item, index) => index.toString()}
      />
      <PrimaryButton text='Add Task' onPress={handleAddNewTask} />
      <SecondaryButton text='Clear' onPress={handleClearAllTasks} />
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
  taskContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    minWidth: 350,
    borderRadius: 8,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //elevation: 5,
  },
  task: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default HomeScreen;