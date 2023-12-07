import React, {useEffect, useState} from "react";
import {MainView} from "../components/cards/MainView";
import { FlatList, ScrollView, View} from "react-native";
import {CustomText} from "../components/text/CustomText";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {CustomButton} from "../components/buttons/CustomButton";
import {checkInput, customAlert, helperTimestampDate} from "../helpers/Helpers";
import {addDailyWeight, addUserDailyWeight, addUserTargets, getUserTargets} from "../actions/Firestore";
import {useSelector} from "react-redux";
import {ICalorieData} from "../interfaces/CalorieData";
import {BarChart, LineChart} from "react-native-chart-kit";
import {firebase} from "@react-native-firebase/auth";
import {isNotNull} from "../helpers/isNullHelper";
import {useNavigation} from "@react-navigation/native";
import {Animation} from "../components/cards/Animation";


export const WeightTrackingScreen = () => {
    const navigation=useNavigation()
    const {userInfo} = useSelector(state => state.user)
    const [animation, setAnimation] = useState(false)
    const [nowWeight, setNowWeight] = useState(null)
    const [targetWeight, setTargetWeight] = useState(null)
    const [dailyWeight, setDailyWeight] = useState()
    const [userTarget,setUserTarget]=useState()
    const [totalWeight,setTotalWeight]=useState([])
    const [totalDate,setTotalDate]=useState([])

    useEffect(() => {
        setAnimation(true)
        getTargetData()
    }, []);
    const getTargetData = async () => {
        const date = firebase.firestore.Timestamp.fromDate(new Date());
        const formatDate=helperTimestampDate(date)
        const data: ICalorieData = await getUserTargets(userInfo.userId)
         setTargetWeight(data?.targetWeight)
         setNowWeight(data?.nowWeight)
         setUserTarget(data?.userTarget)

        let cartArray=[]
        let dayCartArray=[]

        data?.userTarget?.map((x,key)=>{
            cartArray?.push(x?.dailyWeight)
            dayCartArray?.push(key+1)

        })
        setTotalWeight(cartArray)
        setTotalDate(dayCartArray)
        setAnimation(false)
    }
    const saveTarget = async () => {
        if(!isNotNull(nowWeight)){
            customAlert(false,"Lütfen Şuanki Kilonuzu Giriniz");
        }
        else if (!isNotNull(targetWeight)){
            customAlert(false,"Lütfen Hedef Kilonuzu Giriniz");

        }else{
            await addUserTargets(nowWeight, targetWeight, userInfo.userId)
           await addUserDailyWeight(nowWeight,userInfo.userId)
           await getTargetData()
        }


    }
    const targetWeightFunction = () => {
        return (
            <View style={{marginTop:16}}>
                <CustomText text={"Kalori Takibi Yapmak İçin İlgili Alanları Doldurunuz"}/>
                <CustomInputs value={nowWeight} maxSize={3} placeholder={"Şuanki Kilonuz"} keyboardType={"number"}
                              onChange={(x: number) =>checkInput(x,"weight").then((value)=>setNowWeight(value)).catch(()=>setNowWeight()) }/>
                <CustomInputs value={targetWeight} maxSize={3} placeholder={"Hedef Kilonuz"} keyboardType={"number"}
                              onChange={(x: number) =>checkInput(x,"weight").then((value)=> setTargetWeight(value)).catch(()=>setTargetWeight(""))}/>

                <CustomButton text={"Tamamla"} onPress={() => saveTarget()}/>
            </View>
        )
    }

    const sendDailyWeight =async () => {
        setAnimation(true)
        setDailyWeight("")

       if(!isNotNull(dailyWeight))
       {
           customAlert(false,"Lütfen Günlük Kilonuzu Boş Girmeyiniz")
       }else{
           await addUserDailyWeight(dailyWeight, userInfo.userId)
           getTargetData()
       }
    }

    const addDailyWeight = () => {
        return (
            <View>
                <CustomInputs maxSize={3} value={dailyWeight} placeholder={"Kilonuzu Giriniz"} keyboardType={"number"}
                              onChange={(x: string) => checkInput(x,"weight").then((value)=>setDailyWeight(value)).catch(()=>setDailyWeight(""))}/>
                <CustomButton buttonStyle={{backgroundColor: 'white'}} text={"Gönder"} onPress={() => sendDailyWeight()}/>
            </View>
        )
    }

    const data = {
        labels:totalDate,
        datasets: [
            {
                data: totalWeight
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "orange",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3

        barPercentage: 0.5,

    };
    const renderItem=({item})=>{
        return(
            <View style={{elevation:2,shadowColor:'orange',height:60,justifyContent:'center',alignItems:'center'}}>
                <CustomText text={helperTimestampDate(item.date)}/>
                <CustomText text={ item.dailyWeight}/>
            </View>
        )
    }
    const listHeader=()=>{
        return(
            <View style={{flexDirection:'row',backgroundColor:'orange',height:60,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                <CustomText title={true} text={"Başlangıç Kilonuz: "+nowWeight}/>
                <CustomText title={true} text={" - "}/>
                <CustomText title={true} text={"Hedef Kilonuz:"+targetWeight}/>
            </View>
        )
    }
    return (
        <MainView noBack={true} settingsNavigation={()=>navigation.navigate("Setting")}>
            <ScrollView>
                <Animation loading={animation} waitScreen={true}/>
                {totalWeight == false && targetWeightFunction()}
                {totalWeight !=false && <View>
                    {addDailyWeight()}
                    <BarChart
                        data={data}
                        style={{backgroundColor:'orange',borderRadius:10,padding:4,marginVertical:16}}
                        width={350}
                        height={300}
                        yAxisSuffix="kg"
                        chartConfig={chartConfig}
                        verticalLabelRotation={0}
                    />
                    <FlatList  scrollEnabled={false}
                               style={{marginBottom:16}}
                               data={userTarget}
                               renderItem={(item)=>renderItem(item)}
                               ListHeaderComponent={()=>listHeader()}
                    />

                </View>
                }


            </ScrollView>
        </MainView>
    )
}
