import React, { useState } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import { Platform } from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login({ navigation }) {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('*********');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

   console.log();
   const handleLogin = async () => {

    const errors = [];
    Keyboard.dismiss();
    setLoading(true);
  
    try {
      const url = '/login';
      const response = await api.post(url, { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('jwtToken', token); // Store the token in AsyncStorage
       //console.log(response.data.token);
       //console.log('Login Response:', response);
     navigation.navigate('Browse')
        
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors);
        console.log(error.response.data);

        const errorSignUp= '{"error":"User not found. Please sign up."}' ;
        const errorLogin= '{"error":"Incorrect password"}' ;

       if(JSON.stringify(error.response.data) === errorSignUp) {

        Alert.alert(
          'Error!',
          'Please Sign Up',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('SignUp')
              }
            }
          ],
          { cancelable: false }
        );
       } else if (JSON.stringify(error.response.data) === errorLogin){
        Alert.alert(
          'Incorrect Password',
          'Please try again',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('Login')
              }
            }
          ],
          { cancelable: false }
        );
       }
        
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };  
  
    const hasErrors = key => errors && errors.includes && errors.includes(key) ? styles.hasErrors : null;

  return (
    <KeyboardAvoidingView style={styles.login} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Block padding={[0, theme.sizes.base * 2]}>
        <Block middle>
          <Text style={styles.label}> Email </Text>
          <Input
            error={hasErrors('email')}
            style={[email == 'test@gmail.com' ? styles.default : styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => {
              if (email === 'test@gmail.com') {
                setEmail(''); // Update TextInput value to empty string when focused
              }
            }}
          />
          <Text style={styles.label}> Password </Text>
          <Input
            secure
            error={hasErrors('password')}
            style={[password == '*********' ? styles.default : styles.input, hasErrors('password')]}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
            onFocus={() => {
              if (password === '*********') {
                setPassword(''); // Update TextInput value to empty string when focused
              }
            }}
            
          />

          <Button gradient onPress={() => handleLogin()}>
            {loading ?
              <ActivityIndicator size="small" color="white" /> :
              <Text bold white center>Login</Text>
            }
          </Button>

          <Button onPress={() => navigation.navigate('Forgot')}>
            <Text gray caption center style={{ textDecorationLine: 'underline' }}>
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    // marginTop: 2,
    // marginBottom: 2,
  },
  default:{
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: '#adb5bd'

  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
});