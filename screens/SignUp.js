import React, { Component, useState} from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

import axios from 'axios';
const API_URL = 'http://localhost:3000';

export default class SignUp extends Component {

  // const [email, setEmail] = useState('');
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  // const [loading, setLoading] = useState(false);

  handleSignUp() {
    
    const errors = [];
    
    Keyboard.dismiss();
    setLoading(true);

    // check with backend API or with some static data
    if (!email) errors.push('email');
    if (!username) errors.push('username');
    if (!password) errors.push('password');

    setErrors(errors);
    setLoading(false);

    // if (!errors.length) {
    //   Alert.alert(
    //     'Success!',
    //     'Your account has been created',
    //     [
    //       {
    //         text: 'Continue', onPress: () => {
    //           navigation.navigate('Browse')
    //         }
    //       }
    //     ],
    //     { cancelable: false }
    //   )
    // }

    axios.post(`${API_URL}/register`, { email, password })
    .then(response => {
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
      )
    })
    .catch(error => {
      console.log(error.response.data);
    });

  }


  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Sign Up</Text>
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Username"
              error={hasErrors('username')}
              style={[styles.input, hasErrors('username')]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
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
