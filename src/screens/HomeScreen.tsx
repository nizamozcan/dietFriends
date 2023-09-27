import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, Button, SafeAreaView, Alert, FlatList, Image} from "react-native";
import {Colors} from "../assets/colors/Colors";
import Modal from "react-native-modal";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import FormatData from "../Formats/FormatData";
import {useNavigation} from "@react-navigation/native";
import {Header} from "../components/headers/Header";
import Icon from 'react-native-vector-icons/Ionicons';
import {MainView} from "../components/cards/MainView";
import {Split} from "../components/split/Split";

const HomeScreen = (props) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);


    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        database()
            .ref("/userData")
            .once("value")
            .then(snapshot => {
                const dataFormat = FormatData(snapshot.val());
                setData(dataFormat);
            });
    };

    const renderItem = ({item}) => {
        return (
            <View style={{
                minHeight: 300,
                backgroundColor: 'white',
                borderColor: '#78633f',
                borderWidth: 0.5,
                elevation: 5,
                marginVertical: 8,
                borderRadius: 16,
                padding: 8
            }}
            >
                <TouchableOpacity style={{flex: 1}}
                                  onPress={() => navigation.navigate("DietDetail", {data: item})}>
                    <View style={{flex: 0.1, flexDirection: 'row'}}>
                        <Image
                            source={require('../assets/icons/male_man_people_person_avatar_white_tone_icon_159363.png')}
                            style={{height: 30, width: 30}}/>
                        <Text style={{fontWeight: "600", paddingLeft: 16, color: '#513400'}}>
                            {item.displayName}
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{flex: 4, marginTop: 10, color: '#513400'}}>
                            {item.title}
                            {item.value}
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

        );
    };
    return (
        <MainView title={"Diyetler"}>
            <FlatList data={data} renderItem={renderItem}/>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate("AddDiet")}><Text
                style={{
                    fontSize: 40,
                    fontWeight: "300",
                    alignSelf: "center",
                    color: "white"
                }}>+</Text></TouchableOpacity>
        </MainView>
    );
};
export default HomeScreen;
const styles = StyleSheet.create({
    buttonStyle: {
        position: "absolute",
        right: 10,
        bottom: 10,
        backgroundColor: Colors.Green,
        width: 75,
        height: 75,
        justifyContent: "center",
        borderRadius: 75
    }
});
