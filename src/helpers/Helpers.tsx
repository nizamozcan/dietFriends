import firestore from "@react-native-firebase/firestore";
import {Alert} from "react-native";

export const LoginUserControl = async (email?: string, userPassword?: string) => {
    const usersCollection = await firestore().collection('users').get()
    const users = usersCollection._docs
    for (let i = 0; i < users.length; i++) {
        if (users[i]._data.email.includes(email) && users[i]._data.password === userPassword) {
            return Promise.resolve(users[i]);
        }
    }
    return Promise.reject("Mail veya şifrenizi kontrol ediniz.")
}

export const customAlert = (isSuccess?: boolean, value?: string) => {
    Alert.alert(isSuccess == true ? "Başarılı İşlem" : `Başarısız İşlem`, value, [
            {
                text: 'Tamam',
            },
        ],
    )
}
export const deleteNullParameters=(obj:any)=>{
    let formattedData={}
    for (const key in obj) {
      if(obj[key]==undefined || obj[key]=="undefined" || obj[key]==""||obj[key]==null){
       console.log("a")
      }
      else{
          formattedData={...formattedData,
              [key]:obj[key]}
      }
    }
    return formattedData
}


