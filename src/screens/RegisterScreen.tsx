import React, {useState} from "react";
import {Image, ScrollView, View, Alert} from "react-native";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import {useNavigation} from "@react-navigation/native";
import auth, {firebase} from "@react-native-firebase/auth";
import updateProfile from "@react-native-firebase/auth";
import getAuth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {registerUser, RegisterUser} from "../actions/Firestore";
import messaging from "@react-native-firebase/messaging";


const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisibleTxt, setIsVisible] = useState(false);
    const navigation = useNavigation();
    const register =async() => {
        const token=await messaging().getToken()
        await firestore().collection("users").add({
            email:mail,
            name:name,
            password:password,
            surname:surname,
            token:token
        }).then(()=>navigation.navigate("Login")).catch((x)=>console.log(x))
    };
    return (
        <View style={{margin: 10}}>
            <ScrollView>
                {isVisibleTxt ? null : <Image source={require("../assets/icons/iconLogo.jpg")}
                                              style={{width: "100%", height: 400, marginTop: -10}}
                                              resizeMode={"contain"}/>}
                <CustomInputs placeholder={"Adınız"}
                              onChange={(x: string) => setName(x)}/>
                <CustomInputs placeholder={"Soyadınız"}
                              onChange={(x: string) => setSurname(x)}/>
                <CustomInputs placeholder={"Mail Adresiniz"}
                              onChange={(x: string) => setMail(x)}/>
                <CustomInputs placeholder={"Şifre Giriniz"}
                              onChange={(x: any) => setPassword(x)}/>
                <CustomInputs placeholder={"Şifreyi Tekrar Giriniz"}
                              onChange={(x: any) => setPassword(x)}/>
                <CustomButton text={"Kayıt Ol"} onPress={() => register()}/>
                <CustomButton text={"Geri"} buttonStyle={{backgroundColor: "white"}}
                              onPress={() => navigation.goBack()}/>

            </ScrollView>
        </View>
    );
};
export default RegisterScreen;
