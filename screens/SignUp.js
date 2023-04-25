import React, { Component, useState, useContext} from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Block, Input, Button, Text } from '../components';
import { theme } from '../constants';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../server/UserContext';


export default function SignUp({ navigation })  {

  const [email, setEmail] = useState('email@email.com');
  const [firstName, setFirstName] = useState('First Name');
  const [lastName, setLastName] = useState('Last Name');
  const [userPassword, setUserPassword] = useState('*********');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSignUp = async () => {
    
      try {
        const url = '/register';
        const response = await api.post(url, { firstName, lastName, email, userPassword });
        const token = response.data.token; // Access the token in the response
        const userId = response.data.userId;
        console.log("userId sign up " + userId);
        const user = {
          userId: userId,
          token: token,
        };
        setUser(user); // Set user state in UserContext




        await AsyncStorage.setItem('jwtToken', token); // Store the token in AsyncStorage

        Alert.alert(
          'Success!',
          'Your account has been created',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('Browse', {userId})
              }
            }
          ],
          { cancelable: false }
        );
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors);
          console.log(error.response.data);

            // Handle the email already in use error
      if (error.response.status === 409) {
        Alert.alert('Error: Email already in use! ', error.response.data.message);
      }

        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };    
    const hasErrors = key => errors && errors.includes && errors.includes(key) ? styles.hasErrors : null;

     return(
      <KeyboardAvoidingView style={styles.signup} behavior={Platform.OS === 'ios' ? 'position' : null} enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">        
        <Block padding={[0, theme.sizes.base * 2]}>
          {/* <Text h1 bold>Sign Up</Text>*/ }
          <Block middle>
          <Text style={styles.label}> Email </Text>
            <Input
              email
              error={hasErrors('email')}
              style={[email == 'email@email.com' ? styles.default : styles.input, hasErrors('email')]}
              defaultValue={email}
              onChangeText={text => setEmail(text)}
              onFocus={() => {
                if (email === 'email@email.com') {
                  setEmail(''); // Update TextInput value to empty string when focused
                }
              }}
            />
            <Text style={styles.label}> First Name </Text>
            <Input
              error={hasErrors('firstName')}
              autoCapitalize="words"
              style={[firstName == 'First Name' ? styles.default : styles.input, hasErrors('firstName')]}
              defaultValue={firstName}
              onChangeText={text => setFirstName(text)}
              onFocus={() => {
                if (firstName === 'First Name') {
                  setFirstName(''); // Update TextInput value to empty string when focused
                }
              }}
            />
            <Text style={styles.label}> Last Name </Text>
            <Input
              error={hasErrors('lastName')}
              autoCapitalize="words"
              style={[lastName == 'Last Name' ? styles.default : styles.input, hasErrors('lastName')]}
              defaultValue={lastName}
              onChangeText={text => setLastName(text)}
              onFocus={() => {
                if (lastName === 'Last Name') {
                  setLastName(''); // Update TextInput value to empty string when focused
                }
              }}
            />
            <Text style={styles.label}> Password </Text>
            <Input
              secure
              error={hasErrors('password')}
              style={[userPassword == '*********' ? styles.default : styles.input, hasErrors('password')]}
              defaultValue={userPassword}
              onChangeText={text => setUserPassword(text)}
              onFocus={() => {
                if (userPassword === '*********') {
                  setUserPassword(''); // Update TextInput value to empty string when focused
                }
              }}
            />
             <Button gradient title="Sign Up" onPress={() => handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Sign Up</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
        </ScrollView>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  default:{
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: '#adb5bd'

  },
  label: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.sizes.base * 2,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})
