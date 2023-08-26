import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';

// functional component for screen
const HomeScreen = ({ navigation }) => {

  // button tap handler
  const handleButtonPress = () => {
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