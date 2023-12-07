import React, {useState} from "react";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native";
import {CustomInputs} from "../components/inputs/CustomInputs";
import {MainView} from "../components/cards/MainView";
import {DietListCard} from "../components/cards/DietListCard";
import {IGetHomeData} from "../interfaces/HomeData";
import {addComment, getDietListData} from "../actions/Firestore";
import {useSelector} from "react-redux";
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
                    <Text style={{color: 'black'}}>{item?.comment}</Text>
                    {/* <Text style={{color:'black'}} onPress={() => replyComment(dietId, index)}>Yanıtla</Text>*/}
                    {item?.replyComment?.length > 0 &&
                        <TouchableOpacity onPress={() => {
                            const updatedData = [...visibleData];
                            updatedData[index].visible = true;
                            setVisibleData(updatedData);
                        }}>
                            {visibleData[index].visible == false &&
                                <Text>{item?.replyComment.length} yorumun tümünü gör</Text>}
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
    const updateDate = async () => {
        const data = await getDietListData(dietId)
        setCommentData(data?._data?.userComment)
    }
    const sendComment = async () => {
        await addComment(dietId, userInfo.userId, comment, data.userInfo.userImage, userInfo.userName)
        updateDate()
    }
    return (
        <MainView title={data.name} bodyStyle={{paddingHorizontal: 8}} onPressHeader={() => navigation.goBack()}>
            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <DietListCard data={data} detail={true}/>
                    <View style={{flex: 1}}>
                        <FlatList data={commentData} renderItem={({item, index}) => renderCommentData(item, index)}/>
                    </View>


                </View>
            </ScrollView>
            <View style={{width: '100%'}}>
                <CustomInputs placeholder={"Yorum Yaz"} onChange={(item: string) => setComment(item)}/>
                <TouchableOpacity style={{
                    backgroundColor: 'white', borderColor: 'blue', borderWidth: 1,
                    height: 50,
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onPress={() => sendComment()}>
                    <Text style={{color: 'blue'}}>Yorum Yap</Text>
                </TouchableOpacity>
            </View>
        </MainView>
    )
}
