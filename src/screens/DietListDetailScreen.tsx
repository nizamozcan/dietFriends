import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native"
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
import {IGetHomeData} from "../interfaces/HomeData";
import {addComment, replyComment} from "../actions/Firestore";
import {useSelector} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {ReplyCommentCard} from "../components/cards/ReplyCommentCard";


export const DietListDetailScreen = (props) => {
    const navigation = useNavigation()
    const data: IGetHomeData = props?.route?.params?.data
    const dietId: IGetHomeData = props?.route?.params?.dietId
    const [comment, setComment] = useState("deneme")
    const {userInfo} = useSelector(state => state.user)
    const [commentData, setCommentData] = useState(data?.userComment)
    const [visibleReplyComment, setVisibleReplyComment] = useState(false)
    const [visibleData, setVisibleData] = useState([])
    console.log("userInfo.userName")

    console.log(userInfo)
    const renderCommentData = (item: any, index: number) => {
        const params = {index: index, visible: false}
        visibleData.push(params)
        return (
            <View style={{marginVertical: 8, flexDirection: 'row'}}>
                <Image source={{uri: item.userImage}} style={{height: 40, width: 40, borderRadius: 40}}
                       resizeMode={"contain"}/>
                <View style={{marginLeft: 16}}>
                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold'
                    }}>{item.userId == userInfo.userId ? "Sen" : item.userName}</Text>
                    <Text>{item.comment}</Text>
                    <Text onPress={() => replyComment(dietId, index)}>Yanıtla</Text>
                    {item?.replyComment.length > 0 &&
                        <TouchableOpacity onPress={() => {
                            const updatedData = [...visibleData];
                            updatedData[index].visible = true;
                            setVisibleData(updatedData);
                        }}>
                            {visibleData[index].visible==false&& <Text>{item?.replyComment.length} yorumun tümünü gör</Text>}
                        </TouchableOpacity>}
                    {visibleData[index].visible == true && <View>
                        <ReplyCommentCard data={item?.replyComment}/>
                        <Text onPress={() => {
                            const updatedData = [...visibleData];
                            updatedData[index].visible = false;
                            setVisibleData(updatedData);
                        }}>Kapat</Text>
                    </View>}

                </View>
            </View>
        )
    }
    return (
        <MainView title={data.name} bodyStyle={{paddingHorizontal: 8}} onPressHeader={() => navigation.goBack()}>
            <ScrollView style={{flex: 1}}>
                <DietListCard data={data} detail={true}/>
                <View style={{flex: 1}}>
                    <FlatList data={commentData} renderItem={({item, index}) => renderCommentData(item, index)}/>
                </View>

            </ScrollView>
            <View style={{position: 'absolute', bottom: 10, width: '100%', left: 8}}>
                <CustomInputs placeholder={"Yorum Yaz"} onChange={(item: string) => setComment(item)}/>
                <TouchableOpacity style={{
                    backgroundColor: 'blue',
                    height: 40,
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                                  onPress={() => addComment(dietId, userInfo.userId, comment, data.userInfo.userImage, userInfo.userName)}>
                    <Text style={{color: 'white'}}>Yorum Yap</Text>
                </TouchableOpacity>
            </View>
        </MainView>
    )
}
