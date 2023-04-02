
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('test');
  const [password, setPassword] = useState('test');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const errors = [];

    Keyboard.dismiss();
    setLoading(true);

    axios
    // .post('http://localhost:3000/login', { email, password })
    // .then(response => {
    //   console.log(email, password);
    //   if (email === response.data.email) {
    //     if (password !== response.data.password) {
    //       console.log("Incorrect Password")
    //     }
    //     else {
    //       setLoading(false);
    //       navigation.navigate("Browse");
    //     }
    //   }
    //   else console.log("Incorrect Email");
    // })
    // .catch(error => {
    //   setLoading(false);
    //   setErrors(['Invalid email or password']);
    // });

    .post('http://localhost:3000/login', { email, password })
    .then(response => {
      setLoading(false);
      console.log(response.data);

      if (response.data.success) {
        navigation.navigate('Browse');
      } else {
        setErrors(['Invalid email or password']);
      }
    })
    .catch(error => {
      setLoading(false);
      setErrors(['Invalid email or password']);
    });
  }
    //   if (!email) {
    //     errors.push('email');
    //   }
    //   if (!password) {
    //     errors.push('password');
    //   }

    //   setErrors(errors);
    //   setLoading(false);

    //   if (!errors.length) {
    //     navigation.navigate("Browse");
    //   }
    // }

  const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Block middle>
          <Input
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={text => setEmail(text)}
          />
          <Input
            secure
            label="Password"
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
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
