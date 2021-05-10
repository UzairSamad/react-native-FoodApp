/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  TextInput
} from 'react-native';
import Styles from './Styles';
import Images from '../../Styles/Images';
import { createResource } from '../../WebApiServices/SimpleApiCalls'
import { user_register } from '../../WebApiServices/WebServices'
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      c_password: ''
    };
  }
  render() {
    const { email, password, c_password } = this.state

    const handleRegister = async () => {
      if (email == '' || password == '') {
        alert('Email and password is required')
      } else if (password !== c_password) {
        alert('Password and Confirm Password should be same')
      }
      else {
        let data = { email, password };
        try {
          let res = await createResource(user_register, data);
          console.log(res, 'resresres');
          this.props.navigation.navigate('Login');
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
            <Text style={Styles.headerText1}>Register YourSelf</Text>

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

              <Text style={Styles.inputText1}>Confirm Password</Text>
              <TextInput
                style={Styles.input}
                value={this.state.c_password}
                onChangeText={text => this.setState({ c_password: text })}
              />

              <TouchableOpacity onPress={() => { handleRegister() }}>
                <View style={Styles.button}>
                  <Text style={Styles.buttonText}>Submit</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                <Text style={Styles.buttonText1}>Existing User?</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default Register;