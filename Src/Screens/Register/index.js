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
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      c_password: ''
    };
  }
  render() {
    return (
      <>
        <SafeAreaView style={Styles.safeViewStyle}>
          <View style={Styles.mainContainer}>
            <Text style={Styles.headerText}>Food Manager App</Text>
            <Text style={Styles.headerText1}>Register YourSelf</Text>

            <View style={Styles.mainInputWrapper}>
              <Text style={Styles.inputText}>User name</Text>
              <TextInput
                style={Styles.input}
                value={this.state.userName}
                onChangeText={text => this.setState({ userName: text })}
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

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('NewEntry') }}>
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