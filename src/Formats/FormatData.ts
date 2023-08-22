export default function(data:object){
  return Object.keys(data).map(key=>{
    return{
      id:key,
      ...data[key],
    }
  })
}
