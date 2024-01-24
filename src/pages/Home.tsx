import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../store/store';
import Post from '../components/posts/Post';
import { useState } from 'react';

function Home() { 
  const select:TypedUseSelectorHook<RootState> = useSelector;
 
  const currentuser = select(state=>(state.user.userid));
  const [search,setSearch] = useState("")
  const posts = select(state=>(state.posts)).filter(post => post.title.includes(search) || post.username.includes(search)).reverse();

  return (
    <div style={{backgroundColor:"#E1E1E1 ", minHeight:"100vh", justifyContent:"center"}}>
        <NavigationBar/>
        <div style={{display:'flex',alignItems:"center", flexDirection:"column", position:"relative", paddingBottom:"50px"}}>
        <h5 style={{left:'50px', position:"absolute", top:'20px'}}>All Threads</h5>
        <SearchBar setSearchStatus = {setSearch}/>
        <div style={{marginTop:"20px", display:"flex", flexDirection:"column", justifyContent:"center", paddingLeft:"120px"}}>
        {posts.map((post)=>{
           return(<div key={post.id}><Post category = {post.category} post_id = {post.id} title = {post.title} username={post.username} userid={post.userid} currentuser = {currentuser} /></div>)
        })}
    </div>
        </div>
    </div>
  )
}

export default Home