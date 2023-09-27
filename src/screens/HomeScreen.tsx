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

const HomeScreen = (props) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    const [displayName, setDisplayName] = useState("");


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
        console.log(item);
        console.log(item)
        return (
            <TouchableOpacity
                style={{minHeight: 300, backgroundColor: '#75c9b7',elevation: 5,marginVertical:8, borderRadius: 16,padding:8}}
                onPress={() => navigation.navigate("DietDetail", {data: item})}>
                <View style={{flex: 0.1, flexDirection: 'row'}}>
                    <Image source={require('../assets/icons/male_man_people_person_avatar_white_tone_icon_159363.png')}
                           style={{height: 30, width: 30}}/>
                    <Text style={{fontWeight: "600", paddingLeft: 16,color:'black'}}>
                        {item.displayName}
                    </Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{flex: 4, marginTop: 10,color:'black'}}>
                        {item.title}
                        {item.value}
                    </Text>
                </View>
                <View style={{backgroundColor:'black',height:1,width:'100%'}}></View>
                <Icon name="heart-outline" size={30} color="grey" style={{padding:4}}/>
            </TouchableOpacity>
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
