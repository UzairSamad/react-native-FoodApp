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
  TextInput,
  ActivityIndicator
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
      c_password: '',
      phoneNumber: '',
      name: '',
      isLoading: false
    };
  }
  render() {
    const { email, password, c_password, name, phoneNumber } = this.state

    const handleRegister = async () => {
      if (email == '' || password == '') {
        alert('Email and password is required')
      } else if (password !== c_password) {
        alert('Password and Confirm Password should be same')
      }
      else {
        this.setState({ ...this.state, isLoading: true })
        let data = { email, password, userName: name };
        try {
          let res = await createResource(user_register, data);
          console.log(res, 'resresres');
          this.setState({ ...this.state, isLoading: false })
          alert("Registered Successfully")
          this.props.navigation.navigate('Login');
        } catch (error) {
          this.setState({ ...this.state, isLoading: false })

          alert(error);
        }
      }

    }
    return (
      <>
        <SafeAreaView style={Styles.safeViewStyle}>
          <ScrollView style={Styles.mainContainer}>
            <Text style={Styles.headerText}>Food Manager App</Text>
            <Text style={Styles.headerText1}>Register YourSelf</Text>

            <View style={Styles.mainInputWrapper}>
              <Text style={Styles.inputText}>Name</Text>
              <TextInput
                style={Styles.input}
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
              />
              <Text style={Styles.inputText1}>Email</Text>
              <TextInput
                style={Styles.input}
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />

              <Text style={Styles.inputText1}>Phone Number</Text>
              <TextInput
                style={Styles.input}
                value={this.state.phoneNumber}
                onChangeText={text => this.setState({ phoneNumber: text })}
              />

              <Text style={Styles.inputText1}>Password</Text>
              <TextInput
                style={Styles.input}
                value={this.state.password}
                secureTextEntry={true}

                onChangeText={text => this.setState({ password: text })}
              />

              <Text style={Styles.inputText1}>Confirm Password</Text>
              <TextInput
                style={Styles.input}
                value={this.state.c_password}
                secureTextEntry={true}
                onChangeText={text => this.setState({ c_password: text })}
              />

              {!this.state.isLoading ? <TouchableOpacity onPress={() => { handleRegister() }}>
                <View style={Styles.button}>
                  <Text style={Styles.buttonText}>Submit</Text>
                </View>
              </TouchableOpacity>

                :
                <View style={Styles.loader}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              }

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                <Text style={Styles.buttonText1}>Existing User?</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
export default Register;