import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native";
import {Header} from "../components/headers/Header";
import {CustomInputs} from "../components/inputs/CustomInputs";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import FormatData from "../Formats/FormatData";
import {MainView} from "../components/cards/MainView";
import {CustomButton} from "../components/buttons/CustomButton";
import {Animation} from "../components/cards/Animation";
import {DietListCard} from "../components/cards/DietListCard";
import {IGetHomeData} from "../interfaces/HomeData";
import {addComment} from "../actions/Firestore";
import {useSelector} from "react-redux";



export const DietListDetailScreen = (props) => {
    const navigation=useNavigation()
    const data: IGetHomeData=props?.route?.params?.data
    const dietId: IGetHomeData=props?.route?.params?.dietId
    const [comment,setComment]=useState("deneme")
    const {userInfo} = useSelector(state => state.user)
    const renderCommentData=(item:any)=>{

        return(
            <View>
                <View>

                </View>
                <View>

                </View>

            </View>
        )
    }
    return (
        <MainView title={data.name} bodyStyle={{paddingHorizontal:8}} onPressHeader={() => navigation.goBack()}>
            <DietListCard data={data} detail={true}/>
            <View style={{flex:1}}>
                <FlatList data={[]} renderItem={(item)=>renderCommentData(item)}/>
                <TouchableOpacity onPress={()=>addComment(dietId,userInfo.userId,comment,data.userInfo.userImage,userInfo.userName)}>
                    <Text>Yorum Yap</Text>
                </TouchableOpacity>
            </View>
        </MainView>
    )
}
