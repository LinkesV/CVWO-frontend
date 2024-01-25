import React from 'react'
import '../styles/post.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch} from 'react-redux';
import {delPost } from '../../store/postSlice';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface hello {
    title:string,
    username:string,
    userid:number,
    currentuser: number | null,
    post_id: number,
    category: string
}

function Post({title,username,userid,currentuser,post_id, category}: hello) {
    const navigate: NavigateFunction = useNavigate();
   
    const dispatch = useDispatch();
    const madeThisPost = currentuser === userid;
    const deleteHandler = (e:React.FormEvent):void =>{
        e.preventDefault()
        console.log(post_id);
      try{
          const requestHeaders: HeadersInit = new Headers();
          requestHeaders.set('Content-Type', 'application/json');
          requestHeaders.set('Access-Control-Allow-Origin','http://localhost:5000');
       

        fetch(`http://localhost:5000/deletepost`, {
          method: "DELETE", 
          credentials: 'include',
          headers:requestHeaders,
          body: JSON.stringify({
            id: post_id
          })
      })
      .then((res)=>{
          return res.json()
      })
      .then((res)=>{ 
        dispatch(delPost(post_id));
        window.location.reload()
      })
     
    }
    catch(err){
        console.log(err)
    }
    }
    const postController = (e:React.FormEvent):void =>{
        e.preventDefault()
        navigate(`/post/${post_id}`)
    }

    const updateHandler = ()=>{
      navigate(`/updatepost/${post_id}`)
    }
  return (
    <div  key={post_id} style={{display:"flex"}}>
    <div className='postBox' onClick={(e) => {postController(e)}}>
        
        <h1 style={{wordWrap:'break-word'}}>{title}</h1>
        <div className='catBubble' style={{marginLeft:"0px", color:"black"}}>{category}</div>
        <p>Made by: {username} </p>
        
    </div>
      <div className= "authButton">
        <Button className = {madeThisPost ? 'hello': 'hidden'} variant="outline-danger" type="submit" style={{width:"100px"}} onClick={(e)=>deleteHandler(e)}> Delete </Button>
        <Button className = {madeThisPost ? 'hello': 'hidden'} variant="outline-success" type="submit" style={{width:"100px"}} onClick={()=>updateHandler()}> Edit </Button>
      </div>
    </div>
  )
}

export default Post