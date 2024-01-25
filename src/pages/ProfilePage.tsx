import React from 'react'
import NavigationBar from '../components/NavigationBar'
import '../components/styles/ProfilePage.css'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../store/store';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { updateuser } from '../store/userSlice';

function ProfilePage() {

  const select:TypedUseSelectorHook<RootState> = useSelector;
  const currentuser = select(state=>(state.user));
  
  const [updateProfile,setUpdateProfile] = useState(false);
  const dispatch = useDispatch();

  const [username,setUsername] = useState<string>(currentuser.username);
  const [pfp,setpfp] = useState<string>(currentuser.pfp);
  const [aboutme,setAboutme] = useState<string>(currentuser.aboutyou);
 
  

  const submitHandler =  (e:React.FormEvent):void => {
    setUpdateProfile(false)
    e.preventDefault()
    console.log(pfp)
    try{
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('Content-Type', 'application/json');
      requestHeaders.set('Access-Control-Allow-Origin','https://cvwo-backendserver.onrender.com');
      // requestHeaders.set("Access-Control-Allow-Credentials",'true');

    fetch(`https://cvwo-backendserver.onrender.com/users/${currentuser.userid}`, {
      method: "PUT", 
      credentials: 'include',
      headers:requestHeaders,
      body: JSON.stringify({
        username:username,
        pfp:pfp,
        aboutyou:aboutme
      })
  })
  .then((res)=>{
      return res.json()
  })
  .then((res)=>{ 
    console.log(res)
     dispatch(updateuser(res)) 
  })
 
}
catch(err){
    console.log(err)
}
  }

const cancelHandler = (e:React.FormEvent):void => {
  e.preventDefault()
  setUpdateProfile(false)
}

  return (
    <div style={{backgroundColor:"#E1E1E1 ", minHeight:"100vh"}} >
      <NavigationBar/>
      <div className={updateProfile ? 'hide' : 'normal'}>
      <div className='profileContain'>
        <h3 className='titleSign'>User Profile</h3>
        <div className='imgName'>
          <img src = {currentuser.pfp} alt="NOT FOUND" style={{height:"150px", width:"150px",borderRadius:"50%",border:"1px solid black", wordWrap:'break-word'}}></img>
          <div style={{marginLeft:"70px", maxWidth:"300px",wordWrap:'break-word' }}> {currentuser.username}</div>
        </div>
        <p style={{position:"absolute", left:"20px", top:"250px"}}>About me:</p>
        <div className='aboutme' style={{wordWrap:'break-word'}}>
          {currentuser.aboutyou}
        </div>
        <Link to='/myposts'><Button style={{position:"absolute", right:"20px", top:"20px"}}>View my posts</Button></Link>
        <Button onClick={() => {setUpdateProfile(true)}} style={{position:"absolute", right:"20px", top:"70px"}}>Edit Profile</Button>
      </div>
      </div>
      <div className={!updateProfile ? 'hide' : 'normal'}>
              <div>
              <div className='postform' >
        <h3 className='titleSign'>Update Profile</h3>
        <Form style={{display:"flex", flexDirection:"column"}}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="title" placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)} style={{width:"500px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>URL for Profile Picture: </Form.Label>
          <Form.Control type="title"  placeholder="Enter url for pfp" onChange={(e)=>setpfp(e.target.value)} style={{width:"500px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Label>About me:</Form.Label>
          <Form.Control  as="textarea"  placeholder="Description"  onChange={(e)=>setAboutme(e.target.value)} style={{height: "300px", width:"500px"}}/>
        </Form.Group>
       
        <br></br>
        <Button variant="outline-success" type="submit"  style={{width:"500px"}} onClick={(e) => submitHandler(e)}>
          Update Profile
        </Button>
        <Button variant="outline-danger" type="submit"  style={{width:"500px"}} onClick={(e) => cancelHandler(e)}>
          Cancel
        </Button>
    </Form>

        </div>
              </div>
      </div>
    </div>
  )
}

export default ProfilePage