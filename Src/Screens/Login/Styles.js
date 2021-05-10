import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Styles/Colors';
const widthScreen = Dimensions.get('window').width;
const styles = StyleSheet.create({

  safeViewStyle: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  mainContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  headerText: {
    marginTop: '20%',
    fontSize: 30,
    textAlign: "center",
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  headerText1: {
    marginTop: '15%',
    fontSize: 22,
    textAlign: "center",
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
  },
  mainInputWrapper: {
    marginTop: '7%'
  },
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 15,
  },
  inputText1: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,

  },
  button: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 8,
    width: 80,
    height: 30,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600'
  },
  buttonText1: {
    marginTop: 30,
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '600',
    color: Colors.ok,
    textDecorationLine: 'underline'
  }
});
export default styles;