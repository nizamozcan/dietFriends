import React from "react";
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
    title:string;
    navigation?:()=>void;
}
export const Header=(props:Props)=>{
    let icon="<"
    return(
        <SafeAreaView style={{flexDirection:'row',height:75,alignSelf:'center',backgroundColor:'#75c9b7',borderRadius:20}}>
            <TouchableOpacity onPress={props.navigation} style={{justifyContent:'center',paddingLeft:8}}>
                <Icon name="chevron-back-outline" size={30} color="white" />
            </TouchableOpacity>
<View style={{justifyContent:'center',alignItems:'center',flex:1}}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{props.title}</Text>

</View>
        </SafeAreaView>
    )
}
