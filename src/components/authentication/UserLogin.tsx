import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {newuser} from '../../store/userSlice'
import '../styles/UserLogin.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserLogin() {
    const [username,setUsername] = useState<string>("");
    const [psw,setPsw] = useState<string>("");
    let check:boolean = true;
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useDispatch();
    

    const submitHandler = (e:React.FormEvent):void => {
      e.preventDefault()
      try{
        if(username.length === 0 || psw.length === 0){
          toast.warning("Please fill in all the fields")
          check = false;
        }
       if(check){
          const requestHeaders: HeadersInit = new Headers();
          requestHeaders.set('Content-Type', 'application/json');
          requestHeaders.set('Access-Control-Allow-Origin','http://localhost:4000');
          

          

        fetch("http://localhost:4000/login", {
          method: "POST", 
          credentials: 'include',
          headers:requestHeaders,
          body: JSON.stringify({
             username:username,
             password_digest: psw,
          })
      })
      .then((res)=>{
          return res.json()
      })
      .then((res)=>{ 
         if(res.login){
          navigate(`/home`)
          
          dispatch(
            newuser(res.user)
          )
          console.log(res.user)
         }
         else{
          toast.error("Wrong Credentials")
         }

      })
       }
    }
    catch(err){
        console.log(err)
    }
  }


  return (
    <div className='loginPage'>
        <div className='innerBox'>
        <p className='titleLogin'>CVWO WINTER ASSIGNMENT 2024 WEB FORUM LOGIN</p>
        <Form style={{display:"flex", flexDirection:"column"}}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="username" placeholder="Enter username"  onChange = {(e)=>{setUsername(e.target.value)}}style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange = {(e)=>{setPsw(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>


        <Button variant="outline-primary" type="submit" style={{width:"100px", marginLeft:"100px", marginTop:"40px"}} onClick={(e)=>{submitHandler(e)}}>
          Login
        </Button>
        </Form>

        <br></br>
       
        <Link to = '/register'><p>Create Account</p></Link> 

        </div>
        <ToastContainer/>
    </div>
  )
}

export default UserLogin