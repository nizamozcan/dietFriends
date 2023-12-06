import {Alert} from "react-native";

export const CustomAlerts=(title?:string,body?:string)=>{

    Alert.alert(
        title,
        //body
        body,
        [
            {
                text: 'Kapat',
            }
        ],
        {cancelable: false},
    );
}
