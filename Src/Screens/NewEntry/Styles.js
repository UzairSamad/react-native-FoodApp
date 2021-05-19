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
  headerContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 8,
    width: '100%',
    height: 30,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerText: {
    marginTop: '10%',
    fontSize: 35,
    textAlign: "center",
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  headerText1: {
    marginTop: '8%',
    fontSize: 22,
    textAlign: "center",
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
  mainInputWrapper: {
    marginTop: '7%',
    marginBottom: 20
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
  },
  input2: {
    height: 70,
    // margin: 12,
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 15,
  },
  inputText1: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20
  },
  inputText2: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 70
  },
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 15,
  },
  datePickerStyle: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
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
  buttonTextSubmit: {
    fontSize: 14,
    fontWeight: '600'
  },

  searchWrapper: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 8,
    height: 70,
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  entryText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500'
  },
  searchText1: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  entryContainer: {
    width: '100%',
    height: 400,
    borderWidth: 2,
    borderRadius: 8
  },
  entryWrapper: {
    marginLeft: 10
  },
  entryTextDescription: {
    fontSize: 12,
    marginTop: 20,
    fontWeight: '700',
    width: '95%',
    alignSelf: 'center'
  },
  buttonText1: {
    marginRight: 20,
    marginTop: 20,
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '600',
    color: Colors.ok,
    textDecorationLine: 'underline'
  }
});
export default styles;