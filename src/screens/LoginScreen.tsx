import React, { useEffect, useState } from "react";
import { Alert, Animated, Image, ScrollView, Text, View } from "react-native";
import LoginCard from "../components/cards/LoginCard";
import { CustomButton } from "../components/buttons/CustomButton";
import { CustomInputs } from "../components/inputs/CustomInputs";
import Value = Animated.Value;
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../assets/colors/Colors";

const LoginScreen = (props) => {
  let navigateData = props?.route?.params?.datas?.split(" ");

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [mail, setMail] = useState(navigateData != undefined ? navigateData[0] : "");
  const [password, setPassword] = useState(navigateData != undefined ? navigateData[1] : "");
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const isLogin=await auth().currentUser
    if(isLogin!=null){
      navigation.navigate("Home",{user:isLogin});
    }
    else{
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
    if (toggleCheckBox == true) {
      let mailAndPassword = mail + " " + password;
      AsyncStorage.setItem("loginInfo", mailAndPassword);
    }
    auth().signInWithEmailAndPassword(mail, password)
      .then((x) => {
        AsyncStorage.setItem("userUID", x.user.uid);
        navigation.navigate("Home",{user:x.user});
      })
      .catch(error => Alert.alert("Giriş Bilgileri Hatalı"));
  };
  return (
    <View style={{ margin: 10 }}>
      <ScrollView>
        <Image source={require("../assets/icons/iconLogo.jpg")}
               style={{ width: "100%", height: 400, marginTop: -10 }}
               resizeMode={"contain"} />

        <CustomInputs placeholder={"Mail Giriniz"} inputStyle={{ marginTop: 0 }}
                      onChange={(x: any) => setMail(x)}
                      value={mail} />
        <CustomInputs placeholder={"Şifre Giriniz"}
                      onChange={(x: any) => setPassword(x)} value={password} />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ alignSelf: "center", color: "black" }}>Beni Hatırla</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            boxType={"square"}
            style={{ marginLeft: 10 }}
            onCheckColor={Colors.Green}
            tintColor={Colors.Green}
            lineWidth={1}

          />
        </View>
        <CustomButton text={"Giriş Yap"} onPress={() => signUser()} />
        <CustomButton text={"Kayıt Ol"} buttonStyle={{ backgroundColor: "white" }}
                      onPress={() => navigation.navigate("Register")} />
      </ScrollView>

    </View>
  );
};
export default LoginScreen;
