import React from 'react'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../../store/store';
import Post from './Post';



function AllPosts() {
    const select:TypedUseSelectorHook<RootState> = useSelector;
    const posts = select(state=>(state.posts)).reverse();
    const currentuser = select(state=>(state.user.userid));
  return (
    <div style={{marginTop:"50px"}}>
        {posts.map((post)=>{
           return(<div key={post.id}><Post category = {post.category} post_id = {post.id} title = {post.title} username={post.username} userid={post.userid} currentuser = {currentuser} /></div>)
        })}
    </div>
  )
}

export default AllPosts