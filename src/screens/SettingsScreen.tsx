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

    useEffect(() => {
        if (userInfo.userImage) {
            setImage(userInfo.userImage)
        }
    }, []);

    const updateData = async () => {
        updateUser(userInfo.userId, {name: name, password: password, surname: surname})
    }
    const signOut = async () => {
        dispatch(setUserInfo({userName: "", userSurname: "", userMail: ""}))
        AsyncStorage.removeItem('userInfo')
        navigation.navigate('Login')
    }
    const updateImage = async () => {
        storage().ref().child(userInfo?.userId).getDownloadURL().then((x) => {
            dispatch(setUserInfo({userImage: x}))
            setImage(x)
            updateUser(userInfo.userId, {userImage: x})
        })

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
            .then(async (image) => {
                setImage(image.path)
                const response = await fetch(image.path)
                const blob = await response.blob()
                storage().ref().child(userInfo.userId).put(blob).then((x) => {
                    Alert.alert("İşlem Başarılı")
                }).catch(() => Alert.alert("Başarısız İşlem"))
                updateImage()
            })
            .catch((e) => console.log(e));
    }
    return (
        <MainView noSettingsImage={true} title={"Profil Bilgileriniz"} onPressHeader={() => navigation.goBack()}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
