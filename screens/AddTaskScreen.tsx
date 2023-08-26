import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// functional component for screen
const AddTaskScreen = ({ navigation }) => {

  // render function
  return (
    <View style={styles.container}>
      {/* <TextInput style={{backgroundColor: 'white', width: 200, height: 50}}></TextInput> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});

export default AddTaskScreen;