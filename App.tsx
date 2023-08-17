/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet, View
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";


function App(): JSX.Element {

  const Stack = createNativeStackNavigator();
  const StackNavigator=()=>{
    return(
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer >
      {StackNavigator()}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;
