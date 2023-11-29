import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {IGetHomeData} from "../../interfaces/HomeData";
import {AirbnbRating} from "react-native-ratings";

export const DietListCard = ({data}: { data: IGetHomeData }) => {

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Image source={{uri:data.userInfo.userImage}}
                       style={{height: 30, width: 30, borderRadius: 30}}/>
                <Text style={{paddingLeft:16,fontWeight: 'bold', fontSize: 18}}>{data?.userInfo?.userName}</Text>
            </View>

           <View style={styles.commentView}>
               <View>
                   <Text style={{fontWeight:'bold'}}>Diyet Detayı</Text>
                   <Text numberOfLines={1}>{data?.value}</Text>
               </View>
               <View>
                   <Text style={{fontWeight:'bold'}}>Bu Diyetin Artı Yönleri</Text>
                   <Text numberOfLines={1}>{data?.positiveComment}</Text>
               </View>
               <View>
                   <Text style={{fontWeight:'bold'}}>Bu Diyetin Eksi Yönleri</Text>
                   <Text numberOfLines={1}>{data?.disadvantage}</Text>
               </View>
               <View>
                   <Text style={{fontWeight:'bold'}}>Kaç Gün Uyguladım</Text>
                   <Text numberOfLines={1}>{data?.day} gün</Text>
               </View>
               <View>
                   <Text style={{fontWeight:'bold'}}>Diyete Ortalama Yıldızım</Text>
                   <AirbnbRating
                       count={5}
                       defaultRating={data.rating}
                       size={18}
                       starContainerStyle={{backgroundColor: "transparent",alignSelf:'flex-start'}}
                       selectedColor={"orange"}
                       showRating={false}
                       isDisabled={true}
                   />
               </View>
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
        padding:4,

    },
    commentView:{
        flex:1,paddingVertical:16,paddingHorizontal:8
    }
})
