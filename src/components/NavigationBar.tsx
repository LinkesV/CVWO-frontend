import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch} from 'react-redux';
import { clearuser } from '../store/userSlice';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { allPosts} from '../store/postSlice';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './styles/Nav.css';
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../store/store';


function NavigationBar() {
    const dispatch = useDispatch();
    const select:TypedUseSelectorHook<RootState> = useSelector;
    const currentuser_pfp = select(state=>(state.user.pfp));
    
    
    const navigate: NavigateFunction = useNavigate();
    const logoutHandler = ()=>{
        fetch("http://localhost:5000/logout", {
        method: "GET", 
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
    })
        clearuser();
        localStorage.removeItem("persist:root");
        navigate('/');
        
    }

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin','http://localhost:5000');
    useEffect(()=>{
      fetch("http://localhost:5000/forum_threads", {
      method: "GET", 
      credentials: 'include',
      headers:requestHeaders,
  })
  .then((res)=>{
      return res.json()
  })
  .then((res)=>{ 
        dispatch(allPosts(res));
      
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar" data-bs-theme="dark">
      <Container className='navBox'>
        <Navbar.Brand href="/home">WebForum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{marginRight:"200px"}}>
          <Nav className="me-auto" >
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/myposts">My Threads</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/post/general">General</NavDropdown.Item>
              <NavDropdown.Item href="/post/math">
                Math
              </NavDropdown.Item>
              <NavDropdown.Item href="/post/science">
                Science
                </NavDropdown.Item>
              <NavDropdown.Item href="/post/programming">
                Programming
              </NavDropdown.Item>
            </NavDropdown>
            <Link to = '/createposts'><Button style={{marginRight:"10px", marginLeft:"40px"}}>+ Create Thread</Button></Link>
          </Nav>
        </Navbar.Collapse>
        <div className ='profileBtn' style={{display:"flex", marginLeft:"0px", paddingLeft:"40px", paddingRight:"40px"}}>
          <div style={{display:"flex", width:"150px", justifyContent:"center"}}>
          <img src={currentuser_pfp} alt='not found' style={{height:"30px", width:"30px",borderRadius:"50%",border:"1px solid white" }}></img>
          <Nav.Link href="/profile" style={{marginLeft:"10px"}}> My Profile</Nav.Link>
          </div>
          <Button onClick={logoutHandler} style={{marginLeft:"10px"}}>LogOut</Button>
        </div>
        
      </Container>
    </Navbar>
  )
}

export default NavigationBar