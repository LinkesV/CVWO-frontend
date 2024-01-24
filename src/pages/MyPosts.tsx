import React from 'react'
import NavigationBar from '../components/NavigationBar'

import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../store/store';
import Post from '../components/posts/Post';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom'

function MyPosts() {
  const select:TypedUseSelectorHook<RootState> = useSelector;
  
  const currentuser_id = select(state=>(state.user.userid));
  
  const [search,setSearch] = useState("")
  const posts = select(state=>(state.posts)).filter((post)=>{return post.userid === currentuser_id}).filter(post => post.title.includes(search) || post.username.includes(search)).reverse();

  return (
    <div style={{backgroundColor:"#E1E1E1 ", minHeight:"100vh"}}>
      <NavigationBar/>
      <div style={{display:'flex',alignItems:"center", flexDirection:"column", position:"relative"}}>
        <h5 style={{left:'50px', position:"absolute", top:'20px'}}><Link to={'/home'}>All Threads </Link> {'\u003E'} My Threads</h5>
        <SearchBar setSearchStatus = {setSearch}/>
        <div style={{marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"center", paddingLeft:"120px"}}>
        {posts.map((post)=>{
            return(<Post category = {post.category} post_id = {post.id} title = {post.title} username={post.username} userid={post.userid} currentuser = {currentuser_id}/>)
        })}
      </div>
      </div>
      
    </div>
  )
}

export default MyPosts