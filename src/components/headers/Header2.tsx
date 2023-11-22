import React from "react";
import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";

interface Props {
    title: string;
    navigation?: () => void;
    noBack?: boolean
    settingsNavigation?: () => void
    noSettingsImage?: boolean
    image?:string
}

export const Header2 = (props: Props) => {
    const {userInfo} = useSelector((state: RootState) => state.user);
    console.log(userInfo)
    return (
        <SafeAreaView style={{
            flexDirection: 'row',
            height: 100, backgroundColor: '#E67402', borderBottomStartRadius: 10, borderBottomEndRadius: 10,
            alignSelf: 'center', borderBottomWidth: 0.5, shadowRadius: 1
        }}>

            {props.noBack == true ?
                <TouchableOpacity onPress={props.settingsNavigation} style={{alignItems:'center',paddingLeft: 8,flexDirection:'row'}}>
                   <Image source={require('../../assets/icons/noImage.png')} style={{width:42,height:42,borderRadius:42}}/>
                    <View style={{padding:8}}>
                        <Text style={{color: 'white',opacity:0.8,fontWeight:'bold'}}>{userInfo.userName}</Text>
                        <Text style={{color: 'white',opacity:0.8}}>Seni zayıflamış gördüm</Text>
                    </View>
                </TouchableOpacity> :
                <TouchableOpacity onPress={props.navigation} style={{justifyContent: 'center', paddingLeft: 8}}>
                    <Icon name="chevron-back-outline" size={30} color="black"/>
                </TouchableOpacity>}

            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text style={{fontSize: 20, color: 'black'}}>{props.title}</Text>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({});
