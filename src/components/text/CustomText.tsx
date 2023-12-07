import {Text, TextStyle, ViewStyle} from "react-native";

export  const CustomText=({text,title, style}:{text:string,title?:boolean,style?:TextStyle})=>{
    if(title){
        return <Text style={{color:'white',fontWeight:'bold',...style}}>{text}</Text>
    }else{
        return <Text style={{color:'black',...style}}>{text}</Text>
    }

}
