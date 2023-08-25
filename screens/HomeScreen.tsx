import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {

  return (
    <View>
      <Text>Task List</Text>
      <Button
        title="Create Task"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    someStyle: {
        backgroundColor: 'blue', // Change the background color
        color: 'white', // Change the text color
        fontSize: 18, // Change the font size
        padding: 10, // Add padding
        borderRadius: 5, // Apply border radius
    },
});

export default HomeScreen;