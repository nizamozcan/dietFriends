import React from "react";
import {Modal, Text, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props{
    type:"succes"|"error"|"warning"
    title?:string
    value?:string
}
export const AlertModal=(props:Props)=>{
const {type,title,value}=props
    return(
       <Modal visible={true} transparent       animationType="slide"
       >
            <View style={{flex:1,justifyContent:'center'}}>
               <View style={{justifyContent:'center',alignItems:'center',height:'25%',marginHorizontal:20,backgroundColor:'white',borderRadius:20}}>
                   {type == "succes" ?
                       <Icon name="checkmark-circle" size={50} color="green"/> : type == "warning" ?
                       <Icon name="information-circle" size={50} color="orange"/> :
                       <Icon name="close-circle" size={50} color="red"/>}
                       <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>{title}</Text>
                        <Text style={{color:'black'}}>{value}</Text>
               </View>

            </View>
       </Modal>
    )
}
