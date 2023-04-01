// import React, { Component, useState} from 'react'
// import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'

// import { Button, Block, Input, Text } from '../components';
// import { theme } from '../constants';



// export default function Login({ navigation }) {

//     // state = {
//     //     email: VALID_EMAIL,
//     //     password: VALID_PASSWORD,
//     //     errors: [],
//     //     loading: false,
//     // }
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const handleLogin = () => {
//         // const { navigation } = this.props;
//         // const { email, password } = this.state;
//         // const errors = [];
//         const errors = [];

//         Keyboard.dismiss();
//         setLoading(true);
//         // this.setState({ loading: true });

//         // check with backend API or with some static data
//         if (email !== VALID_EMAIL) {
//             errors.push('email');
//         }
//         if (password !== VALID_PASSWORD) {
//             errors.push('password');
//         }

//         //this.setState({ errors, loading: false });
//         setErrors(errors);
//         setLoading(false);

//         if (!errors.length) {
//             navigation.navigate("Browse");
//         }
//     }
//     const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
//     // render() {
//     //     const { navigation } = this.props;
//     //     const { loading, errors } = this.state;
//     //     const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

//     return (
//         <KeyboardAvoidingView style={styles.login} behavior="padding">
//             <Block padding={[0, theme.sizes.base * 2]}>
//                 <Block middle>
//                     <Input
//                         label="Email"
//                         error={hasErrors('email')}
//                         style={[styles.input, hasErrors('email')]}
//                         defaultValue={this.state.email}
//                         onChangeText={text => setEmail(text)}
//                     />
//                     <Input
//                         secure
//                         label="Password"
//                         error={hasErrors('password')}
//                         style={[styles.input, hasErrors('password')]}
//                         defaultValue={this.state.password}
//                         onChangeText={text => setPassword(text)}
//                     />

//                     <Button gradient onPress={() => this.handleLogin()}>
//                         {loading ?
//                             <ActivityIndicator size="small" color="white" /> :
//                             <Text bold white center>Login</Text>
//                         }
//                     </Button>

//                     <Button onPress={() => navigation.navigate('Forgot')}>
//                         <Text gray caption center style={{ textDecorationLine: 'underline' }}>
//                             Forgot your password?
//                         </Text>
//                     </Button>
//                 </Block>
//             </Block>
//         </KeyboardAvoidingView>
//     );
// }




// const styles = StyleSheet.create({
//     login: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     input: {
//         borderRadius: 0,
//         borderWidth: 0,
//         borderBottomColor: theme.colors.gray2,
//         borderBottomWidth: StyleSheet.hairlineWidth,
//     },
//     hasErrors: {
//         borderBottomColor: theme.colors.accent,
//     }
// })




import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const errors = [];

    Keyboard.dismiss();
    setLoading(true);

    // check with backend API or with some static data
    if (!email) {
      errors.push('email');
    }
    if (!password) {
      errors.push('password');
    }

    setErrors(errors);
    setLoading(false);

    if (!errors.length) {
      navigation.navigate("Browse");
    }
  }

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
