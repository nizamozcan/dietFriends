import React, {useEffect, useState} from "react";
import { StyleSheet, Keyboard,Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";


type Props = {
  inputStyle?: ViewStyle,
  placeholder?:string,
  onChange?:any,
  onFocus?:()=>void,
  onBlur?:()=>void,
  value?:string,
  multiline?:boolean,
  disabled?:boolean,
  keyboardType?:string,
  maxSize?:number
  secureTextEntry?:boolean
};
export const CustomInputs=(props:Props)=>{
  return(
       <View style={{marginTop:8}}>
         <Text style={{marginBottom:-4,color:'orange'}}>{props.placeholder}</Text>
         <TextInput
             {...props}
             secureTextEntry={props.secureTextEntry}
             autoCapitalize={"none"}
             placeholder={props.placeholder}
             placeholderTextColor={'grey'}
             style={{...styles.inputStyle, ...props.inputStyle}}
             onChangeText={props.onChange}
             onFocus={props.onFocus}
             maxLength={props.maxSize}
             keyboardType={props.keyboardType=="number"?'numeric':"default"}
             onBlur={props.onBlur}
             value={props.value}
             //multiline = {true}
             numberOfLines = {10}
             editable={props.disabled ? false : true}
         />
       </View>
    )
}
const styles=StyleSheet.create({
  inputStyle: {
    fontSize: 18,
    fontFamily: "HelveticaNeue",
    fontWeight: "500",
    borderRadius: 5,
    backgroundColor: "white",
    height: 60,
    color: "black",
    borderWidth:0.5,
    borderColor:'grey',
    padding: 10,
    marginTop: 10,
  },
})
