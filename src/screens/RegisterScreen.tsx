import React, { useState } from "react";
import { Image, ScrollView, View,Alert } from "react-native";
import { CustomInputs } from "../components/inputs/CustomInputs";
import { CustomButton } from "../components/buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

const RegisterScreen=()=>{
  const [mail,setMail]=useState("")
  const [password,setPassword]=useState("")
  const [isVisibleTxt,setIsVisible]=useState(false)
  const navigation=useNavigation()
  const registerUser =async()=>{
      auth().createUserWithEmailAndPassword(mail,password).then(x=>Alert.alert("Başarılı Kayıt")).catch(x=>Alert.alert("Hatalı kayıt"))
  }
  return(
    <View style={{margin:10}}>
     <ScrollView>
       {isVisibleTxt?null: <Image   source={require("../assets/icons/iconLogo.jpg")}
                                    style={{ width:'100%',height:400,marginTop:-10}}
                                    resizeMode={"contain"}/>}

       <CustomInputs placeholder={"Mail Giriniz"} inputStyle={{marginTop:0}}
                     onChange={(x:any)=>setMail(x)} onFocus={()=>setIsVisible(true)} onBlur={()=>setIsVisible(false)} />
       <CustomInputs placeholder={"Şifre Giriniz"}
                     onChange={(x:any)=>setPassword(x)} onFocus={()=>setIsVisible(true)} onBlur={()=>setIsVisible(false)}/>
       <CustomInputs placeholder={"Şifreyi Tekrar Giriniz"}
                     onChange={(x:any)=>setPassword(x)} onFocus={()=>setIsVisible(true)} onBlur={()=>setIsVisible(false)}/>
       <CustomButton text={"Kayıt Ol"} onPress={()=>registerUser()}/>

       <CustomButton text={"Geri"} buttonStyle={{backgroundColor:'white'}} onPress={()=>navigation.goBack()}/>

     </ScrollView>
    </View>
  )
}
export default RegisterScreen
