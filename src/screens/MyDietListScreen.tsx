import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import database from "@react-native-firebase/database";
import FormatData from "../Formats/FormatData";
import {firebase} from "@react-native-firebase/auth";
import {MainView} from "../components/cards/MainView";

export const MyDietListScreen = () => {
    const [myDietList,setMyDietList]=useState([])
    useEffect(() => {
        getData()
    }, []);
    const getData = async () => {
        const user = await firebase.auth().currentUser;
        let uid = user?.uid
        database()
            .ref("/userData")
            .once("value")
            .then(snapshot => {
                const dataFormat = FormatData(snapshot.val());
               let data= dataFormat.filter((item)=>item.uid==uid)

               setMyDietList(data)
            });

    }
    const renderItem=({item})=>{
        console.log(item)
        return(
            <View style={{backgroundColor:'black'}}>
                <Text>
                    {item.comment}
                </Text>
            </View>
        )
    }
    return (
        <MainView>
            <FlatList data={myDietList} renderItem={(item)=>renderItem(item)}/>
        </MainView>
    )
}
