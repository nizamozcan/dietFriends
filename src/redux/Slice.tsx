import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface UserInfo{
    userName?:string
    userSurname?:string
    userMail?:string
    userPassword?:string
    userId?:string

}
const messageSlice = createSlice({
    name: "message",
    initialState: {
        userInfo: {
            userName: "",
            userSurname: "",
            userMail: "",
            userPassword:"",
            userId:""
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
