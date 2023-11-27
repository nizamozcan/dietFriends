import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {IGetHomeData} from "../../interfaces/HomeData";

export const DietListCard = ({data}: { data: IGetHomeData }) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Image source={require('../../assets/icons/noImage.png')}
                       style={{height: 30, width: 30, borderRadius: 30}}/>
                <Text style={{paddingLeft:16,fontWeight: 'bold', fontSize: 18}}>{data?.userInfo?.userName}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500,
        backgroundColor: '#F7F7F3',
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
        padding:4
    }
})
