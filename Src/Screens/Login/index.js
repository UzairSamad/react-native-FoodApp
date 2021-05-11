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
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      userInfo: ""
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      androidClientId: '672338712989-h2s9ncdd3rbdrlud9ph4q8u1mq20nn63.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });

  }

  getInfo = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          // this.setState({ userInfo: user });
          console.log('resulttttttttttttttt:', user);
          this.props.navigation.navigate('NewEntry');

        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  }

  loginWithFacebook = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    console.log(result, "RESSSSSSSSSSSSSSSS");
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    this.getInfo(data.accessToken)
    console.log(data, "DAAAAAAAAAAAAAAAAAAa");
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  }

  loginWithGmail = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, "USERRRRRRRRRRRRRRRRRRRRR");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error,"ERRRRRRRRRRRRRRRRRRRRRRR");
        alert("other error")
      }
    }

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
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <TouchableOpacity
                onPress={this.loginWithFacebook}
                style={{ backgroundColor: "#5890FF", width: 250, borderRadius: 5, paddingHorizontal: 30, paddingVertical: 15 }}>
                <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>Login With Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.loginWithGmail}
                style={{ marginTop: 30, width: 250, backgroundColor: "#4285f4", borderRadius: 5, paddingHorizontal: 30, paddingVertical: 15 }}>
                <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>Login With Gmail</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default Login;