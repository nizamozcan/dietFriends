import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import {useNavigation} from "@react-navigation/native";
import {Alert} from "react-native";
import {firebase} from "@react-native-firebase/auth";

export const RegisterUser=async(name:string,surname:string,email:string,password:string)=>{
    const token=await messaging().getToken()
    await firestore().collection("users").add({
    email:email,
        name:name,
        password:password,
        surname:surname,
        token:token
    })
}
export const sendDietList=async(title:string,value:string,day:number,positiveComment:string,rating:number,disadvantage:string,userInfo?:object)=>{
    const date = firebase.firestore.Timestamp.fromDate(new Date());
    const formatDate = date.toDate();
   return await firestore().collection("dietLists").add({
        positiveComment:positiveComment,
        disadvantage:disadvantage,
        name:title,
        value:value,
        day:day,
        rating:rating,
        createDate:formatDate,
        userInfo:userInfo
    }).then((x)=>{return Promise.resolve(x)}).catch(()=>{return Promise.reject()})
}
export const getHomeData=async()=>{
    const data=await firestore().collection("dietLists").get()
    if(data)
    return data
}
export const updateUser=async(userId:string,data:object)=>{
    const response=await firestore().collection("users").doc(userId).update(data)
    return data
}
export const addComment=async(dietId:string,userId:string,comment:string,userImage:string,userName:string)=>{
    console.log("----")
    console.log(dietId)
    console.log(userId)
    console.log(comment)
    console.log(userImage)
    console.log(userName)

    const response=await firestore().collection("dietLists").doc(dietId).collection("comments").add({name:"asdasad"})

}
