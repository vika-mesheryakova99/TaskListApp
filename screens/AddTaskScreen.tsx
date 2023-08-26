import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';

// functional component for screen
const AddTaskScreen = ({ navigation }) => {

  // button tap handler
  const handleButtonPress = () => {
    //TODO: add save to db/store
    navigation.navigate('Task List');
  }

  // render function
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        placeholderTextColor="#999999"
        keyboardType="default"
      />
      <CustomButton text='Save' onPress={handleButtonPress} />
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