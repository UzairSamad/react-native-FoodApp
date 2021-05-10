/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Styles from './Styles';
import { createResource } from '../../WebApiServices/SimpleApiCalls'
import { user_login } from '../../WebApiServices/WebServices'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
    const { email, password } = this.state

    const handleLogin = async () => {
      let data = { email, password }
      if (email === '' || password === '') {
        alert('Email and password is required');
      } else {
        try {
          let res = await createResource(user_login, data);
          console.log(res, 'resresres');
          this.props.navigation.navigate('NewEntry');
        } catch (error) {
          alert(error);
        }
      }

    }
    return (
      <>
        <SafeAreaView style={Styles.safeViewStyle}>
          <View style={Styles.mainContainer}>
            <Text style={Styles.headerText}>Food Manager App</Text>
            <Text style={Styles.headerText1}>Login Page</Text>

            <View style={Styles.mainInputWrapper}>
              <Text style={Styles.inputText}>Email</Text>
              <TextInput
                style={Styles.input}
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />

              <Text style={Styles.inputText1}>Password</Text>
              <TextInput
                style={Styles.input}
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <TouchableOpacity onPress={() => handleLogin()}>
                <View style={Styles.button}>
                  <Text style={Styles.buttonText}>Log In</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                <Text style={Styles.buttonText1}>New User Click Here</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default Login;