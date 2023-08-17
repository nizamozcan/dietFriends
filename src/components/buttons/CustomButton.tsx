import React from "react";
import { ButtonProps, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Colors } from "../../assets/colors/Colors";
import { Styles } from "../../assets/styles/Styles";

export const CustomButton=({text,buttonStyle,onPress}:{text:string,buttonStyle?:ViewStyle,onPress:()=>void})=>{
  console.log(buttonStyle)
  return(
    <TouchableOpacity style={{ ...Styles.buttonDefault, ...buttonStyle }} onPress={onPress}>
      <Text style={buttonStyle?.backgroundColor == "white" ? {
        alignSelf: "center",
        color: Colors.Green,
        fontWeight: 700
      } : { alignSelf: "center", color: "white", fontWeight: 700 }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

