import {Alert} from "react-native";

export const CustomAlerts=(title?:string,body?:string)=>{

    Alert.alert(
        title,
        //body
        body,
        [
            {
                text: 'Kapat',
                onPress: () => console.log('Yes Pressed')
            }
        ],
        {cancelable: false},
        //clicking out side of alert will not cancel
    );
}
