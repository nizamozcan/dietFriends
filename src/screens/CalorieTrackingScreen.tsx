import React, {useEffect, useState} from "react";
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {MainView} from "../components/cards/MainView";
import {useNavigation} from "@react-navigation/native";
import {addUserFoods, getFoodDatas} from "../actions/Firestore";
import {SelectList} from 'react-native-dropdown-select-list'
import {MultipleSelectList} from "react-native-dropdown-select-list/index";
import {CustomText} from "../components/text/CustomText";
import {CustomButton} from "../components/buttons/CustomButton";
import {useSelector} from "react-redux";
import {customAlert, getTodayDate, helperTimestampDate} from "../helpers/Helpers";
import {Animation} from "../components/cards/Animation";
import DatePicker from "react-native-date-picker";

export const CalorieTrackingScreen = () => {
    const {userInfo} = useSelector(state => state.user)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [animation, setAnimation] = useState(false)
    const navigation = useNavigation()
    const [selected, setSelected] = useState([])
    const [totalCalorie, setTotalCalorie] = useState()
    const [totalFood, setTotalFood] = useState()
    const [responseData, setData] = useState([])
    useEffect(() => {
       setAnimation(true)
        getUserData()
    }, []);
    const getUserData = async () => {
        const response = await getFoodDatas(userInfo.userId)
        setData(response[0]?._data?.dataArray)
        setAnimation(false)
    }
    const data = [
        {key: '1', value: 'Ekmek', calorie: 50},
        {key: '2', value: 'İskender', calorie: 400},
        {key: '3', value: 'Cipsi', calorie: 500},
        {key: '4', value: 'Kola', calorie: 200},
        {key: '5', value: 'Tavuk Döner', calorie: 300},
        {key: '6', value: 'Et Döner', calorie: 340},
        {key: '7', value: 'Çorba', calorie: 200},
        {key: '8', value: 'Pide', calorie: 600},
        {key: '9', value: 'Çikolata', calorie: 400},
        {key: '10', value: 'Haşlanmış Et', calorie: 300},

    ]
    useEffect(() => {
        let dataArray = []
        let totalCalorie = 0
        selected.map((x) => {
            const response = data?.find((item) => item.value == x)
            totalCalorie = totalCalorie + response?.calorie
            dataArray.push(response)
        })
        setTotalCalorie(totalCalorie)
        setTotalFood(dataArray)
    }, [selected]);
    const renderItem = ({item}: { item: any }) => {
        let totalCalorie = 0
        return (
            <View style={{backgroundColor: '#F9F9F9', elevation: 1, marginVertical: 8, borderRadius: 8, padding: 8}}>
                <Text style={{fontWeight: '600', color: 'black'}}>{helperTimestampDate(item.date)}</Text>
                <View>
                    {item?.userData?.map((value: any, key: string) => {
                        totalCalorie = totalCalorie + value.calorie
                        return (
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 0.6, flexDirection: 'row'}}>
                                    <CustomText style={{flex: 1}} text={value.value}/>
                                    <CustomText text={value.calorie}/>
                                    <CustomText style={{color: 'grey'}} text={" kcal"}/>
                                </View>
                                {item?.userData?.length == key + 1 && <View style={{flex: 0.4, marginTop: -24}}>
                                    <View style={{alignItems: 'center'}}>
                                        <View>
                                            <Text style={{color: 'black', opacity: 0.5}}>Toplam Kalori</Text>
                                            <Text
                                                style={{color: 'black'}}>{item?.userData?.length == key + 1 && totalCalorie}
                                            </Text>
                                        </View>

                                    </View>
                                </View>}
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
    const adduserFood = async () => {
        setAnimation(true)
        await addUserFoods(totalFood, userInfo.userId,date).then(() => setTimeout(() => {
            customAlert(true, "Listeye Eklendi")
        }, 1000)).catch()
        await getUserData()
    }
    return (
        <MainView noBack settingsNavigation={() => navigation.navigate("Setting")}>

            <ScrollView>
                <Animation loading={animation} waitScreen={true}/>
                <FlatList
                    scrollEnabled={false}
                    data={responseData}
                    renderItem={(item) => renderItem(item)}
                    ListHeaderComponent={<View style={{
                        backgroundColor: 'orange',
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginTop: 16
                    }}><CustomText title={true} text={"Günlük Olarak Tükettiğiniz Besinler"}/></View>}/>
                <View style={{marginTop: 32}}>
                    <TouchableOpacity style={{marginVertical: 16}} onPress={() => setOpen(true)}>
                        <CustomText text={"Tarihi Değiştirmek İçin Tıklayınız"}/>
                        <CustomText style={{fontWeight: 'bold'}} text={getTodayDate(date.toISOString())}/>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />

                    <CustomText text={"Günlük Yediklerinizi Giriniz"}/>
                    <MultipleSelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                        label="Yemekler"
                        dropdownTextStyles={{color: 'black'}}
                        placeholder={"Lütfen Bugün Yediklerinizi Giriniz"}
                    />

                    <CustomText text={"Toplam Kalori :" + totalCalorie}/>
                    <CustomButton text={"Ekle"} onPress={() => adduserFood()} buttonStyle={{backgroundColor: 'white'}}/>
                </View>
            </ScrollView>

        </MainView>
    )
}
