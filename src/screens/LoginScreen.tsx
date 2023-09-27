import React, {useEffect, useRef, useState} from "react";
import {Alert, Animated, Image, ScrollView, Text, View} from "react-native";
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

const LoginScreen = (props) => {
    let navigateData = props?.route?.params?.datas?.split(" ");

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [mail, setMail] = useState(navigateData != undefined ? navigateData[0] : "");
    const [password, setPassword] = useState(navigateData != undefined ? navigateData[1] : "");
    const [isVisible, setIsVisible] = useState(false)
    const navigation = useNavigation();
    const [animation, setAnimation] = useState(false)
    useEffect(() => {
        getData();
    }, []);

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
    const signUser = () => {
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
        }, 3000)
        if (toggleCheckBox == true) {
            let mailAndPassword = mail + " " + password;
            AsyncStorage.setItem("loginInfo", mailAndPassword);
        }
        auth().signInWithEmailAndPassword(mail, password)
            .then((x) => {
                setAnimation(true)
                AsyncStorage.setItem("userUID", x.user.uid);
                navigation.navigate("Home", {user: x.user});
            })
            .catch(error => setAnimation(false));
    };
    return (
        <View style={{margin: 10}}>
            <ScrollView>
                <Modal isVisible={isVisible} coverScreen={true}>
                    <View style={{height: 200, backgroundColor: 'lightgrey',borderRadius:20}}>
                        {animation == true ?
                            <LottieView source={require('../assets/animation/animation_ln1n0o25.json')} autoPlay loop
                                        style={{width: 100, height: 100}}/> :
                            <View style={{padding:16,flex:1,alignItems:'center'}}>
                                <LottieView source={require('../assets/animation/animation_ln1n39i1.json')} autoPlay loop
                                            style={{width: 100, height: 100}}/>
                                <Text style={{color:'black',fontWeight:'bold'}}>Giriş Bilgileri Hatalı</Text>
                            </View>
                        }
                    </View>
                </Modal>


                <Image source={require("../assets/icons/iconLogo.jpg")}
                       style={{width: "100%", height: 400, marginTop: -10}}
                       resizeMode={"contain"}/>

                <CustomInputs placeholder={"Mail Giriniz"} inputStyle={{marginTop: 0}}
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
