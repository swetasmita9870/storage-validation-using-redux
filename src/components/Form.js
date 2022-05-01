import React from 'react'
import Card from './Card';
import formlogo from './form.png'
const Form = ({uname,roll,subject,select,handleChange,handleDelete,handleSave,handleSubmit,toggleSubmit,userDetail,userId,list,setModalOpen,editData}) => {
  // console.log("adad",list)
  // console.log("userId2r",userId);
  console.log("userDetail56",userDetail);
  return (
    <div>
      <h1 className="heading">STORGE VALIDATION FORM</h1>
        <div className='LogoBox'>
          <img className='logo' src={formlogo} alt="form"/>
        </div>
      <div className="container">
          <form autoComplete="off">
            <div className="inputfield">
              <input
                value={uname}
                name="uname"
                onChange={handleChange}
                placeholder="Enter Your Name ✍️"
                type="text"
              />
            </div>
            <div className="inputfield">
              <input
                value={roll}
                name='roll'
                onChange={handleChange}
                placeholder="Enter RollNumber ✍️"
                type="number"
              />
            </div>
            <div className="inputfield">
              <input
                value={subject}
                name="subject"
                onChange={handleChange}
                placeholder="Enter Subject✍️"
                type="text"
              />
            </div>
            <div className="inputfield">
              <select
                value={select}
                name="select"
                onChange={handleChange}
              >
                <option>Select Option</option>
                <option >Local Storage</option>
                <option >Session Storage</option>
                <option >Cookies Storage</option>
              </select>
            </div>
            <div className="inputfield">
              {toggleSubmit ? (
                <button className="submit" onClick={handleSubmit}>
                  Submit
                </button>
              ) : (
                <button className="save" onClick={(e)=>handleSave(e,userId,userDetail)}>
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
        <div className='showItems'>
          {
            list?.map((elem) => {
              return (
               <Card key={elem.id}  setModalOpen={setModalOpen} editData={editData} elem={elem} handleDelete={handleDelete} userDetail={elem.userDetail}  />
              )

            })
          }

        </div>
    </div>
  )
}

export default Form
