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
import Icon from "react-native-vector-icons/Ionicons";
import {MyDietListScreen} from "./src/screens/MyDietListScreen";
import {Provider} from "react-redux";
import {store} from "./src/redux/Store";
import {SplashScreen} from "./src/screens/SplashScreen";


function App(): JSX.Element {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const StackNavigator = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={TabNavigator} options={{headerShown: false}}/>
                <Stack.Screen name={"AddDiet"} component={AddDietScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"DietDetail"} component={DietListDetailScreen} options={{headerShown: false}}/>
                <Stack.Screen  name="Setting" component={SettingsScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        );
    };
    const TabNavigator = () => {
        return (
            <Tab.Navigator screenOptions={{tabBarActiveTintColor:'white',tabBarStyle:{backgroundColor:'#E67402'}}}>
                <Tab.Screen name="Ana Sayfa" component={HomeScreen}   options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="settings" size={size} color={"white"} /> // İkonu burada ekleyin
                    ),
                }}/>
                <Tab.Screen name="Diyet Listem" component={MyDietListScreen}   options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="list-outline" size={size} color={"white"} /> // İkonu burada ekleyin
                    ),
                }}/>
            </Tab.Navigator>
        );
    };
    return (
        <Provider store={store}>
            <NavigationContainer>
                {StackNavigator()}
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({});

export default App;
