import {Image, Text, TouchableOpacity, View} from "react-native";
import {Animation} from "./Animation";
import React from "react";
import {useNavigation} from "@react-navigation/native";

interface Props{
    loading?:boolean
    displayName?:string;
    title?:string;
    value?:string
    day?:number
    uid?:string
}
export const DietListCard=(props:Props)=>{
    const navigation = useNavigation();
    const {loading,value,title,displayName}=props
    return(
        <View style={{
            minHeight: 300,
            backgroundColor: 'white',
            borderColor: '#78633f',
            borderWidth: 0.5,
            elevation: 5,
            marginVertical: 8,
            borderRadius: 16,
            padding: 8
        }}
        >
            <Animation loading={true} isVisible={loading}/>
            <TouchableOpacity style={{flex: 1}}
                              onPress={() => navigation.navigate("DietDetail", {data: props})}>
                <View style={{flex: 0.1, flexDirection: 'row'}}>
                    <Image
                        source={require('../../assets/icons/male_man_people_person_avatar_white_tone_icon_159363.png')}
                        style={{height: 30, width: 30}}/>
                    <Text style={{fontWeight: "600", paddingLeft: 16, color: '#513400'}}>
                        {displayName}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{flex: 4, marginTop: 10, color: '#513400'}}>
                        {title}
                        {value}
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}
