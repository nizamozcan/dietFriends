import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import {firebase} from "@react-native-firebase/auth";
import {deleteNullParameters} from "../helpers/Helpers";

export const RegisterUser = async (name: string, surname: string, email: string, password: string) => {
    const token = await messaging().getToken()
    await firestore().collection("users").add({
        email: email,
        name: name,
        password: password,
        surname: surname,
        token: token
    })
}
export const sendDietList = async (title: string, value: string, day: number, positiveComment: string, rating: number, disadvantage: string, userInfo?: object) => {
    const date = firebase.firestore.Timestamp.fromDate(new Date());
    const formatDate = date.toDate();
    const data = {
        positiveComment: positiveComment,
        disadvantage: disadvantage,
        name: title,
        value: value,
        day: day,
        rating: rating,
        createDate: formatDate,
        userInfo: deleteNullParameters(userInfo)
    }

    return await firestore().collection("dietLists").add(data).then((x) => {
        return Promise.resolve(x)
    }).catch(() => {
        return Promise.reject()
    })
}
export const getHomeData = async () => {
    const data = await firestore().collection("dietLists").get()
    if (data)
        return data
}
export const getDietListData = async (listId:string) => {
    const data = await firestore().collection("dietLists").doc(listId).get()
    if (data)
        return data
}
export const updateUser = async (userId: string, data: object) => {
    await firestore().collection("users").doc(userId).update(data).then().catch()
    return data
}
export const addComment = async (dietId: string, userId: string, comment: string, userImage: string, userName: string) => {
   console.log(userImage)
    const formatUserImage=userImage==undefined?"null":userImage
    const newUserComment = {
        userId: userId, // Kullanıcı kimliği
        comment: comment,
        userImage: formatUserImage,
        userName: userName
    };
    const response = await firestore().collection("dietLists").doc(dietId).update({
        userComment: firebase.firestore.FieldValue.arrayUnion(newUserComment)
    })
    return response
}
export const replyComment = async (dietId: string, index: string) => {
    const response = await firestore().collection("dietLists").doc(dietId).get();
    let data = response?._data
    const params = {
        "userName": "deneme",
        "userImage": "denemeımage",
        "comment": ""
    }
    data?.userComment[index]?.replyComment?.push(params)
    await firestore().collection("dietLists").doc(dietId).update(data)
}

export const addUserTargets = async (nowWeight: number, targetWeight: number, userId: string) => {
    const userTarget = {nowWeight: nowWeight, targetWeight: targetWeight, userId: userId}
    await firestore().collection("userTargets").add(userTarget).then().catch()

}
export const addUserDailyWeight = async (dailyWeight: number, userId: string) => {
    const date = firebase.firestore.Timestamp.fromDate(new Date());

    const userTarget = {dailyWeight: dailyWeight, userId: userId, date: date}
    const response = await firestore().collection("userTargets").where('userId', '==', userId).get()
    await firestore().collection("userTargets")
        .doc(response?._docs[0]?._ref?._documentPath?._parts[1])
        .update({userTarget: firebase.firestore.FieldValue.arrayUnion(userTarget)})
}
export const getUserTargets = async (userId: string) => {
    const response = await firestore().collection("userTargets").where('userId', '==', userId).get()
    return response?._docs[0]?._data
}
export const getFoodDatas = async (userId: string) => {
    const response = await firestore().collection("userFoods").where('userId', '==', userId).get()
    return response?._docs ? response?._docs : []
}
export const addUserFoods = async (data: object, userId: string, addFoodDate: any) => {
    const date = firebase.firestore.Timestamp.fromDate(addFoodDate);
    const datas = {userData: data, date: date}
    let dataArray = [datas]
    const response = await firestore().collection("userFoods").where('userId', '==', userId).get()
    if (response?._docs == false) {
        await firestore().collection("userFoods").add({dataArray, userId: userId}).then(() => {
            return Promise.resolve()
        }).catch(() => {
            return Promise.reject()
        })
    } else {
        let responseData = response?._docs[0]?._data?.dataArray
        responseData?.push(datas)
        await firestore().collection("userFoods").doc(response?._docs[0]?._ref?._documentPath?._parts[1]).update({dataArray: responseData}).then(() => {
            return Promise.resolve()
        }).catch(() => {
            return Promise.reject()
        })
    }
}
