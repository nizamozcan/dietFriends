import React, {useState} from "react";
import {Image, ScrollView, View, Alert} from "react-native";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import {useNavigation} from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import {isNotNull} from "../helpers/isNullHelper";
import {checkInput, customAlert} from "../helpers/Helpers";


const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isVisibleTxt, setIsVisible] = useState(false);
    const navigation = useNavigation();
    const register = async () => {
        const mailCheck = mail?.includes(".com" && "@");
        if (!isNotNull(name)) {
            customAlert(false, "İsim Boş Olamaz")
        } else if (!isNotNull(surname)) {
            customAlert(false, "Soyisim Boş Olamaz")
        } else if (!isNotNull(mail)) {
            customAlert(false, "Email Boş Olamaz")
        }
        else if (!mailCheck){
            customAlert(false,"lütfen mail adresinizi doğru girdiğinizden emin olunuz")
        }
        else if (!isNotNull(password)&&!isNotNull(rePassword)) {
            customAlert(false, "Şifrenizi kontrol ediniz.")
        }else if (password!=rePassword){
            customAlert(false, "Tekar girilen şifreyi kontrol ediniz.")

        }
        else {
            const token = await messaging().getToken()
            await firestore().collection("users").add({
                email: mail,
                name: name,
                password: password,
                surname: surname,
                token: token
            }).then(() => navigation.navigate("Login")).catch((x) => console.log(x))
        }
    };
    return (
        <View style={{margin: 10}}>
            <ScrollView>
                {isVisibleTxt ? null : <Image source={require("../assets/icons/iconLogo.jpg")}
                                              style={{width: "100%", height: 400, marginTop: -10}}
                                              resizeMode={"contain"}/>}
                <CustomInputs maxSize={30} placeholder={"Adınız"}
                              onChange={(x: string) => setName(x)}/>
                <CustomInputs maxSize={30} placeholder={"Soyadınız"}
                              onChange={(x: string) => setSurname(x)}/>
                <CustomInputs maxSize={40} placeholder={"Mail Adresiniz"}
                              onChange={(x: string) => setMail(x)}/>
                <CustomInputs maxSize={20} secureTextEntry={true} placeholder={"Şifre Giriniz"}
                              onChange={(x: any) => setPassword(x)}/>
                <CustomInputs maxSize={20} secureTextEntry={true} placeholder={"Şifreyi Tekrar Giriniz"}
                              onChange={(x: any) => setRePassword(x)}/>
                <CustomButton text={"Kayıt Ol"} onPress={() => register()}/>
                <CustomButton text={"Geri"} buttonStyle={{backgroundColor: "white"}}
                              onPress={() => navigation.goBack()}/>

            </ScrollView>
        </View>
    );
};
export default RegisterScreen;
