import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface UserInfo{
    userName?:string
    userSurname?:string
    userMail?:string
    userPassword?:string
    userId?:string
    userToken?:string
    userImage?:string

}
const messageSlice = createSlice({
    name: "message",
    initialState: {
        userInfo: {
            userName: "",
            userSurname: "",
            userMail: "",
            userPassword:"",
            userId:"",
            userToken:"",
            userImage:""
        },

    },
    reducers: {
        setUserInfo(state, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload
        }
    }
})

export const {setUserInfo} = messageSlice.actions
export default messageSlice.reducer
