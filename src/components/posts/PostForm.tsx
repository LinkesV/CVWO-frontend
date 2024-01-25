import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import '../styles/PostForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostForm() {
    const [title,setTitle] = useState<string>("");
    const [body,setBody] = useState<string>("");
    const [cat,setCat] = useState<string>("");
    const select:TypedUseSelectorHook<RootState> = useSelector;
    const currentuser = select(state=>(state.user));
    const navigate = useNavigate();

    let check = true 
    const submitHandler = (e:React.FormEvent):void => {
      e.preventDefault()
      if(cat === "" || cat === "Select your category"){
        toast.error("Please choose a category")
        check = false;
      }
      if (title.length === 0 || body.length === 0 ){
        toast.error("Please fill in all the details of the thread")
        check = false;
      }
      if(check){
        try{
          const requestHeaders: HeadersInit = new Headers();
          requestHeaders.set('Content-Type', 'application/json');
          requestHeaders.set('Access-Control-Allow-Origin','https://cvwo-backendserver.onrender.com');
          

        fetch("https://cvwo-backendserver.onrender.com/forum_threads", {
          method: "POST", 
          credentials: 'include',
          headers:requestHeaders,
          body: JSON.stringify({
            title: title,
            body: body,
            category: cat,
            username: currentuser.username,
            user_id: currentuser.userid,
            userid: currentuser.userid
          })
      })
      .then((res)=>{
          return res.json()
      })
      .then((res)=>{ 
         alert('Thread has been created')
         navigate('/home')
      })
     
    }
    catch(err){
        console.log(err)
    }
      }
    }

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
        
        <div className='postform'>
        <h3 className='titleSign'>Create Thread</h3>
        <Form style={{display:"flex", flexDirection:"column"}}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="title" placeholder="Enter title for your post" onChange={(e)=>setTitle(e.target.value)} style={{width:"500px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Label>Body:</Form.Label>
          <Form.Control  as="textarea" placeholder="Description"  onChange={(e)=>setBody(e.target.value)} style={{height: "300px", width:"500px"}}/>
        </Form.Group>
        <Form.Label>Category:</Form.Label>
        <Form.Select aria-label="Default select example" style={{ width:"500px"}} onChange={(e) => setCat(e.target.value)}>
          <option>Select your category</option>
          <option value="General">General</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Programming">Programming</option>
        </Form.Select>
        <br></br>
        <Button variant="outline-success" type="submit" onClick={(e)=>submitHandler(e)} style={{width:"500px"}}>
          Create Thread
        </Button>
    </Form>
    <ToastContainer/>
        </div>
    </div>
  )
}

export default PostForm