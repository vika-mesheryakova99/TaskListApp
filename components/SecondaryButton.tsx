import { StyleSheet, Text, TouchableOpacity } from "react-native";


const CustomButton = ({text, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};
  
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#CAEDFF',
        padding: 16,
        margin: 10,
        borderRadius: 30,
        minWidth: 200,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
      },
      buttonText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold'
      },
});
  
  export default CustomButton;