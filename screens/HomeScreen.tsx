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
  }, []);

  // read from AsyncStorage db
  const fetchDataFromAsyncStorage = async () => {
    try {
      const storedData = await AsyncStorage.getAllKeys();
      if (storedData !== null) {
        setTasks(storedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


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
        renderItem={({ item }) => <Text style={styles.task}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomButton text='Add Task' onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: 'pink',
  },
  task: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default HomeScreen;