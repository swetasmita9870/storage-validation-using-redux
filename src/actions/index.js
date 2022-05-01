export const addData = (userDetail) => {
    
    return{
        type: 'ADD_DATA',
        payload:{
            id: new Date().getTime().toString(),
            userDetail: userDetail,
        }
    }
}
export const saveData = (id,newuser) =>{
    return{
        type: "SAVE_DATA",
        payload:{
            userid:id,
            newuser
        }
    }
}
export const deleteData = (elem) => {
    console.log("de",elem)
    return {
        type: 'DELETE_DATA',
        payload:elem
           
        
    }
}