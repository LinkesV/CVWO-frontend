import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [username,setUserName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [pfp,setPfp] = useState<string>("");
    const [psw,setPsw] = useState<string>("");
    const [aboutyou,setAboutyou] = useState<string>("");
    const [cfmpsw,setCfmpsw] = useState<string>("");
    let check:boolean = true;
    const navigate: NavigateFunction = useNavigate()
    const pswchecker =  new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

    const submitHandler = (e:React.FormEvent):void => {
        e.preventDefault()
        try{
          if(username.length === 0 || aboutyou.length === 0 
                || email.length === 0 || pfp.length === 0 || psw.length === 0 || cfmpsw.length === 0){
            toast.warning("Please fill in all the fields to create an account")
            check = false;
          }
          if(!/\S+@\S+\.\S+/.test(email)){
            toast.warning("Please enter a valid email")
            check = false
    
          }
          if(!pswchecker.test(psw)){
            toast.warning("Password must have minimum eight characters, at least one captial letter,at least one captial letter, one number and one special character:")
            check = false
          }
          if(psw !== cfmpsw){
            toast.error("Passwords do not match")
            check = false
          }
         if(check){
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Access-Control-Allow-Origin','http://localhost:5000');

          fetch("http://localhost:5000/register", {
            method: "POST", 
            credentials: 'include',
            headers: requestHeaders,
            body: JSON.stringify({
               username:username,
               password: psw,
              
               email:email,
               aboutyou:aboutyou,
               pfp: pfp,
               password_confirmation: psw
            })
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{ 
            if(typeof(res.email) != "string"){
              toast.warning('Email has already been taken');
              console.log(res);
            }
            else{
              alert('Account successfully created, you may login now');
              navigate('/');
              console.log(res);
            }
        })
         }
      }
      catch(err){
          console.log(err)
      }
    }

  return (
    <div className='signPage'>
    <div className='innersignBox'>
      <h5 className='titleSign'>Account Creation</h5>
      <Form>

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter your first name"   
            onChange={(e)=>{setUserName(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  
            onChange={(e)=>{setEmail(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicProfilepicture">
          <Form.Label>Profile Picture:</Form.Label>
          <Form.Control type="text" placeholder="Enter url of preffered profile picture"  
            onChange={(e)=>{setPfp(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAboutYou">
          <Form.Label>About You:</Form.Label>
          <Form.Control type="text" placeholder="Enter some intersting facts about you"  
            onChange={(e)=>{setAboutyou(e.target.value)}} style={{width:"300px", height:"200px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password"  
            onChange={(e)=>{setPsw(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicCheckPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password"  
             onChange={(e)=>{setCfmpsw(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>

        <Button variant="outline-primary" type="submit"  onClick={(e)=>{submitHandler(e)}} style={{width:"100px", marginLeft:"100px", marginTop:"20px"}}>
          Sign Up
        </Button>
    </Form>
        
    </div>
    <ToastContainer/>
    </div>
  )
}

export default SignUp