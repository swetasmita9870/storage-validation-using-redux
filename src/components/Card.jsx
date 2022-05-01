import React from 'react'

const Card = ({elem,editData,setModalOpen}) => {
  return (
    <div className="eachItems" >
                  <p className='innerdata'>Name: {elem.userDetail.uname}</p>
                  <p className='innerdata'>RollNumber: {elem.userDetail.roll}</p>
                  <p className='innerdata'>Subject: {elem.userDetail.subject}</p>
                  <p className='innerdata'>Storage: {elem.userDetail.select}</p>
                  <div className="Action">
                    <button className="edit" title="Edit Item" onClick={()=>editData(elem.id)}> Edit </button>
                    <button className="delete"title="Delete Item" onClick={(e)=>setModalOpen({show:true,id:elem})}>Delete</button>
                  </div>
                </div>
  )
}

export default Card
