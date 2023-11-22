import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Image, TextInput} from "react-native";
import {Colors} from "../assets/colors/Colors";
import database from "@react-native-firebase/database";
import FormatData from "../Formats/FormatData";
import {useNavigation} from "@react-navigation/native";
import {MainView} from "../components/cards/MainView";
import {Animation} from "../components/cards/Animation";
import {DietListCard} from "../components/cards/DietListCard";

const HomeScreen = (props) => {
    const [filteretText, setfilteretText] = useState("")
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [headerVisible, setHeaderVisible] = useState(false)
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {

    };
    const filter = (item) => {

    }
    const renderItem = ({item}) => {

        return (
            <DietListCard displayName={item.displayName} title={item.title} loading={loading} value={item.value} uid={item.uid}/>
        );
    };

    return (
        <MainView title={""} noBack={true}  settingsNavigation={()=>navigation.navigate("Setting")}>

            <FlatList data={data} renderItem={renderItem} />
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
