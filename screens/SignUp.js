import React, { Component, useState} from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Block, Input, Button, Text } from '../components';
import { theme } from '../constants';
import axios from 'axios';
// const API_URL = 'http://localhost:3000';
    
export default function SignUp({ navigation })  {

  const [email, setEmail] = useState('Email');
  const [firstName, setFirstName] = useState('First Name');
  const [lastName, setLastName] = useState('Last Name');
  const [password, setPassword] = useState('Password');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    
      // check with backend API or with some static data
      // if (!email) errors.push('email');
      // if (!firstName) errors.push('firstName');
      // if (!lastName) errors.push('lastName');
      // if (!password) errors.push('password');
      // setErrors(errors);
      // setLoading(false);
    
      try {
        const response = await axios.post(`http://192.168.48.26:3000/register`, { firstName, lastName, email, password });
        console.log(response.data.token);
        Alert.alert(
          'Success!',
          'Your account has been created',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('Browse')
              }
            }
          ],
          { cancelable: false }
        );
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors);
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };    
    const hasErrors = key => errors && errors.includes && errors.includes(key) ? styles.hasErrors : null;

     return(
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          {/* <Text h1 bold>Sign Up</Text>*/ }
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={email}
              onChangeText={text => setEmail(text)}
            />
            <Input
              label="First Name"
              error={hasErrors('firstName')}
              style={[styles.input, hasErrors('firstName')]}
              defaultValue={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <Input
              label="Last Name"
              error={hasErrors('lastName')}
              style={[styles.input, hasErrors('lastName')]}
              defaultValue={lastName}
              onChangeText={text => setLastName(text)}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={password}
              onChangeText={text => setPassword(text)}
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
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
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
})
