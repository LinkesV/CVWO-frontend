import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../../store/store';
import {useDispatch} from 'react-redux';
import { addcommments } from '../../store/commentsSlice';
import '../styles/CreateComment.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateComment() {
    const post_id = useParams().id;

    const select:TypedUseSelectorHook<RootState> = useSelector;
    const currentuser = select(state=>(state.user));
    

    const [comment,setComment] = useState<string>("");
    const dispatch = useDispatch();

    

    const submitHandler = (e:React.FormEvent):void => {
        e.preventDefault()
        if (comment === ''){
          toast.error("Please write a comment")
        }else{
          try{
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Access-Control-Allow-Origin','https://cvwo-backendserver.onrender.com');
            
  
          fetch("https://cvwo-backendserver.onrender.com/comments", {
            method: "POST", 
            credentials: 'include',
            headers:requestHeaders,
            body: JSON.stringify({
              username:currentuser.username,
              body: comment,
              userid:currentuser.userid,
              postid:post_id,
              user_id:currentuser.userid,
              forum_thread_id:post_id
            })
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{ 
           dispatch(addcommments(res));
        })
      }catch(err){
          console.log(err)
      }
        }
      }
  return (
    <div className='createC'>
        <Form style={{display:"flex", flexDirection:"column"}}>
          <Form.Control type="comment" placeholder="Add a comment..." onChange={(e)=>setComment(e.target.value)} style={{width:"40vw"}}/>
        </Form>
        <Button variant="primary" type="submit" onClick={(e)=>submitHandler(e)} style={{width:"150px", position:"absolute", bottom:"10px", right:"2.5vw"}}> Add comment </Button>
        <ToastContainer/>
    </div>
  )
}

export default CreateComment