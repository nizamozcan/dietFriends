import React from "react";
import {FlatList, Text, View} from "react-native";

export const ReplyCommentCard = (props: any) => {
    const renderItem = ({item}: { item: any }) => {
        return(
            <View>
                <Text>{item.userName}</Text>
            </View>
        )
    }
    return (
        <View>
            <FlatList data={props.data} renderItem={(item) => renderItem(item)}/>
        </View>
    )
}
