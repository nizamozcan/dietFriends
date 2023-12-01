import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Image, TextInput} from "react-native";
import {Colors} from "../assets/colors/Colors";
import database from "@react-native-firebase/database";
import FormatData from "../Formats/FormatData";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {MainView} from "../components/cards/MainView";
import {Animation} from "../components/cards/Animation";
import {DietListCard} from "../components/cards/DietListCard";
import {getHomeData} from "../actions/Firestore";

const HomeScreen = (props) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getData();
        }, [])
    );
    const getData = async () => {
        const firebaseData=await getHomeData()
        setData(firebaseData?._docs)
    };

    const renderItem = ({item}:{item:object}) => {
        console.log()
    return <TouchableOpacity onPress={()=>navigation.navigate("DietDetail",{data:item._data,dietId:item._ref._documentPath._parts[1]})}><DietListCard data={item._data}/></TouchableOpacity>
    };

    return (
        <MainView bodyStyle={{paddingHorizontal:0}} title={""}  noBack={true}  settingsNavigation={()=>navigation.navigate("Setting")}>
            <FlatList data={data} renderItem={renderItem} showsVerticalScrollIndicator={false}/>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate("AddDiet")}><Text
                style={{
                    fontSize: 40,
                    fontWeight: "300",
                    alignSelf: "center",
                    color: "white"
                }}>+</Text></TouchableOpacity>
        </MainView>
    );
};
export default HomeScreen;
const styles = StyleSheet.create({
    buttonStyle: {
        position: "absolute",
        right: 10,
        bottom: 10,
        backgroundColor: 'grey',
        width: 75,
        height: 75,
        justifyContent: "center",
        borderRadius: 75
    }
});
