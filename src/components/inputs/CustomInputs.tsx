import React, { useState } from "react";
import { StyleSheet, Keyboard,Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";


type Props = {
  inputStyle?: ViewStyle,
  placeholder?:string,
  onChange?:any,
  onFocus?:()=>void
  onBlur?:()=>void
};
export const CustomInputs=(props:Props)=>{
  return(
    <TextInput
      {...props}
      autoCapitalize={"none"}
      placeholder={props.placeholder}
      placeholderTextColor={'grey'}
      style={{...styles.inputStyle, ...props.inputStyle}}
      onChangeText={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}


    />  )
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
    padding: 10,
    marginTop: 10
  },
})
