import React, {useEffect, useState} from "react";
import {MainView} from "../components/cards/MainView";
import {Text, View} from "react-native";
import {CustomText} from "../components/text/CustomText";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {customAlert} from "../helpers/Helpers";
import {addUserTargets} from "../actions/Firestore";
import {useSelector} from "react-redux";


export const CalorieTrackingScreen=()=>{
    const {userInfo} = useSelector(state => state.user)
    const [nowWeight,setNowWeight]=useState(null)
    const [targetWeight,setTargetWeight]=useState(null)
    const [targetDay,setTargetDay]=useState(null)
    const [dailyWeight,setDailyWeight]=useState(null)

    useEffect(() => {
        getTargetData()
    }, []);
    const getTargetData=async()=>{
        const data=await AsyncStorage.getItem("userTargets")
        const formatData=JSON.parse(data)
        setNowWeight(formatData.nowWeight)
        setTargetWeight(formatData.targetWeight)
        setTargetDay(formatData.targetDay)
    }
    const saveTarget=async()=>{
        console.log("")
        const data={nowWeight:nowWeight,targetDay:targetDay,targetWeight:targetWeight}
        AsyncStorage.setItem('userTargets',JSON.stringify(data)).then(()=>getTargetData()).catch(()=>customAlert(false))
        addUserTargets(nowWeight,targetWeight,targetDay,userInfo.userId)

    }
    const targetWeightFunction=()=>{
        return(
            <View>
               <CustomText text={"Kalori Takibi Yapmak İçin İlgili Alanları Doldurunuz"}/>
                <CustomInputs placeholder={"Şuanki Kilonuz"} keyboardType={"number"} onChange={(x:number)=>setNowWeight(x)}/>
                <CustomInputs placeholder={"Hedef Kilonuz"} keyboardType={"number"} onChange={(x:number)=>setTargetWeight(x)}/>
                <CustomInputs placeholder={"Hedef Gün"} keyboardType={"number"} onChange={(x:number)=>setTargetDay(x)}/>
                <CustomButton text={"Tamamla"} onPress={()=>saveTarget()} />
            </View>
        )
    }
    const sendDailyWeight=()=>{

    }
    const addDailyWeight=()=>{
        return(
           <View>
               <CustomInputs placeholder={"Bugün ki Kilonuzu Girmediniz"} keyboardType={"number"} onChange={(x:number)=>setDailyWeight(x)}/>
                <CustomButton text={"Gönder"} onPress={()=>sendDailyWeight()} />
           </View>
        )
    }
    return(
        <MainView noBack={true}>
            {targetWeight==null&&targetWeightFunction()}
            {addDailyWeight()}
        </MainView>
    )
}
