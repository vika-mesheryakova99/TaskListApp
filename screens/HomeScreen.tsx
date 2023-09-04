import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import MiniButton from '../components/MiniButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {capitalizeWords} from '../utils/stringUtils';

// WeatherAPI response object
type WeatherResponse = {
  title: string;
  description: string;
  temperature: string;
  location: string;
};

// functional component for screen
const HomeScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [weather, setWeather] = useState<WeatherResponse>({
    title: '',
    description: '',
    temperature: '',
    location: '',
  });

  // refresh data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchWeatherData('Tashkent');

      //AsyncStorage.clear(); // removed ALL
      fetchDataFromAsyncStorage();
    }, []),
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
      const pairs = await AsyncStorage.multiGet(sortedKeys);

      setTasks(pairs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // get weather
  const fetchWeatherData = (city: string) => {
    const apiKey = '165fd282f55a4d169a1bbcd90c571cfe';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.info('Fetching Weather API...');
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not query WeatherAPI: network error.');
        }

        return response.json();
      })
      .then(data => {
        console.info('WeatherAPI response JSON: ', data);

        const weatherResponse: WeatherResponse = {
          title: data.weather[0].main,
          temperature: `${data.main.temp.toFixed(1)} °C`,
          description: data.weather[0].description,
          location: `${data.name}, ${data.sys.country}`,
        };
        setWeather(weatherResponse);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const EmptyListContent = () => {
    return <Text style={styles.noTasksText}>No tasks for today</Text>;
  };

  // render individual task item
  function RenderTaskItem({item}) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.taskContainer}>
          <Text style={styles.task}>{item[1]}</Text>
        </View>
        <MiniButton text=" - " onPress={() => handleRemoveTask(item[0])} />
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
  };

  // clear all tasks from AsyncStorage
  const handleClearAllTasks = async () => {
    await AsyncStorage.clear();
    navigation.navigate('AddTask');
  };

  // clear all tasks from AsyncStorage
  const handleRemoveTask = async (key: string) => {
    console.info('removing task with key: ', key);

    // removing task by its key from db
    await AsyncStorage.removeItem(key);

    // re-render updated task list
    fetchDataFromAsyncStorage();
  };

  // render function
  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        <View style={styles.weatherTextContainer}>
          <Text style={styles.weatherText}>
            {capitalizeWords(weather.description)}
          </Text>
          <Text style={styles.weatherText}>{weather.temperature}</Text>
          <Text style={styles.weatherText}>{weather.location}</Text>
        </View>
        <View>
          {weather.title.toLowerCase() === 'clear' ? (
            <Image
              source={require('../assets/images/sun.png')}
              style={styles.weatherIcon}
            />
          ) : null}
          {weather.title.toLowerCase() === 'clouds' ? (
            <Image
              source={require('../assets/images/clouds.png')}
              style={styles.weatherIcon}
            />
          ) : null}
          {weather.title.toLowerCase() === 'rain' ? (
            <Image
              source={require('../assets/images/rain.png')}
              style={styles.weatherIcon}
            />
          ) : null}
          {weather.title.toLowerCase() === 'snow' ? (
            <Image
              source={require('../assets/images/snow.png')}
              style={styles.weatherIcon}
            />
          ) : null}
          {weather.title.toLowerCase() === 'wind' ? (
            <Image
              source={require('../assets/images/wind.png')}
              style={styles.weatherIcon}
            />
          ) : null}
        </View>
      </View>
      <FlatList
        data={tasks}
        renderItem={({item}) => <RenderTaskItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyListContent}
      />
      <PrimaryButton text="Add Task" onPress={handleAddNewTask} />
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
    justifyContent: 'center',
  },
  task: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noTasksText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  weatherContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  weatherTextContainer: {
    flexDirection: 'column',
    paddingRight: 40,
  },
  weatherText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'black',
  },
  weatherIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
