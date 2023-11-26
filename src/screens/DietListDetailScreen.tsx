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



export const DietListDetailScreen = (props) => {

    const [comments, setComments] = useState([])
    const [text, setText] = useState("")
    const navigation = useNavigation()
    const [animation,setAnimation]=useState(true)
    let data = props?.route?.params?.data
    useEffect(() => {

        getCommentData()
    },[]);
    useEffect(() => {
       let databaseRef= database().ref(`/userData/${data?.id}/comments`)
        const onDataChange = (snapshot) => {
            // Veri değiştiğinde bu işlev tetiklenir
            getCommentData()
        };
        databaseRef.on('value', onDataChange);
    },[]);
    async function getCommentData() {

        await database()
            .ref(`/userData/${data?.id}/comments`)
            .once('value')
            .then(snapshot => {
                setTimeout(()=>{
                    setAnimation(false)

                },1000)
                const dataFormat = FormatData(snapshot.val())
                let reverseData=dataFormat.slice().reverse();
                 setComments(dataFormat);
              // setComments(reverseData)
            });
    }

    const renderItem = ({item}:{item:any}) => {
        return (

            <View style={{minHeight: 80, backgroundColor: 'white', marginVertical: 8, borderRadius: 20, padding: 8}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{
                        fontWeight: 'bold',
                        backgroundColor: 'blue',
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        textAlign: 'center',
                        color: 'white',
                        textAlignVertical: 'center',
                    }}>N</Text>
                    <Text style={{paddingLeft: 16, fontWeight: 'bold', color: 'black'}}>{item.userName}</Text>
                </View>

            </View>
        )
    }
    const sendComment = async () => {
        setText("a")
        let userData = await auth().currentUser;
        let userUid = userData?.uid
        let userName = userData?.displayName
        database()
            .ref(`/userData/${data?.id}/comments`).push({
            text,
            userUid,
            userName
        })

    }
    return (
        <MainView title={"Detay"} onPressHeader={() => navigation.goBack()}>
            <Animation loading={true} isVisible={animation} />
            <ScrollView style={{flex: 1}}>
                <DietListCard displayName={data?.displayName} title={data?.title} value={data?.value} />
                <Text>Yorumlar</Text>
                <FlatList data={comments} renderItem={(item) => renderItem(item)}
                />
                <View style={{justifyContent: 'flex-end', flex: 1}}>
                    <CustomInputs placeholder={"Yorum Yapın"} onChange={(x: string) => setText(x)}/>
                    <CustomButton text={"Gönder"} onPress={() => sendComment()}/>
                </View>

            </ScrollView>
        </MainView>
    )
}
