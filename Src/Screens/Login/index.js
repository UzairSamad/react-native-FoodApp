/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
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


GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '511904394775-amnbvjg82i1cn4egofefdkh41neso1dv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      userInfo: "",
      isLoading: false

    };
  }

  componentDidMount() {


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
          // console.log('login info has error: ' + error);
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
    // alert(JSON.stringify(data.accessToken))
    // this.getInfo(data.accessToken)
    this.props.navigation.navigate('NewEntry');
    console.log(data, "DAAAAAAAAAAAAAAAAAAa");
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  }

  loginWithGmail = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // console.log(error, "OTHER ERRRRRRRRRRRRRRRRRR");
        // alert(JSON.stringify(error))
        // some other error happened
      }
    }

  }

  render() {
    const { email, password } = this.state

    const handleLogin = async () => {
      // this.props.navigation.navigate('NewEntry');
      let data = { email, password }
      if (email === '' || password === '') {
        alert('Email and password is required');
      }

      else {
        this.setState({ ...this.state, isLoading: true })
        try {
          let res = await createResource(user_login, data);
          console.log(res, 'resresres');
          this.props.navigation.navigate('NewEntry');
          this.setState({ ...this.state, isLoading: false })
        } catch (error) {
          alert(error.response.data.message);
          this.setState({ ...this.state, isLoading: false })

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
                secureTextEntry={true}
              />

              {!this.state.isLoading ?
                <TouchableOpacity onPress={() => handleLogin()}>
                  <View style={Styles.button}>
                    <Text style={Styles.buttonText}>Log In</Text>
                  </View>
                </TouchableOpacity>
                :
                <View style={Styles.loader}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              }

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

            </View>

          </View>
        </SafeAreaView>
      </>
    );
  }
}
export default Login;