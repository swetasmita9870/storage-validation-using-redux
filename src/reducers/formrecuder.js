const getCookies = ()=>{
    const detail = document.cookie
    if(detail){
        const cookiedata = JSON.parse(detail.split("=")[1]);
    return cookiedata
    }
  }
  let allData = []
  const getLocalItems = () => {
  const localData = localStorage.getItem("UserDetail");
  const sessionData = sessionStorage.getItem('UserDetail')
  const cookiedata = getCookies()
  // console.log("seesion", sessionData)
  if (localData) {
      allData = [...allData, ...JSON.parse(localData)];
     if (sessionData) {
      // console.log('sessionData')
    allData = [...allData, ...JSON.parse(sessionData)];
    if(cookiedata){
      allData = [...allData, ...cookiedata];
    }}}
  return allData
  };

const initialData = {
    list :getLocalItems()
}
let totalData=[]

// const setCookies=(totalData)=>{
//     const cookieData = totalData.filter((id) => id.userDetail.select === "Cookies Storage")
//     const setCookie = JSON.stringify(cookieData);
//     document.cookie = `UserDetail=` + setCookie;
//     }

 const formReducers = (state=initialData,action) =>{
    
    switch(action.type) {
        case "ADD_DATA" :
            const {id,userDetail} = action.payload;
            totalData = [...totalData,{id,userDetail}]
        const localData = totalData.filter((id)=> id.userDetail.select === 'Local Storage')
        const sessionData = totalData.filter((id)=> id.userDetail.select === 'Session Storage')
        localStorage.setItem("UserDetail",JSON.stringify(localData))
        sessionStorage.setItem("UserDetail",JSON.stringify(sessionData))
        const cookieData = totalData.filter((id) => id.userDetail.select === "Cookies Storage")
        console.log("cookie",totalData,cookieData)
    const setCookie = JSON.stringify(cookieData);
    document.cookie = `UserDetail=${setCookie} `;
    console.log("setCookie",document.cookie);
        return {
            
            ...state,
            // list : [...state.list,data],

            list:[
                ...state.list,
                {
                    id:id,
                    userDetail:userDetail
                }
            ]
        }
        case "SAVE_DATA":
            const {userid,newuser} = action.payload
            const addUpdateUser = {
                id:userid,
                userDetail:newuser

            }

            const RemoveOldUser= state.list.filter((elem)=>elem.id !== userid)
            // console.log("userDetail",userDetail);
            const UpdatedUser = [...RemoveOldUser,addUpdateUser]
            console.log(UpdatedUser);
            const updateLocalData = UpdatedUser.filter((id)=> id.userDetail.select === 'Local Storage')
            const updateSessionData = UpdatedUser.filter((id)=> id.userDetail.select === 'Session Storage')
            localStorage.setItem("UserDetail",JSON.stringify(updateLocalData))
            sessionStorage.setItem("UserDetail",JSON.stringify(updateSessionData))
            const updatecookieData = UpdatedUser.filter((id) => id.userDetail.select === "Cookies Storage")
        const updateSetCookie = JSON.stringify(updatecookieData);
        document.cookie = `UserDetail=${updateSetCookie} `;
            return {
            
                ...state,
                list: UpdatedUser
            }
           
        case "DELETE_DATA":
            const elem = action.payload
            console.log("ele",elem)
            if(typeof(elem) === "undefined" || null) return state
            if(Object.keys(elem).length === 0 ) return state
           console.log(state.list)
           const updateNewUser = state.list.filter((user) => user.id !== elem.id)
           console.log(updateNewUser)
            const updateNewLocalData = updateNewUser.filter((id)=> id.userDetail.select === 'Local Storage')
            const updateNewSessionData = updateNewUser.filter((id)=> id.userDetail.select === 'Session Storage')
            localStorage.setItem("UserDetail",JSON.stringify(updateNewLocalData))
            sessionStorage.setItem("UserDetail",JSON.stringify(updateNewSessionData))
            const updateNewcookieData = updateNewUser.filter((id) => id.userDetail.select === "Cookies Storage")
            const updateNewSetCookie = JSON.stringify(updateNewcookieData);
            document.cookie = `UserDetail=${updateNewSetCookie} `;
            console.log("2",state.list)
        console.log("updateNewUser",updateNewUser);
            return{
                ...state,
                list: updateNewUser
            }
        default:
            return state;
    }
}
export default formReducers;