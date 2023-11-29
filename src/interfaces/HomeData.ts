export interface IGetHomeData {
    comment?:string,
    disadvantage?:string
    createDate?:IDate
    name?:string
    userComments?:IUserComments[]
    rating?:number
    value?:string
    day?:string
    positiveComment?:string
    userInfo:IUsers
}
export interface IUserComments{
    userComment:string
    userId:string
}
export interface IDate{
    nanoseconds?:string
    seconds?:string
}
export interface IUsers{
    userImage?:string
    userId:string
    userMail:string
    userName:string
    userPassword:string
    userToken:string
}
