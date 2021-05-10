import React, { Component } from 'react';
import { View } from 'react-native';
import RootNavigation from './Navigation/RootNavigation';

console.disableYellowBox = true;

class Root extends Component {
  render() {
    return (
      <>
        <View style={{ flex: 1 }}>
          <RootNavigation />
        </View>
      </>
    );
  }
}
export default Root;