/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Linking,
} from 'react-native';
import Styles from './Styles';
import Colors from '../../Styles/Colors';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';
import { createResource, getResource } from '../../WebApiServices/SimpleApiCalls';
import { add_diet, get_diet } from '../../WebApiServices/WebServices';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'

const data = [
  { name: "" },
  { name: "Breakfast" },
  { name: "Dinner" },
  { name: "Lunch" },
  { name: "Snacks" }
]
class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      consumedCalorie: '',
      changed: 0,
      loading: false,
      foodType: '',
      description: '',
      date: moment(new Date()).format("DD-MM-YYYY"),
      showEntry: false,
      foodData: [],
      selected: "",
      isDateTimePickerVisible: false,
      searchValue: "",
      selectedEntry: ""
    };
  }

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    this.setState({ loading: true })
    try {
      let res = await getResource(get_diet);
      console.log(res.data, 'resDiet-->');
      this.setState({ foodData: res.data });
      this.setState({ loading: false })
      console.log('foodData-->', this.state.foodData);
    } catch (error) {
      this.setState({ loading: false })
      console.log("Cnot find data");
    }

  }

  changedValues = async (value) => {
    this.setState({ changed: value });
    if (value === 1) {
      try {
        let res = await getResource(get_diet);
        console.log(res.data, 'resDiet-->');
        this.setState({ foodData: res.data });
        console.log('foodData-->', this.state.foodData);
      } catch (error) {
      }
    }

  }

  handleChangeFlag = (selectedOption) => {
    this.setState({ foodType: selectedOption });
  }
  entryDetails = (item) => {
    this.setState({ showEntry: !this.state.showEntry, selectedEntry: item });
  }

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    let datxxx = moment(date).format("DD-MM-YYYY")
    this.setState({ date: datxxx })
    this.hideDateTimePicker();
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };


  render() {
    const { changed, date, showEntry, description, foodType, consumedCalorie, foodData } = this.state;

    const handleSubmit = async () => {
      if (foodType === '' || consumedCalorie === '' || description === '') {
        alert('cannot submit empty fields');
      } else {
        console.log(data, 'DAAAAAAAAAAAAAAAAAAAAAAAAAA');
        let data = { foodType, description, date, consumedCalorie };
        try {
          let res = await createResource(add_diet, data);
          console.log(res, 'resDiet-->');
          alert("Diet added successfully")
          this.setState({ date: "", foodType: "", consumedCalorie: "", description: "" })
        } catch (error) {
          alert('Invalid data');
          alert("Error adding Diet")
        }
      }
    };
    console.log(this.state.selectedEntry, "selectedEntryselectedEntryselectedEntryselectedEntry");
    const Language = [
      'Breakfast',
      'Lunch',
      'Dinner',
      'Snacks',
    ];

    console.log(this.state.selected, new Date(), "SELACCCCCCCCCCC");

    if (this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
        <ActivityIndicator color="green" size="large" />
      </View>
      )
    }

    const results = foodData.filter(item => item.food_type.toLowerCase().includes(this.state.searchValue.toLowerCase()))
    console.log(results, "RESULTTTTTTTTTTTTTTTTTTT");

    return (
      <>
        <SafeAreaView style={Styles.safeViewStyle}>
          <ScrollView>
            <View style={Styles.mainContainer}>
              {/* Tabs */}
              <View style={Styles.headerContainer}>
                <TouchableOpacity style={{
                  backgroundColor: changed == 0 ? Colors.ok : Colors.White,
                  width: '30%',
                  borderRightWidth: 2,
                }}
                  onPress={() => this.changedValues(0)}
                >
                  <View style={{
                    margin: 5,
                    width: '100%',
                  }}>

                    <Text style={Styles.buttonText}>New Entry</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  backgroundColor: changed == 1 ? Colors.ok : Colors.White,
                  width: '40%',
                  borderRightWidth: 2,
                }}
                  onPress={() => this.changedValues(1)}
                >
                  <View style={{
                    margin: 5,
                    width: '100%',
                  }}>
                    <Text style={Styles.buttonText}>Search Entries</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  backgroundColor: changed == 2 ? Colors.ok : Colors.White,
                  width: '30%',
                  borderRightWidth: 2,
                }}
                  onPress={() => { this.props.navigation.navigate('Login'); }}
                >
                  <View style={{
                    margin: 5,
                    width: '100%',
                  }}>
                    <Text style={[Styles.buttonText, { marginLeft: 10 }]}>Logout</Text>
                  </View>
                </TouchableOpacity>

              </View>


              <Text style={Styles.headerText}>Food Manager App</Text>
              {
                changed === 0 &&
                <Text style={Styles.headerText1}>Enter Intake Information</Text>
              }
              {
                changed === 0 ? null
                  : <Text style={Styles.headerText1}>Search Entries</Text>
              }
              {
                changed === 0 ? null :
                  <View style={{ borderWidth: 1, marginTop: 10 }}>
                    <TextInput
                      placeholder="Search Here"
                      value={this.state.searchValue}
                      onChangeText={(text) => this.setState({ searchValue: text })}
                    />
                  </View>
              }

              {
                changed === 0 &&

                <View style={Styles.mainInputWrapper}>
                  {/* 1st */}
                  {this.state.foodType != "" ?
                    null :
                    <Text style={Styles.inputText}>Food Type</Text>}
                  < Picker
                    selectedValue={this.state.selected}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue, "VAAAAAAAAAAAAAAAA");
                      this.setState({ selected: itemValue, foodType: itemValue })
                    }}
                    style={{
                      marginTop: -Dimensions.get("window").height * 0.065
                    }}
                  >
                    {data.map((dataxxxx, index) => {
                      return (
                        <Picker.Item label={dataxxxx.name} value={dataxxxx.name} />
                      )

                    })
                    }
                  </Picker>
                  {/* 2nd */}
                  <Text style={Styles.inputText2}>Food Description</Text>
                  <TextInput
                    style={Styles.input2}
                    value={this.state.description}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => this.setState({ description: text })}
                  />
                  {/* 3rd */}
                  <Text style={Styles.inputText1}>Date of Intake</Text>
                  <TouchableOpacity style={{ backgroundColor: "green", paddingVertical: 10 }} onPress={this.showDateTimePicker}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>Select Date</Text>
                  </TouchableOpacity>
                  <Text style={{ marginTop: 2 }}>Selected Date : {this.state.date}</Text>
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                  />

                  {/* last */}
                  <Text style={Styles.inputText1}>Consumed Calorie</Text>
                  <TextInput
                    style={Styles.input}
                    value={this.state.consumedCalorie}
                    onChangeText={text => this.setState({ consumedCalorie: text })}
                  />

                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={Styles.button}>
                      <Text style={Styles.buttonTextSubmit}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              {
                changed === 1 ?
                  showEntry ?
                    <View style={Styles.mainInputWrapper}>
                      <View style={Styles.entryContainer}>
                        <View style={Styles.entryWrapper}>
                          <Text style={Styles.entryText}>Consumed Colory: {this.state.selectedEntry.consumed_calorie}</Text>
                          <Text style={Styles.entryText}>On Dated: {this.state.selectedEntry.date}</Text>
                          <Text style={Styles.entryText}>Food Type: {this.state.selectedEntry.food_type}</Text>

                          <Text style={Styles.entryText}>Food Description</Text>

                          <Text style={Styles.entryTextDescription}>{this.state.selectedEntry.description}</Text>

                        </View>
                        <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?text=Name of the food is ${this.state.selectedEntry.food_type}.Download App For More Information by given link..  www.google.com`) }}>
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
                    results ?
                      results.map((val) => (
                        <TouchableOpacity onPress={() => this.entryDetails(val)}>
                          <View style={Styles.searchWrapper}>
                            <View style={{ marginVertical: 10 }}>
                              <Text style={Styles.searchText}>Type: {val.food_type}</Text>
                              <Text style={Styles.searchText}>calories: {val.consumed_calorie}</Text>
                              <Text style={Styles.searchText1}>date: {val.date}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))
                      :
                      <View style={Styles.mainInputWrapper}>
                        <TouchableOpacity onPress={() => this.entryDetails()}>
                          <View style={Styles.searchWrapper}>
                            <Text style={Styles.searchText}>Consumed Colory: {this.state.selectedEntry.consumed_calorie}</Text>
                            <Text style={Styles.searchText1}>On Dateddddd: __/__/____</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                  // };
                  /* <TouchableOpacity onPress={() => this.entryDetails()}>
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
                  </TouchableOpacity> */
                  : null
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
export default NewEntry;
