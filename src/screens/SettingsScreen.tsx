import React, {useEffect, useState} from "react";
import {Alert, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import auth, {firebase} from "@react-native-firebase/auth";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import {useNavigation} from "@react-navigation/native";
import {MainView} from "../components/cards/MainView";
import {useDispatch, useSelector} from "react-redux";
import {setUserInfo} from "../redux/Slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import ImagePicker from "react-native-image-crop-picker";
import storage from '@react-native-firebase/storage';
import {updateUser} from "../actions/Firestore";
import {isNotNull} from "../helpers/isNullHelper";
import {CustomAlerts} from "../components/modals/Alerts";
import {customAlert} from "../helpers/Helpers";
import {Animation} from "../components/cards/Animation";


const SettingsScreen = () => {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.user)
    const navigation = useNavigation();
    const [data, setData] = useState("");
    const [name, setName] = useState(userInfo.userName);
    const [surname, setSurname] = useState(userInfo.userSurname);
    const [mail, setMail] = useState(userInfo.userMail);
    const [password, setPassword] = useState(userInfo.userPassword);
    const [image, setImage] = useState("")
    const [animation, setAnimation] = useState(false)

    useEffect(() => {
        if (userInfo?.userImage) {
            setImage(userInfo?.userImage)
        }
    }, []);

    const updateData = async () => {
        if(!isNotNull(name))
        {
            customAlert(false,"İsim Boş Olamaz")
        }
        else if(!isNotNull(surname)){
            customAlert(false,"Soyisim Boş Olamaz")
        }
        else if(!isNotNull(mail)){
            customAlert(false,"Mail Boş Olamaz")
        }
        else if(!isNotNull(password)){
            customAlert(false,"Şifre Boş Olamaz")
        }else{
            updateUser(userInfo.userId, {name: name, password: password, surname: surname}).then(()=>customAlert(true)).catch()
        }
    }
    const signOut = async () => {
        dispatch(setUserInfo({userName: "", userSurname: "", userMail: ""}))
        AsyncStorage.removeItem('userInfo')
        navigation.navigate('Login')
    }
    const updateImage = async () => {
        storage().ref().child(userInfo?.userId).getDownloadURL().then((x) => {
            dispatch(setUserInfo({...userInfo,userImage: x}))
            setImage(x)
            updateUser(userInfo.userId, {userImage: x})
        })
        setAnimation(false)

    }
    const uploadFunction=async(image:any)=>{
        setAnimation(true)
        const response = await fetch(image.path)
        const blob = await response.blob()
        storage().ref().child(userInfo.userId).put(blob).then((x) => {
            updateImage()
            Alert.alert("İşlem Başarılı")
        }).catch(() => Alert.alert("Başarısız İşlem"))

    }
    const openCamera = () => {
        ImagePicker.openPicker({
            loadingLabelText: "",
            cropperToolbarTitle: "seç",
            showCropGuidelines: false,
            hideBottomControls: true,
            enableRotationGesture: true,
            writeTempFile: false
        })
            .then((image) => {
               uploadFunction(image)
            })
            .catch();
    }
    return (
        <MainView noSettingsImage={true} title={"Profil Bilgileriniz"} onPressHeader={() => navigation.goBack()}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Animation loading={animation} waitScreen={true}/>
                <TouchableOpacity onPress={() => openCamera()} style={{alignItems: 'center', marginTop: 16}}><Image
                    source={image == "" ? require('../assets/icons/noImage.png') : {uri: image}}
                    style={{height: 250, width: 250}}/></TouchableOpacity>

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
