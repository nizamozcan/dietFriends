import React, {useEffect, useRef, useState} from "react";
import {Alert, Animated, Image, PermissionsAndroid, ScrollView, Text, View} from "react-native";
import LoginCard from "../components/cards/LoginCard";
import {CustomButton} from "../components/buttons/CustomButton";
import {CustomInputs} from "../components/inputs/CustomInputs";
import Value = Animated.Value;
import {useNavigation, useScrollToTop} from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Colors} from "../assets/colors/Colors";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import firestore from '@react-native-firebase/firestore';
import {LoginUserControl} from "../helpers/Helpers";
import {AlertModal} from "../components/modals/AlertModal";
import {CustomAlerts} from "../components/modals/Alerts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";
import {setUserInfo} from "../redux/Slice";
import messaging from "@react-native-firebase/messaging";

const LoginScreen = (props) => {
    const dispatch = useDispatch()
    let navigateData = props?.route?.params?.datas?.split(" ");
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [mail, setMail] = useState(navigateData != undefined ? navigateData[0] : "");
    const [password, setPassword] = useState(navigateData != undefined ? navigateData[1] : "");
    const [isVisible, setIsVisible] = useState(false)
    const navigation = useNavigation();
    const [animation, setAnimation] = useState(false)
    const {userInfo} = useSelector((state: RootState) => state.user);
    useEffect(() => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        getData();
    }, []);

    const getFirestoreUser = async () => {
        const usersCollection = await firestore().collection('users').get()
    }
    const getData = async () => {
        const isLogin = await auth().currentUser
        if (isLogin != null) {
            navigation.navigate("Home", {user: isLogin});
        } else {
            let userSaveData = await AsyncStorage.getItem("loginInfo");
            if (userSaveData != undefined) {
                setToggleCheckBox(true);
                let format = userSaveData.split(" ");
                setMail(format[0]);
                setPassword(format[1]);
            }

        }
    };

    const signUser = async () => {
        const token = await messaging().getToken();
        LoginUserControl(mail, password).then((x) => {
            const userInfo =
                {
                    name: x._data.name,
                    surname: x._data.surname,
                    mail: x._data.email,
                    password: x._data.password,
                    userId:x._ref._documentPath._parts[1],
                    token:token
                }
            dispatch(setUserInfo(
                {
                    userMail: x._data.email,
                    userSurname: x._data.surname,
                    userName: x._data.name,
                    userPassword: x._data.password,
                    userId:x._ref._documentPath._parts[1],
                    userToken:token
                }))
            AsyncStorage.setItem("userInfo", JSON.stringify(userInfo))
            navigation.navigate("Home");
        }).catch((y) => CustomAlerts("Başarısız İşlem", "Mail yada şifrenizi kontrol ediniz."))

    }

    return (
        <View style={{margin: 10}}>
            <ScrollView>
                <Image source={require("../assets/icons/iconLogo.jpg")}
                       style={{width: "100%", height: 400, marginTop: -10}}
                       resizeMode={"contain"}/>

                <CustomInputs placeholder={"Mail Giriniz"}
                              onChange={(x: any) => setMail(x)}
                              value={mail}/>
                <CustomInputs placeholder={"Şifre Giriniz"}
                              onChange={(x: any) => setPassword(x)} value={password}/>
                <View style={{flexDirection: "row", marginTop: 10}}>
                    <Text style={{alignSelf: "center", color: "black"}}>Beni Hatırla</Text>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        boxType={"square"}
                        style={{marginLeft: 10}}
                        onCheckColor={Colors.Green}
                        tintColor={Colors.Green}
                        lineWidth={1}
                    />
                </View>
                <CustomButton text={"Giriş Yap"} onPress={() => signUser()}/>
                <CustomButton text={"Kayıt Ol"} buttonStyle={{backgroundColor: "white"}}
                              onPress={() => navigation.navigate("Register")}/>
            </ScrollView>

        </View>
    );
};
export default LoginScreen;
