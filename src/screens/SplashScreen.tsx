import React, {useEffect} from "react";
import {Animation} from "../components/cards/Animation";
import {MainView} from "../components/cards/MainView";
import {Image, Text, View} from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LoginUserControl} from "../helpers/Helpers";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setUserInfo} from "../redux/Slice";

export const SplashScreen=()=>{
    const dispatch=useDispatch()
    const navigation=useNavigation()
    useEffect(() => {
      getLocalStoreUserData()
    }, []);
    const checkUser=(data:object)=>{
        const mail=data.mail
        const password=data.password
       LoginUserControl(mail,password).then((x)=>{
           dispatch(setUserInfo({userName:x._data.name,userSurname:x._data.surname,userMail:x._data.email,userPassword:x._data.password}))
           navigation.navigate("Home")
       }).catch(()=>navigation.navigate("Login"))
    }
        const getLocalStoreUserData=async()=>{
               const data=await AsyncStorage.getItem('userInfo')
              if(data){
                  checkUser(JSON.parse(data))
              }else{
                 setTimeout(()=>{ navigation.navigate("Login")},1500)
              }
        }
    return(
      <MainView noHeader={true}>
          <View style={{alignItems:'center',backgroundColor:'white',borderRadius:5,flex:1,justifyContent:'center'}}>
             <View style={{}}>
                 <Image source={require('../assets/icons/dietfriend.png')} />
             </View>
              <LottieView source={require('../assets/animation/splashScreen.json')} autoPlay loop
                          style={{width:'100%',height:'50%'}}/>
          </View>
      </MainView>
    )
}
