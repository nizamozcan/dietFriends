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
      }
      else{
          formattedData={...formattedData,
              [key]:obj[key]}
      }
    }
    return formattedData
}

export const helperTimestampDate=(date:any)=>{
    const formattedDate = new Date(date.seconds * 1000).toLocaleString();
   const justDate=formattedDate.split(' ')[0]
    return justDate
}
export const getTodayDate=(date?:string)=>{
   if(date){
       return date.split('T')[0]
   }else{
       const todayDate = new Date();
       const day = todayDate.getDate();
       const month = todayDate.getMonth() + 1;
       const year = todayDate.getFullYear();
       const tarihSaat = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${day}.${year} `;
       return tarihSaat
   }
}
export const checkInput=async(value?:string,control?:"weight"|"title"|"mail")=>{
   switch (control){
       case "weight":
           if (value.length>2&&(!value?.toString().startsWith('2')&&!value?.toString().startsWith('1'))) {
               customAlert(false,"Lütfen Girdiğiniz Kilo Değerini Kontrol Ediniz")
               return Promise.reject()
           } else {
               const numberWithoutDecimal = value?.toString()?.replace('.', '');
               return Promise.resolve(numberWithoutDecimal)
           }
           break;
       case "title":
           if(value.length>20){
               customAlert(false,"En fazla 20 karaktere ait bir başlık giriniz")
              return  Promise.reject()
           }
           else{
               return  Promise.resolve(value)
           }
       case "mail":
          const mailCheck = value?.includes(".com");

           return mailCheck == true?true:false
   }
}

