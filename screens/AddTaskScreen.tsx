import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// functional component for screen
const AddTaskScreen = ({ navigation }) => {

  // state to store input texts: getter/setter
  // getter() --> return; setter(setValue) --> void
  const [inputText, setInputText] = useState('');


  // **************************************
  // *********** event handlers ***********
  // **************************************

  const handleUserInput = (text: string) => {
    // update inputText state as user types
    setInputText(text);
  };

  // 'Save' button tap
  const handleSaveNewTask = async () => {
    if (inputText === '') {
      return;
    }

    //TODO: change 'key' to unique integer value
    await AsyncStorage.setItem(inputText, inputText);

    navigation.navigate('Home');
  }

  // render function
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        placeholderTextColor="#999999"
        keyboardType="default"
        onChangeText={handleUserInput}
      />
      <CustomButton text='Save' onPress={handleSaveNewTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  input: {
    height: 50,
    width: 400,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 10,
    fontSize: 24,
    color: '#000000',
    backgroundColor: 'white',
    marginTop: 50,
  },
});

export default AddTaskScreen; 