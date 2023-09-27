import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native";
import {Header} from "../components/headers/Header";
import {CustomInputs} from "../components/inputs/CustomInputs";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import FormatData from "../Formats/FormatData";
import {MainView} from "../components/cards/MainView";

interface Props {
    data: object
}

export const DietListDetailScreen = (props) => {
    const navigation = useNavigation()
    let data = props?.route?.params?.data
    useEffect(() => {
        getCommentData()
    }, []);

    async function getCommentData() {
        await database()
            .ref(`/userData/${data.id}/comments`)
            .once('value')
            .then(snapshot => {
                const dataFormat = FormatData(snapshot.val());
                // setComments(dataFormat);
                setComments(dataFormat)
            });
    }

    const [comments, setComments] = useState([])
    const [text, setText] = useState("")
    const renderItem = ({item}) => {
        console.log(item)
        return (
            <View style={{minHeight:80,backgroundColor:'white',marginVertical:8,borderRadius:20,padding:8}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold',backgroundColor:'blue',width:30,height:30,borderRadius:30,textAlign:'center',color:'white',textAlignVertical:'center',}}>N</Text>
                    <Text style={{paddingLeft:16,fontWeight:'bold',color:'black'}}>{item.userName}</Text>
                </View>
                <Text style={{color:'black'}}>{item.text}</Text>
            </View>
        )
    }
    const sendComment = async () => {
        let userData = await auth().currentUser;
        let userUid = userData?.uid
        let userName = userData?.displayName
        /* database()
             .ref(`/userData/${data.id}/comments`)
             .once('value')
             .then(snapshot => {
                 console.log('User data: ', snapshot.val());
             });*/
        database()
            .ref(`/userData/${data.id}/comments`).push({
            text,
            userUid,
            userName
        })
    }
    return (
        <ScrollView style={{flex: 1}}>
            <Header title={"Diyet Detayı"} navigation={() => navigation.goBack()}/>
            <View style={{margin: 16, flex: 1}}>
                <View style={{backgroundColor: 'white', minHeight: 400, borderRadius: 20, padding: 8}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={require('../assets/icons/male_man_people_person_avatar_white_tone_icon_159363.png')}
                            style={{height: 30, width: 30}}/>
                        <Text style={{fontWeight: "600", paddingLeft: 16,alignSelf:'center',color:'black'}}>
                            {data.displayName}
                        </Text>
                    </View>

                    <Text style={{fontSize: 22,color:'black'}}>{data.title}</Text>
                    <Text style={{color:'black'}}>{data.value}</Text>
                </View>


                <Text>Yorumlar</Text>
                    <FlatList data={comments} renderItem={(item) => renderItem(item)}
                    />
                <View style={{justifyContent: 'flex-end', flex: 1}}>
                    <CustomInputs placeholder={"Yorum Yapın"} onChange={(x: string) => setText(x)}/>
                    <TouchableOpacity onPress={() => sendComment()} style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        backgroundColor: 'blue',
                        borderRadius: 10
                    }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Gönder</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}
