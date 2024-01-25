import React, {useState } from 'react'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/Viewcomments.css';
import { useDispatch } from 'react-redux';
import { delcomment, updateComment } from '../../store/commentsSlice';
import Form from 'react-bootstrap/Form';

function ViewComments() {
    
   
    const [newBody, setnewBody] = useState('');
    const [thisid, setThisis] = useState(-1);
    const post_id = useParams().id;

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin','https://cvwo-backendserver.onrender.com');

    const select:TypedUseSelectorHook<RootState> = useSelector;
    const currentuser = select(state=>(state.user.userid));
    const comments = select(state=>(state.comments)).filter((comment) => `${comment.postid}` === post_id).reverse();
    
   
    const dispatch = useDispatch();

    const deleteHandler = (comment_id:Number,e:React.FormEvent):void => {
        e.preventDefault()
        
      try{
          const requestHeaders: HeadersInit = new Headers();
          requestHeaders.set('Content-Type', 'application/json');
          requestHeaders.set('Access-Control-Allow-Origin','https://cvwo-backendserver.onrender.com');
       

        fetch(`https://cvwo-backendserver.onrender.com/comments/${comment_id}`, {
          method: "DELETE", 
          credentials: 'include',
          headers:requestHeaders,
      })
      .then((res)=>{
          return res.json()
      })
      .then((res)=>{ 
        dispatch(delcomment(comment_id));
      })
    }
    catch(err){
        console.log(err)
    }
    }

   
    const updateHandler = (comment_id:Number, e:React.FormEvent):void => {
        
        setThisis(-1);
        
        
        e.preventDefault()
        try{
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Access-Control-Allow-Origin','https://cvwo-backendserver.onrender.com');
  
          fetch(`https://cvwo-backendserver.onrender.com/comments/${comment_id}`, {
            method: "PUT", 
            credentials: 'include',
            headers:requestHeaders,
            body: JSON.stringify({
              body: newBody,
            })
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{ 
           dispatch(updateComment(res));
           
        })
      }catch(err){
          console.log(err)
      }
    }
    
    
    
  return (
    <div>
    <div>
        {comments.map((comment)=>{
          const dateObj = new Date(comment.created_at)

            return(
                <div key = {comment.id} style={{marginTop:"10px", borderBottom:"1px solid grey"}}>
                    <div className={comment.id !== thisid ? 'com' : 'hidden'}>
                        <div className='comBody'>
                          <div><span style={{fontSize:"24px"}}>{comment.username}</span> <span style={{color:"gray"}}>{dateObj.toLocaleDateString()}</span></div>
                          <p>{comment.body}</p>
                        </div>
                        <div>
                            <div className= {comment.userid ===  currentuser? 'authButton' : 'hidden'}>
                                <Button variant="outline-danger" type="submit" style={{width:"70px", height:"30px", fontSize:"13px"}} onClick={(e)=>deleteHandler(comment.id,e)}> Delete </Button>
                                <Button variant="outline-success" type="submit" style={{width:"70px", height:"30px", fontSize:"13px", marginTop:"10px"}} onClick={() => {setThisis(comment.id)}}> Edit </Button>
                            </div>
                        </div>
                    </div>
                    <div className = {comment.id !== thisid ? 'hidden': 'inputC' }>
                      <p>Edit your comment here:</p>
                      <div style={{display:"flex" , height:"50px"}}>
                        <Form.Control  as="textarea" defaultValue={comment.body}  onChange = {(e)=>{setnewBody(e.target.value)}} style={{height:"30px", width:"300px", background:"white"}}/>
                        <Button variant="outline-success" type="submit" style={{height:"40px", width:"100px"}} onClick={(e) =>  updateHandler(comment.id,e)}> Edit </Button>
                      </div>
                    </div>
                </div>
            )
        })}
    </div>
    
    </div>
  )
}

export default ViewComments