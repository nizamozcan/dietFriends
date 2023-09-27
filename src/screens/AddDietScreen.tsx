import React, {useState} from "react";
import {SafeAreaView, ScrollView, Text, View} from "react-native"
import Modal from "react-native-modal";
import {Colors} from "../assets/colors/Colors";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import {useNavigation} from "@react-navigation/native";
import {Header2} from "../components/headers/Header2";
import LottieView from "lottie-react-native";
import {Split} from "../components/split/Split";

export const AddDietScreen = () => {
    const navigation = useNavigation();

    const [datas,setData]=useState({
        title:"",
        value:"",
        day:""
    })
    const sendData = async () => {
        const user =await auth().currentUser?.displayName;

        const uid = auth().currentUser?.uid;
        const data = {
            title: datas.title,
            value: datas.value,
            uid: uid,
            displayName: user,
            date: (new Date()).toISOString(),
            day:datas.day
        };
        const response = await database().ref("/userData").push(data);
        navigation.goBack()

    };
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex: 1}}>
                <Header2 title={"Diyet Detayınız"}/>
                <View style={{flex: 1, margin: 8,backgroundColor:'white',padding:8}}>
                    <View style={{alignItems:'center'}}>
                        <LottieView source={require('../assets/animation/addDiet.json')} autoPlay loop
                                    style={{width: 200, height: 200}}/>
                        <Text style={{color:'black'}}>Diyetinizi Diğer Kişiler İle Paylaşın</Text>
                    </View>
                <Split/>
                <CustomInputs placeholder={"Diyetin Adı"} onChange={(x: string) => setData((y)=>({...y,title: x}))}/>
                <CustomInputs placeholder={"Kaç Gün Uyguladınız"} onChange={(x:string)=>setData((y)=>({...y,day: x}))}/>
                <CustomInputs placeholder={"Diyetinizi Kısaca Açıklayınız"} multiline={true}
                              inputStyle={{height: 400,textAlignVertical:"top"}}
                              onChange={(x: string) => setData((y)=>({...y,value: x}))}/>
                <View style={{flexDirection: "row"}}>
                    <CustomButton text={"Paylaş"} buttonStyle={{backgroundColor: "white", flex: 1}} onPress={sendData}/>
                </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
