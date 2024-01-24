import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../store/store';
import NavigationBar from '../components/NavigationBar';
import CreateComment from '../components/comments/CreateComment';
import ViewComments from '../components/comments/ViewComments';
import {useDispatch} from 'react-redux';
import { allcomments } from '../store/commentsSlice';
import '../components/styles/ViewPost.css';

function ViewPost() {
  const dispatch = useDispatch();
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('Access-Control-Allow-Origin','http://localhost:4000');

  useEffect(()=>{
    try{
      fetch("http://localhost:4000/comments", {
        method: "GET", 
        credentials: 'include',
        headers:requestHeaders,
    })
.then((res)=>{
    return res.json()
})
.then((res)=>{ 
   dispatch(allcomments(res));
})
    }catch(err){
      console.log(err)
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    const post_id = useParams().id;
    
    
    

    const select:TypedUseSelectorHook<RootState> = useSelector;
    const post = select(state =>(state.posts)).filter((post) => {return `${post.id}` === post_id})[0]
    
    
    
    console.log(post);
    const dateObj = new Date(post.created_at)
  return (
    <div style={{justifyContent:"center", alignItems:"center"}}>
      <NavigationBar/>
      <div className='postContain'>
      <div className='postview'>
        <div key={post_id} className='post' style={{wordWrap:'break-word',paddingRight:"10px"}}>
          <h1 style={{marginBottom:"10px", marginLeft:"10px",wordWrap:'break-word'}}>{post.title}</h1>
          <div className='catBubble'>{post.category}</div>
          <div style={{marginTop:"10px", marginLeft:"10px",wordWrap:'break-word'}}><p>{post.body}</p></div>
          <div className='nametime'>
            <p style={{marginRight:"10px", marginLeft:"10px"}}>Made by: {post.username} , {dateObj.toLocaleDateString()} </p>
            
          </div>
        </div>
      </div>
      <div><CreateComment/></div>
      <div><ViewComments/></div>
      </div>
    </div>
  )
}

export default ViewPost