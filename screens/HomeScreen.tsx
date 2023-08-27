import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// functional component for screen
const HomeScreen = ({ navigation }) => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('<<< Home screen before loading >>>');
    fetchDataFromAsyncStorage();
  }, [tasks]); //TODO: check re-rendering every second

  // read from AsyncStorage db
  const fetchDataFromAsyncStorage = async () => {
    try {
      //await AsyncStorage.clear();
      console.log(await AsyncStorage.getAllKeys());
      const storedData = await AsyncStorage.getAllKeys();
      if (storedData !== null) {
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
  
  // button tap handler
  const handleButtonPress = async () => {

    console.log('>>> navigate Add Task screen');
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
      <CustomButton text='Add Task' onPress={handleButtonPress} />
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