import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector, useDispatch } from "react-redux";
import { addData, saveData, deleteData } from '../actions';
import Form from './Form';
import Modal1 from './Modal';
import OffCanvas from './Offcanvas';

const Index = () => {
    let allRollNo = []
    const initialValue = {
        uname: "",
        roll: "",
        subject: "",
        select: "",
    };
    const [userDetail, setUserDetail] = useState(initialValue);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const[modalOpen, setModalOpen] = useState({show:false,id:''})
    const { uname, roll, subject, select } = userDetail;
    const [userId, setUserId] = useState()
    const list = useSelector((state) => state.formReducers.list)
    console.log("list", list)
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setUserDetail(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
   
  const handlermodal = () =>{
      setModalOpen(prev=>({...prev,show:!prev.show}))
  }
    const handleSubmit = (e) => {
        e.preventDefault();
        allRollNo = list?.map((elem) => elem.userDetail.roll)
        const isRollno = allRollNo.includes(roll)
        if (isRollno) {
            toast.error('Roll already exist', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        if (!uname || !roll || !subject || !select) {
            toast.error("Fill The above data", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            dispatch(addData(userDetail))
            setToggleSubmit(true);
            setUserDetail(initialValue);
        }
    }
    const editData = (id) => {
        setUserId(id)
        
        let newEditData = list.find((elem) => {
            return elem.id === id;
        });
        setUserDetail(newEditData.userDetail);
        setToggleSubmit(false);
    };
    const handleDelete = (elem) => {
        console.log({ elem })
        dispatch(deleteData(elem))
    }
    const handleSave = (e, id, newuser) => {
        // console.log("id",id);
        console.log("newuser",newuser);
        console.log("userId",userId);
        e.preventDefault();
        dispatch(saveData(id, newuser))
        setToggleSubmit(true);
        setUserDetail(initialValue);
    }

    return (
        <>
            <div>
                <Form list={list} setModalOpen={setModalOpen}  editData={editData} handleChange={handleChange} handleSubmit={handleSubmit} handleSave={handleSave} toggleSubmit={toggleSubmit} uname={uname} roll={roll}
                    select={select} userDetail={userDetail} subject={subject} userId={userId} />

                <BrowserView>
                    <Modal1 handlermodal={handlermodal} handleDelete={handleDelete} modalOpen={modalOpen} />
                </BrowserView>
                <MobileView>
                    <OffCanvas handlermodal={handlermodal} handleDelete={handleDelete} modalOpen={modalOpen} />
                </MobileView>

            </div>
            <ToastContainer />
        </>
    )
}

export default Index
