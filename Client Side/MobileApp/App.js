import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MutualFund from './components/MutualFund'
import Dividend from './components/Dividend'
import { Header } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import BCDate from './components/BCDate';
import Split from './components/Split';
//import axios from 'axios'

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <Fragment>
      <NavigationContainer>
        <Header
          centerComponent={{ text: 'FINDEX', style: { color: '#fff', fontSize: 25, } }}
          containerStyle={{
            backgroundColor: '#808080',
            justifyContent: 'space-around',
          }}
        />


        <Tab.Navigator >
          <Tab.Screen name="Mutual Funds" component={MutualFund} />
          <Tab.Screen name="Dividend" component={Dividend} />
          <Tab.Screen name="Splits" component={Split} />
          <Tab.Screen name="BC-Date" component={BCDate} />
        </Tab.Navigator>

      </NavigationContainer>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  }
});
