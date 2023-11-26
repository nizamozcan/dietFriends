import React, {useEffect, useState} from "react";
import {Alert, FlatList, Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import auth from "@react-native-firebase/auth";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import {useNavigation} from "@react-navigation/native";
import {MainView} from "../components/cards/MainView";
import {useDispatch, useSelector} from "react-redux";
import {setUserInfo} from "../redux/Slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";

const SettingsScreen = () => {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.user)
    const navigation = useNavigation();
    const [data, setData] = useState("");
    const [name, setName] = useState(userInfo.userName);
    const [surname, setSurname] = useState(userInfo.userSurname);
    const [mail, setMail] = useState(userInfo.userMail);
    const [password, setPassword] = useState(userInfo.userPassword);

    useEffect(() => {
    }, []);

    const updateData = async () => {
        await firestore().collection("users").doc(userInfo.userId).update({
        name:name,
        password:password,
        surname:surname}).then().catch((x)=>console.log(x))
    }
    const signOut = async () => {
        dispatch(setUserInfo({userName: "", userSurname: "", userMail: ""}))
        AsyncStorage.removeItem('userInfo')
        navigation.navigate('Login')
    }
    return (
        <MainView noSettingsImage={true} title={"Profil Bilgileriniz"} onPressHeader={() => navigation.goBack()}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{alignItems: 'center', marginTop: 16}}><Image
                    source={require('../assets/icons/noImage.png')}/></View>
                <CustomInputs placeholder={"Mail Adresiniz"} value={mail} onChange={(x: string) => setMail(x)}
                              disabled={true}/>
                <CustomInputs placeholder={"Adınız"} value={name} onChange={(x: string) => setName(x)}/>
                <CustomInputs placeholder={"Soyadınız"} value={surname} onChange={(x: string) => setSurname(x)}/>
                <CustomInputs placeholder={"Şifreniz"} value={password} onChange={(x: string) => setPassword(x)}/>
                <CustomButton text={"Güncelle"} onPress={updateData}/>
                <CustomButton text={"Çıkış Yap"} onPress={() => signOut()} buttonStyle={{backgroundColor: 'white'}}/>

            </ScrollView>
        </MainView>
    );
};
export default SettingsScreen;
