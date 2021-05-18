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
      isDateTimePickerVisible: false
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
      alert('Cannot Find data');
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
        alert('Cannot Find data');
      }
    }

  }

  handleChangeFlag = (selectedOption) => {
    this.setState({ foodType: selectedOption });
  }
  entryDetails = () => {
    this.setState({ showEntry: !this.state.showEntry });
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
          this.setState({ date: "", foodType: "", consumedCalorie: "", description:""})
        } catch (error) {
          alert('Invalid data');
          alert("Error adding Diet")
        }
      }
    };

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
              {/* {
                changed === 1 && showEntry ? <Text style={Styles.headerText1}>Entry's Detail</Text>
                  : <Text style={Styles.headerText1}>Search Entries</Text>
              } */}
              {
                changed === 0 &&

                <View style={Styles.mainInputWrapper}>
                  {/* 1st */}
                  <Text style={Styles.inputText}>Food Type</Text>
                  <Picker
                    selectedValue={this.state.selected}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue, "VAAAAAAAAAAAAAAAA");
                      this.setState({ selected: itemValue, foodType: itemValue })
                    }}
                    style={{marginTop:-Dimensions.get("window").height * 0.065
                  }}
                  >
                    {this.state.foodData.map((data, index) => {
                      return (
                        <Picker.Item label={data.food_type} value={data.food_type} />
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
                          <Text style={Styles.entryText}>Consumed Colory: 44</Text>
                          <Text style={Styles.entryText}>On Dated: __/__/____</Text>
                          <Text style={Styles.entryText}>Food Type: _________</Text>

                          <Text style={Styles.entryText}>Food Description</Text>

                          <Text style={Styles.entryTextDescription}>Use sensory words – such as “fiery,” ”savory” and “crispy” – to describe your dishes. People are driven by their senses, and by using simple yet tantalizing terms that speak to the each of the five senses, you paint a clear picture of what diners can expect from the dish.</Text>

                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate(''); }}>
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
                    foodData ?
                      foodData.map((val) => (
                        <TouchableOpacity onPress={() => this.entryDetails()}>
                          <View style={Styles.searchWrapper}>
                            <Text style={Styles.searchText}>calory:{val.consumed_calorie}</Text>
                            <Text style={Styles.searchText1}>date:{val.date}</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                      :
                      <View style={Styles.mainInputWrapper}>
                        <TouchableOpacity onPress={() => this.entryDetails()}>
                          <View style={Styles.searchWrapper}>
                            <Text style={Styles.searchText}>Consumed Colory: 44</Text>
                            <Text style={Styles.searchText1}>On Dated: __/__/____</Text>
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
