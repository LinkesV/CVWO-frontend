import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Registration from './pages/Registration';
import Home from './pages/Home';
import { useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import MyPosts from './pages/MyPosts';
import CreatePost from './pages/CreatePost';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { clearuser, newuser } from './store/userSlice';
import General from './pages/categories/General';
import Math from './pages/categories/Math';
import Science from './pages/categories/Science';
import Programming from './pages/categories/Programming';
import ViewPost from './pages/ViewPost';
import UpdatePost from './pages/UpdatePost';

function App() {
    const dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate()
    // Track cookie + unathorised access
   useEffect(() => {
    try{
       
      
       fetch("https://cvwo-backendserver.onrender.com/authenticate_user", {
        method: "GET", 
        credentials: 'include',
        headers:{'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
         
        },
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{ 
      if(res.status){
        dispatch(newuser(res.user))
      }
      else{
        dispatch(clearuser())
        navigate('/');
      }
    })
     
  }
  catch(err){
      console.log(err)
  }       // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); 
    


  return (
    
    
      <Routes>
          <Route path = '/' element = {<LoginPage/> }/>
          <Route path = '/register' element ={<Registration/>}/>
          <Route path = '/home' element ={<Home/>}/>
          <Route path = '/profile' element ={<ProfilePage/>}/>
          <Route path = '/myposts' element ={<MyPosts/>}/>
          <Route path = '/createposts' element ={<CreatePost/>}/>
          <Route path = '/post/general' element = {<General/>}/>
          <Route path = '/post/science' element = {<Science/>}/>
          <Route path = '/post/math' element = {<Math/>}/>
          <Route path = '/post/programming' element = {<Programming/>}/>
          <Route path = '/post/:id' element = {<ViewPost/>}/>
          <Route path = '/updatepost/:id' element = {<UpdatePost/>}/>
          <Route path = '*' element={<p>PAGE NOT FOUND</p>}/>
      </Routes>
    
   
  );
}

export default App;
