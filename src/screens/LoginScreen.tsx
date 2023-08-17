import React, { useState } from "react";
import { Animated, Image, View } from "react-native";
import LoginCard from "../components/cards/LoginCard";
import { CustomButton } from "../components/buttons/CustomButton";
import { CustomInputs } from "../components/inputs/CustomInputs";
import Value = Animated.Value;
import { useNavigation } from "@react-navigation/native";

const LoginScreen=()=>{
  const [mail,setMail]=useState("")
  const [password,setPassword]=useState("")
  const [isVisibleTxt,setIsVisible]=useState(false)
  const navigation=useNavigation()
  return(
    <View style={{margin:10}}>
      {isVisibleTxt?null: <Image   source={require("../assets/icons/iconLogo.jpg")}
                                   style={{ width:'100%',height:400,marginTop:-10}}
                                   resizeMode={"contain"}/>}

      <CustomInputs placeholder={"Mail Giriniz"} inputStyle={{marginTop:0}}
      onChange={(x:any)=>setMail(x)} onFocus={()=>setIsVisible(true)} onBlur={()=>setIsVisible(false)} />
      <CustomInputs placeholder={"Şifre Giriniz"}
                    onChange={(x:any)=>setPassword(x)} onFocus={()=>setIsVisible(true)} onBlur={()=>setIsVisible(false)}/>
      <CustomButton text={"Giriş Yap"} onPress={()=>console.log()}/>
      <CustomButton text={"Kayıt Ol"} buttonStyle={{backgroundColor:'white'}} onPress={()=>navigation.navigate('Register')}/>
    </View>
  )
}
export default LoginScreen
