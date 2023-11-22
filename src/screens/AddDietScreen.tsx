import React, {useState} from "react";
import {Alert, SafeAreaView, ScrollView, Text, View} from "react-native"
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
import {isNotNull} from "../Formats/isNullHelper";
import {Animation} from "../components/cards/Animation";

export const AddDietScreen = () => {
    const navigation = useNavigation();
    const [isVisible,setIsvisible]=useState(false)
    const [datas, setData] = useState({
        title: "",
        value: "",
        day: 0,
        point: 0,
        comment: ""
    })
    const sendData = async () => {
       await setIsvisible(true)
        setTimeout(()=>{})
        if(isNotNull(datas.title)&&isNotNull(datas.value)&&isNotNull(datas.day)&&isNotNull(datas.point)&&isNotNull(datas.comment)){
            const user = await auth().currentUser?.displayName;
            const uid = auth().currentUser?.uid;
            const data = {
                title: datas.title,
                value: datas.value,
                uid: uid,
                displayName: user,
                date: (new Date()).toISOString(),
                day: datas.day,
                comment: datas.comment,
                point: datas.point
            };
            const response = await database().ref("/userData").push(data);
           if(response){
              setTimeout(()=>{
                  setIsvisible(false)
                  navigation.goBack()
              },1000)
           }
        }
        else{
            setTimeout(()=>{
                setIsvisible(false)
                Alert.alert("Lütfen Boş Alanları Doldurunuz")
            },1000)
        }

    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Animation loading={true} isVisible={isVisible}/>
            <ScrollView style={{flex: 1}}>
                <Header2 title={"Diyet Detayınız"} navigation={() => navigation.goBack()}/>
                <View style={{flex: 1, margin: 8, backgroundColor: 'white', padding: 8}}>
                    <View style={{alignItems: 'center'}}>
                        <LottieView source={require('../assets/animation/addDiet.json')} autoPlay
                                    style={{width: 200, height: 200}}/>
                        <Text style={{color: 'black'}}>Diyetinizi Diğer Kişiler İle Paylaşın</Text>
                    </View>
                    <Split/>
                    <CustomInputs placeholder={"Diyetin Adı"}
                                  onChange={(x: string) => setData((y) => ({...y, title: x}))}/>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <CustomInputs inputStyle={{flex: 0.5}} keyboardType={"number"}
                                      placeholder={"Kaç gün uyguladınız"}
                                      onChange={(x: number) => setData((y) => ({...y, day: x}))}/>
                        <CustomInputs inputStyle={{flex: 0.5, marginLeft: 4}} keyboardType={"number"}
                                      placeholder={"Diyete 1-5 arasında puan veriniz"}
                                      onChange={(x: number) => setData((y) => ({...y, point: x}))}/>
                    </View>
                    <CustomInputs placeholder={"Diyetinizi Kısaca Açıklayınız"} multiline={true}
                                  inputStyle={{height: 400, textAlignVertical: "top"}}
                                  onChange={(x: string) => setData((y) => ({...y, value: x}))}/>
                    <CustomInputs placeholder={"Bu Diyet İçin Görüşlerinizi Yazınız"} multiline={true}
                                  inputStyle={{height: 400, textAlignVertical: "top"}}
                                  onChange={(x: string) => setData((y) => ({...y, comment: x}))}/>
                    <View style={{flexDirection: "row"}}>
                        <CustomButton text={"Paylaş"} buttonStyle={{backgroundColor: "white", flex: 1}}
                                      onPress={sendData}/>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
