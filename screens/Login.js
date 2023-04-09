
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('*********');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleLogin = () => {
  //   const errors = [];
  
    // Keyboard.dismiss();
    // setLoading(true);
  
    // const handleLogin = () => {
    //   const errors = [];
    
    //   Keyboard.dismiss();
    //   setLoading(true);
    
  //     axios
  //     .post('http://192.168.48.26:3000/login', { email, password })
  //     .then(response => {
  //       console.log(email, password);
  //       if (email == response.data.email) {
  //         if (password != response.data.password) {
  //           console.log("Incorrect Password")
  //           setLoading(false);
  //         }
  //         else {
  //           setLoading(false);
  //           navigation.navigate("Browse");
  //         }
  //       }
  //       else console.log("Incorrect Email");
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       setErrors(['Invalid email or password']);
  //     });
    //}
    // }



  const handleLogin = () => {
    const errors = [];

    Keyboard.dismiss();
    setLoading(true);

    axios
    .post('http://192.168.48.26:3000/login', { email, password })
    .then(response => {
      console.log("******************")
      console.log(email, password);
      console.log("hello");
      if (email.equals(response.data.email)) {
        if (!password.equals(response.data.password)) {
          console.log("Incorrect Password");
          setLoading(false);
        }
        else {
          console.log("success");
          setLoading(false);
          navigation.navigate("Browse");
        }
      }
      
      else console.log("Incorrect Email");
    })
    .catch(error => {
      setLoading(false);
      setErrors(['Invalid email or password']);
      console.log("Invalid email or password")
      console.log(email);
      console.log(password);
      console.log(response.data.email);
      console.log(response.data.password);

    });
  }

  const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Block middle>
          <Text style={styles.label}> Email </Text>
          <Input
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            placeholder={email}
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.label}> Password </Text>
          <Input
            secure
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            placeholder={password}
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
  label: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    // marginTop: 2,
    // marginBottom: 2,
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



// import React, { useState } from 'react';
// import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
// import { Button, Block, Input, Text } from '../components';
// import { theme } from '../constants';

// export default function Login({ navigation }) {
//   const [email, setEmail] = useState('email');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     const errors = [];

//     Keyboard.dismiss();
//     setLoading(true);

//     // check with backend API or with some static data
//     if (!email) {
//       errors.push('email');
//     }
//     if (!password) {
//       errors.push('password');
//     }

//     setErrors(errors);
//     setLoading(false);

//     if (!errors.length) {
//       navigation.navigate("Browse");
//     }
//   }

//   const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

//   return (
//     <KeyboardAvoidingView style={styles.login} behavior="padding">
//       <Block padding={[0, theme.sizes.base * 2]}>
//         <Block middle>
//           <Input
//             label="Email"
//             error={hasErrors('email')}
//             style={[styles.input, hasErrors('email')]}
//             defaultValue={email}
//             onChangeText={text => setEmail(text)}
//           />
//           <Input
//             secure
//             label="Password"
//             error={hasErrors('password')}
//             style={[styles.input, hasErrors('password')]}
//             defaultValue={password}
//             onChangeText={text => setPassword(text)}
//           />

//           <Button gradient onPress={() => handleLogin()}>
//             {loading ?
//               <ActivityIndicator size="small" color="white" /> :
//               <Text bold white center>Login</Text>
//             }
//           </Button>

//           <Button onPress={() => navigation.navigate('Forgot')}>
//             <Text gray caption center style={{ textDecorationLine: 'underline' }}>
//               Forgot your password?
//             </Text>
//           </Button>
//         </Block>
//       </Block>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   login: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   input: {
//     borderRadius: 0,
//     borderWidth: 0,
//     borderBottomColor: theme.colors.gray2,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },
//   hasErrors: {
//     borderBottomColor: theme.colors.accent,
//   }
// });