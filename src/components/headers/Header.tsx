import React from "react";
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    title: string;
    navigation?: () => void;
}

export const Header = (props: Props) => {
    return (
        <SafeAreaView style={{
            flexDirection: 'row',
            height: 100,
            alignSelf: 'center',
            backgroundColor: 'white',
        }}>
            <TouchableOpacity onPress={props.navigation} style={{justifyContent: 'center', paddingLeft: 8}}>
                <Icon name="chevron-back-outline" size={30} color="#412a01"/>
            </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#412a01'}}>{props.title}</Text>
                <Text style={{color:'#412a01'}}>✧ Sağlıklı Alışkanlıklar ≃ Başarılı Bir Hayat ✧</Text>
            </View>
        </SafeAreaView>
    )
}
