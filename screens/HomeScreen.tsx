import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// functional component for screen
const HomeScreen = ({ navigation }) => {

  //TODO: add useEffect() hook

  // read from AsyncStorage
  //const items = await AsyncStorage.getAllKeys();
  //console.log(items);

  // button tap handler
  const handleButtonPress = async () => {

    console.log('>>> navigate Add Task screen');
    navigation.navigate('Add Task');
  }

  // render function
  return (
    <View style={styles.container}>
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
});

export default HomeScreen;