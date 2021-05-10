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
import Colors from '../../Styles/Colors';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';

class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      c_password: '',
      changed: 0,
      language: '',
      date: '09-10-2020',
      showEntry: false
    };
  }
  changedValues = (value) => {
    this.setState({ changed: value })
  }

  handleChangeFlag = (selectedOption) => {
    this.setState({ language: selectedOption })
  }
  entryDetails = () => {
    this.setState({ showEntry: !this.state.showEntry })
  }



  render() {
    const { changed, date, showEntry } = this.state;

    const Language = [
      'Breakfast',
      'Lunch',
      'Dinner',
      'Snaks',
    ]

    return (
      <>
        <SafeAreaView style={Styles.safeViewStyle}>
          <ScrollView>
            <View style={Styles.mainContainer}>
              {/* Tabs */}
              <View style={Styles.headerContainer}>
                <TouchableOpacity style={{
                  backgroundColor: changed == 0 ? Colors.ok : Colors.White,
                  width: "30%",
                  borderRightWidth: 2,
                }}
                  onPress={() => this.changedValues(0)}
                >
                  <View style={{
                    margin: 5,
                    width: "100%",
                  }}>

                    <Text style={Styles.buttonText}>New Entry</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  backgroundColor: changed == 1 ? Colors.ok : Colors.White,
                  width: "40%",
                  borderRightWidth: 2,
                }}
                  onPress={() => this.changedValues(1)}
                >
                  <View style={{
                    margin: 5,
                    width: "100%",
                  }}>
                    <Text style={Styles.buttonText}>Search Entries</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  backgroundColor: changed == 2 ? Colors.ok : Colors.White,
                  width: "30%",
                  borderRightWidth: 2,
                }}
                  onPress={() => { this.props.navigation.navigate('Login') }}
                >
                  <View style={{
                    margin: 5,
                    width: "100%",
                  }}>
                    <Text style={[Styles.buttonText, { marginLeft: 10 }]}>Logout</Text>
                  </View>
                </TouchableOpacity>

              </View>


              <Text style={Styles.headerText}>Food Manager App</Text>
              {
                changed == 0 &&
                <Text style={Styles.headerText1}>Enter Intake Information</Text>
              }
              {
                changed == 1 ?
                  showEntry ?
                    <Text style={Styles.headerText1}>Entry's Detail</Text> :
                    <Text style={Styles.headerText1}>Search Entries</Text>
                  :
                  <Text style={Styles.headerText1}>Search Entries</Text>
              }
              {
                changed == 0 &&

                <View style={Styles.mainInputWrapper}>
                  {/* 1st */}
                  <Text style={Styles.inputText}>Food Type</Text>
                  <ModalDropdown
                    style={{
                      width: '100%',
                      paddingLeft: 12,
                      alignSelf: 'center',
                      paddingVertical: 10,
                      backgroundColor: '#fff',
                      marginTop: 15,
                      borderRadius: 7,
                      borderWidth: 2,
                      // height: 100,
                    }}
                    defaultValue={'Select One'}
                    textStyle={{
                      fontSize: 15,
                      fontWeight: '400',
                      textAlign: 'left',
                      color: 'black',
                    }}
                    dropdownTextStyle={{
                      fontSize: 15,
                      fontWeight: '400',
                      color: '#000',
                    }}
                    dropdownStyle={{
                      width: '90%',
                      marginLeft: -12,
                      marginTop: 3,
                      borderWidth: 1,
                      borderColor: '#e0e4e5',
                      maxHeight: 70
                    }}
                    onSelect={(index, value) => this.handleChangeFlag(value)}
                    options={Language}
                  />
                  {/* 2nd */}
                  <Text style={Styles.inputText2}>Food Description</Text>
                  <TextInput
                    style={Styles.input2}
                    value={this.state.foodDescription}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => this.setState({ foodDescription: text })}
                  />
                  {/* 3rd */}
                  <Text style={Styles.inputText1}>Date of Intake</Text>
                  <DatePicker
                    style={Styles.datePickerStyle}
                    date={date} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2016"
                    maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        borderWidth: 2,
                        borderColor: Colors.black,
                        borderRadius: 8
                      },
                      dateIcon: {
                        //display: 'none',
                        position: 'relative',
                        right: 0,
                        top: 0,
                        // marginLeft: 0,
                      },

                    }}
                    onDateChange={(date) => {
                      setDate(date);
                    }}
                  />

                  {/* last */}
                  <Text style={Styles.inputText1}>Consumed Calorie</Text>
                  <TextInput
                    style={Styles.input}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                  />

                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('') }}>
                    <View style={Styles.button}>
                      <Text style={Styles.buttonTextSubmit}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              {
                changed == 1 ?
                  showEntry ?
                    <View style={Styles.mainInputWrapper}>
                      <View style={Styles.entryContainer}>
                        <View style={Styles.entryWrapper}>
                          <Text style={Styles.entryText}>Consumed Colory: 44</Text>
                          <Text style={Styles.entryText}>On Dated: __/__/____</Text>
                          <Text style={Styles.entryText}>Food Type: _________</Text>

                          <Text style={Styles.entryText}>Food Description</Text>

                          <Text style={Styles.entryTextDescription}>Use sensory words – such as “fiery,” ”savory” and “crispy” – to describe your dishes. People are driven by their senses, and by using simple yet tantalizing terms that speak to the each of the five senses, you paint a clear picture of what diners can expect from the dish.</Text>

                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('') }}>
                          <View style={[Styles.button, { marginRight: 10 }]}>
                            <Text style={Styles.buttonTextSubmit}>Share</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.entryDetails()}>
                          <Text style={Styles.buttonText1}>Go Back</Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                    :
                    <View style={Styles.mainInputWrapper}>
                      <TouchableOpacity onPress={() => this.entryDetails()}>
                        <View style={Styles.searchWrapper}>
                          <Text style={Styles.searchText}>Consumed Colory: 44</Text>
                          <Text style={Styles.searchText1}>On Dated: __/__/____</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={Styles.searchWrapper}>
                          <Text style={Styles.searchText}>Consumed Colory: 44</Text>
                          <Text style={Styles.searchText1}>On Dated: __/__/____</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={Styles.searchWrapper}>
                          <Text style={Styles.searchText}>Consumed Colory: 44</Text>
                          <Text style={Styles.searchText1}>On Dated: __/__/____</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={Styles.searchWrapper}>
                          <Text style={Styles.searchText}>Consumed Colory: 44</Text>
                          <Text style={Styles.searchText1}>On Dated: __/__/____</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={Styles.searchWrapper}>
                          <Text style={Styles.searchText}>Consumed Colory: 44</Text>
                          <Text style={Styles.searchText1}>On Dated: __/__/____</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={Styles.searchWrapper}>
                          <Text style={Styles.searchText}>Consumed Colory: 44</Text>
                          <Text style={Styles.searchText1}>On Dated: __/__/____</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={Styles.searchWrapper}>
                          <Text style={Styles.searchText}>Consumed Colory: 44</Text>
                          <Text style={Styles.searchText1}>On Dated: __/__/____</Text>
                        </View>
                      </TouchableOpacity>

                    </View> : null
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
export default NewEntry;