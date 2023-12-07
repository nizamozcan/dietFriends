import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import Timestamp = FirebaseFirestoreTypes.Timestamp;

export interface ICalorieData {
    nowWeight?:string
    targetDay?:string
    targetWeight?:string
    userId?:string
    userTarget?:IUserDaily[]
}
export interface IUserDaily{
    dailyWeight?:string
    date?:Timestamp
    userId?:string
}
