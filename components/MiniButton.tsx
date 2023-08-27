import { StyleSheet, Text, TouchableOpacity } from "react-native";


const MiniButton = ({text, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};
  
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        padding: 10,
        margin: 10,
        borderRadius: 30,
        minWidth: 50,
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
      },
});
  
  export default MiniButton;