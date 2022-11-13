import React, { Component, useRef } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@MyApp:key';
const key1 = "@MyApp:key1";

export default class App extends Component {
  state = {
    text: '',
    storedBMI: '',
    weight: '',
    buttonPushed: false,
    message: ''
  };

  constructor(props) {
    super(props)
    this.onLoad();
  }

  
  

  onLoad = async () => {
    try {
      const storedHeight = await AsyncStorage.getItem(key);
      const storedWeight = await AsyncStorage.getItem(key1);
      const storedBMI =   ((parseInt(storedWeight)) / (parseInt(storedHeight) * parseInt(storedHeight)) * 703).toFixed(1);
      this.setState({text: storedHeight});
      //const displayBMI = "Body Mass Index is " + this.state.storedBMI;
      const message = "Body Mass Index is ";
      this.setState({message: message});
      this.setState({ storedBMI });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  }
 
  handleHeight = (text) => {
    this.setState({ text: text });
  }
  
  
 handleWeight = (text) => {
  this.setState({ weight: text});
 }

 buttonPushedHandler = () => {
  this.setState({ buttonPushed: true });
}

  onSave = async () => {
    const { text } = this.state;
    const { weight} = this.state;

    

    try { 
      await AsyncStorage.setItem(key, text);
      await AsyncStorage.setItem(key1, weight);
      
      
    } catch (error) {
      
    }
  }

  
  render() {
    const { storedBMI, text, weight, buttonPushed, message } = this.state;
   


    return (
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>
       
        <View>
          <TextInput
            style={styles.input}
            onChangeText={this.handleWeight}
            value={weight}
            placeholder="Weight in Pounds"
          />
          <TextInput
            style={styles.input2}
            onChangeText={this.handleHeight}
            value={text}
            defaultValue={text}
            placeholder="Height in Inches"
          />
          <TouchableOpacity onPress={() => {
            this.buttonPushedHandler();
            this.onSave();
            this.onLoad();
            
            
          }} style={styles.button}>
            <Text style={styles.buttonText}>Compute BMI</Text>
          </TouchableOpacity>
          <Text style={styles.preview}>{message}{storedBMI}</Text>
          <Text style={styles.text1}>Assessing Your BMI</Text>
          <Text style={styles.text2}>Underweight: less than 18.5 {"\n"}
                Healthy: 18.5 to 24.9 {"\n"}
                Overweight: 25.0 to 29.9 {"\n"}
                Obese: 30.0 or higher {"\n"}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  preview: {
    backgroundColor: "",
    width: 300,
    height: 35,
    color: '#333',
    marginBottom: 50,
    fontSize: 28,
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 10,
    marginBottom: 10,
    position: "absolute",
    top: -200,
    fontSize: 24,
  },
  input2: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 10,
    marginBottom: 10,
    position: "absolute",
    top: -150,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#34495e',
    width: 300,
    height:40,
    borderRadius: 3,
    
    position: "absolute",
    top: -100,
  
  },
  title: {
    fontSize: 28,
    position: "absolute",
    top: 50,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    textAlign: 'center',
    paddingTop: 4,
  },
  text1: 
  {
    fontSize: 20,
    position: "absolute",
    top: 75,
  },
  text2: 
  {
    fontSize: 20,
    position: "absolute",
    top: 98,
    right: 30,
  }
});