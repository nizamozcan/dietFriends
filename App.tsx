/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
    SafeAreaView,
    StyleSheet, View
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SettingsScreen from "./src/screens/SettingsScreen";
import {AddDietScreen} from "./src/screens/AddDietScreen";
import {DietListDetailScreen} from "./src/screens/DietListDetailScreen";


function App(): JSX.Element {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const StackNavigator = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="Home" component={TabNavigator} options={{headerShown: false}}/>
                <Stack.Screen name={"AddDiet"} component={AddDietScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"DietDetail"} component={DietListDetailScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        );
    };
    const TabNavigator = () => {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Tab.Screen name="Setting" component={SettingsScreen} options={{headerShown: false}}/>
            </Tab.Navigator>
        );
    };
    return (
        <NavigationContainer>
            {StackNavigator()}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});

export default App;
