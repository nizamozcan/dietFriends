import React, {useState} from "react";
import {Alert, SafeAreaView, ScrollView, Text, View} from "react-native"
import Modal from "react-native-modal";
import {Colors} from "../assets/colors/Colors";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import auth, {firebase} from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import {useNavigation} from "@react-navigation/native";
import {Header2} from "../components/headers/Header2";
import LottieView from "lottie-react-native";
import {Split} from "../components/split/Split";
import {isNotNull} from "../Formats/isNullHelper";
import {Animation} from "../components/cards/Animation";
import {AirbnbRating} from "react-native-ratings";
import {sendDietList} from "../actions/Firestore";
import {useDispatch, useSelector} from "react-redux";

export const AddDietScreen = () => {
    const {userInfo} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [rating, setRating] = useState(0)
    const [datas, setData] = useState({
        title: "",
        value: "",
        day: 0,
        positiveComment: "",
        disadvantage: ""
    })
    const sendData = async () => {

        sendDietList(
            datas.title,
            datas.value,
            datas.day,
            datas.positiveComment,
            rating,
            datas.disadvantage,
            userInfo)
            .then(() => navigation.navigate("Home"))
            .catch(() => Alert.alert("Boş alanları doldurunuz"))


    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Header2 title={"Diyet Detayınız"} navigation={() => navigation.goBack()}/>
                <View style={{flex: 1, margin: 8, backgroundColor: 'white', padding: 8}}>
                    <View style={{alignItems: 'center'}}>
                        <LottieView source={require('../assets/animation/addDiet.json')} autoPlay
                                    style={{width: 200, height: 200}}/>
                        <Text style={{color: 'orange', fontSize: 20}}>Diyetinizi Diğer Kişiler İle Paylaşın</Text>
                    </View>
                    <Split/>
                    <CustomInputs placeholder={"Diyetin Adı"}
                                  onChange={(x: string) => setData((y) => ({...y, title: x}))}/>
                    <CustomInputs keyboardType={"number"}
                                  placeholder={"Kaç gün uyguladınız"}
                                  onChange={(x: number) => setData((y) => ({...y, day: x}))}/>
                    <View style={{marginTop: 16}}>
                        <Text style={{fontSize: 14, color: 'orange', marginBottom: 8}}>Diyetinize kaç puan
                            verirsiniz.</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={1}
                            size={30}
                            starContainerStyle={{backgroundColor: "transparent"}}
                            selectedColor={"orange"}
                            showRating={false}
                            onFinishRating={(x) => setRating(x)}
                        />
                    </View>

                    <CustomInputs placeholder={"Diyetinizi Kısaca Açıklayınız"} multiline={true}
                                  inputStyle={{height: 200, textAlignVertical: "top"}}
                                  onChange={(x: string) => setData((y) => ({...y, value: x}))}/>
                    <CustomInputs placeholder={"Bu Diyet İçin Olumsuz Görüşlerinizi Yazınız"} multiline={true}
                                  inputStyle={{height: 200, textAlignVertical: "top"}}
                                  onChange={(x: string) => setData((y) => ({...y, disadvantage: x}))}/>
                    <CustomInputs placeholder={"Bu Diyet İçin olumlu Görüşlerinizi Yazınız"} multiline={true}
                                  inputStyle={{height: 200, textAlignVertical: "top"}}
                                  onChange={(x: string) => setData((y) => ({...y, positiveComment: x}))}/>
                    <View style={{flexDirection: "row"}}>
                        <CustomButton text={"Paylaş"} buttonStyle={{backgroundColor: "white", flex: 1}}
                                      onPress={sendData}/>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
