import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
// import config from '../../../config'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import config from "../../config";
import { Button } from "@mui/material";
import { createNote, deleteNotes, fetchNotes } from "../../redux/action/notes/Notes";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { cilColorBorder, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function NotesModal({ props }) {

    const [notes, setNotes] = useState("")
    const setShowModal = props && props.showModal;
    // const setShowM   odal = props && props.setShowModal;

    var token = localStorage.getItem("token");

    // const [selected, setSelected] = useState([permissionOptions[0]]);

    const colors = ["lightyellow", "white", "pink"];

    // const 


    const handleChange = (e) => {
        setNotes(e.target.value)
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotes(token));
    }, [])
    const mynotes = useSelector((state) =>state?.fetchNotesReducer?.userInfo?.data);

    const handleDelete = (id) => {
        console.log(id,"id");
        dispatch(deleteNotes(id,token))
    }
    const[showButton,setshowButton] = useState(false);
    useEffect(()=>{
        if(notes==""){
        setshowButton(true)
        }
        else{

            setshowButton(false )
        }
    },[notes])
    
    const AddNote = () => {
        dispatch(createNote(token, notes))
        setNotes("");
        dispatch(fetchNotes(token));
      
    }
    return (
        <div className=" mt-6 w-100">
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto sticky inset-0 z-50 outline-none focus:outline-none w-80" style={{ background: "white" }}>
                <div className="relative w-100 my-6 mx-auto max-w-sm  flex  justify-center h-75">
                    {/*content*/}
                    <div className="w-full " style={{height:"97vh"}}>
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl d-flex items-end">Sticky Notes</h3>
                            <Link to="/" className="text-white">
                                <button
                                    className="p-1 text-white ml-auto bg-transparent border-0  opacity-5 float-right text-3xl leading-none  outline-none focus:outline-none"
                                // onClick={() => props.setShowModal(false)}
                                >
                                    <span className="text-black  text-black opacity-5 h-2 w-6 text-2xl block outline-none focus:outline-none">
                                        x
                                    </span>
                                </button>
                            </Link>
                        </div>

                        <div className="d-flex  justify-content-center">
                            <div className="input-notes  w-50  mt-4 mb-4  ">
                                <textarea
                                    type="textarea"
                                    value={notes}
                                    placeholder="Write Your Notes..."
                                    onChange={(e) => handleChange(e)}
                                    className="border custom-textarea border-none w-full   "
                                />
                            </div>

                            <div className="d-flex items-center "><Button className="d-flex h-35 ml-2" variant="contained" onClick={() => AddNote() } disabled={showButton} >+ Add</Button></div>

                        </div>
                        {/*body*/}
                        {/* <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {({ values, setFieldValue, errors, dirty, isValid }) => {
                                return (
                                    <Form>
                                        <div className="relative p-2 flex-auto">
                                            <div className="-mx-4 flex flex-wrap justify-content-center">

                                                <div className="w-full px-4 md:w-1/2 d-flex justify-content-center" style={{width:"90%"}}>
                                                    <div className="mb-2" style={{width:"50%"}}>
                                                        {/* <label
                                                            htmlFor="email"
                                                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                                        >
                                                            Your Notes
                                                        </label> *
                                                        <Field
                                                            name="title"
                                                            onChange={(e) => {
                                                                setFieldValue("title", e.target.value);
                                                                setFieldValue(
                                                                    "slug",
                                                                    e.target.value
                                                                        .toLowerCase()
                                                                        .replace(/\s+/g, "-")
                                                                );
                                                            }}
                                                            as='textarea'
                                                            placeholder="Enter your Title"
                                                            className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                                        >

                                                        </Field>
                                                        <ErrorMessage
                                                            name="title"
                                                            render={(msg) => (
                                                                <small style={{ color: "red" }}>{msg}</small>
                                                            )}
                                                        />

                                                    </div>
                                                    <div className="w-25 px-4">
                                                    <button
                                                        className="rounded-md py-2.5 px-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                                                        style={{ background: "#3C4B64" }}
                                                        type="submit"
                                                    >
                                                       + Add
                                                    </button>
                                                </div>
                                                </div>



                                                {/* <div className="w-75 px-4">
                                                    <button
                                                        className="rounded-md py-2.5 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                                                        style={{ background: "#3C4B64" }}
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </button>
                                                </div> *
                                            </div>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik> */}
                        <div className="d-flex flex-wrap gap-2 justify-content-center gap-4 shadow w-full h-full">


                            {mynotes && mynotes.map((item, index) => (
                                <div key={index} className=" shadow-md w-25 h-25 text-black rounded  pt-0 font-weight-normal" style={{ fontSize: "13px", background: "#75f3bc3d   ",width:"15rem !important" }}>
                                   
                                    <div className="d-flex justify-content-end gap-2 cursor-pointer " style={{background:"#67eeab73" ,padding:"7px",borderRadius:"8px 8px 0 0 "}}>
                                        {/* <CIcon icon={cilColorBorder} /> */}
                                        <CIcon icon={cilTrash} onClick={() => handleDelete(item._id)} /> {/* Assuming handleDelete takes an index */}
                                    </div>
                                    <div className="p-3 "  style={{background:"#c5fae3    "}}><span className="">
                                         {item.notes}
                                    </span></div>
                                </div>
                            ))}

                    
                            {/* <div className="w-25 h-50 text-black rounded  p-4 font-weight-normal" style={{ fontSize: "13px", background: "lightyellow" }}>
                                <span>
                                    Hey ,the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </span>
                                <div className="d-flex justify-content-end gap-2">

                                    <CIcon icon={cilColorBorder} />
                                    <CIcon icon={cilTrash} onClick={handleDelete} />
                                </div>
                            </div> */}
                            {/* <div className="w-25 h-50 text-black rounded  p-4 font-weight-normal shadow" style={{fontSize:"13px", background: "whitesmoke"}}>                        
                            <span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                            and more recently with desktop publishing  of Lorem Ipsum.   
                           
                            </span>
                        </div> */}

                            {/* <div className="w-25 h-50 text-black rounded  p-4 font-weight-normal shadow" style={{fontSize:"13px", background: colors[Math.floor(Math.random() * colors.length-1) ]}}>                        
                            <span>
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </span>
                        </div> */}
                            {/* <div className="w-25 h-50 text-black rounded mb-4  p-4 font-weight-normal shadow" style={{fontSize:"13px", background: colors[Math.floor(Math.random() * colors.length-1    ) ]}}>                        
                                <span>
                                    Hey ,Module Warning  Module Warning Module Warning Module Warning Module Warning Module Warning Module Warning
                                    se of Letraset sheets containing Lorem 
                                </span>
                            </div> */}

                        </div>
                        {/*footer*/}
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesModal;
