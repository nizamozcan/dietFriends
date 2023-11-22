export const isNotNull=(value:any)=>{
    if(value==""||value==0||value==null||typeof value=="undefined"){
        return false
    }
    else{
       return  true
    }
}
