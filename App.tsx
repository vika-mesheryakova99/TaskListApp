import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';

function App(): JSX.Element {
  const Stack = createStackNavigator();

  const CustomHeaderTitle = ({title}) => {
    return <Text style={styles.screenTitle}>{title}</Text>;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <CustomHeaderTitle title="Task List" />,
            headerStyle: {backgroundColor: 'pink'},
          }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{
            headerTitle: () => <CustomHeaderTitle title="Add New Task" />,
            headerStyle: {backgroundColor: 'pink'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    alignContent: 'center',
  },
});

export default App;
