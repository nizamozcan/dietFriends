import firestore from "@react-native-firebase/firestore";

export const LoginUserControl=async(email?:string,userPassword?:string)=>{
    const usersCollection =await firestore().collection('users').get()
    const users=usersCollection._docs
    for (let i = 0; i < users.length; i++) {
        if (users[i]._data.email.includes(email) && users[i]._data.password === userPassword) {
            return Promise.resolve(users[i]);
        }
    }

    return Promise.reject("Mail veya şifrenizi kontrol ediniz.")
}
