import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {IGetHomeData} from "../../interfaces/HomeData";
import {AirbnbRating} from "react-native-ratings";

export const DietListCard = ({data, detail}: { data: IGetHomeData, detail?: boolean }) => {

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: data.userInfo.userImage}}
                       style={{height: 30, width: 30, borderRadius: 30}}/>
                <Text style={{
                    paddingLeft: 16,
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: 'black'
                }}>{data?.userInfo?.userName}</Text>
            </View>

            <View style={styles.commentView}>
                <Text style={{fontWeight: 'bold', color: 'black', fontSize: 20, textAlign: 'center'}}>
                    {data?.name}
                </Text>
                <View>
                    <Text style={styles.title}>Diyet Detayı</Text>
                    <Text style={styles.value} numberOfLines={detail == true ? 0 : 1}>{data?.value}</Text>
                </View>
                <View>
                    <Text style={styles.title}>Bu Diyetin Artı Yönleri</Text>
                    <Text style={styles.value} numberOfLines={detail == true ? 0 : 1}>{data?.positiveComment}</Text>
                </View>
                <View>
                    <Text style={styles.title}>Bu Diyetin Eksi Yönleri</Text>
                    <Text style={styles.value} numberOfLines={detail == true ? 0 : 1}>{data?.disadvantage}</Text>
                </View>
                <View>
                    <Text style={styles.title}>Kaç Gün Uyguladım</Text>
                    <Text style={styles.value} numberOfLines={detail == true ? 0 : 1}>{data?.day} gün</Text>
                </View>
                <View>
                    <Text style={styles.title}>Diyete Ortalama Yıldızım</Text>
                    <AirbnbRating
                        count={5}
                        defaultRating={data.rating}
                        size={18}
                        starContainerStyle={{backgroundColor: "transparent", alignSelf: 'flex-start'}}
                        selectedColor={"orange"}
                        showRating={false}
                        isDisabled={true}
                    />
                </View>
                {detail != true && (<Text style={{textAlign: 'right', color: 'black'}}>6 kere yorum yapıldı</Text>)}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F3',
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
        padding: 4,

    },
    commentView: {
        flex: 1, paddingVertical: 16, paddingHorizontal: 8, color: 'black'
    },
    title: {fontWeight: 'bold', color: 'black'},
    value: {color: 'black'}
})
