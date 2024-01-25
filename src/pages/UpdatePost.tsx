import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { RootState } from '../store/store';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdatePost() {
    const navigate: NavigateFunction = useNavigate();
    const post_id = useParams().id;
    const select:TypedUseSelectorHook<RootState> = useSelector;
    const post = select(state=>(state.posts)).filter((post) => {return `${post.id}` === post_id})[0]
    const [title,setTitle] = useState<string>(post.title);
    const [body,setBody] = useState<string>(post.body);
    const [cat,setCat] = useState<string>(post.category);

    let check = true;
    const submitHandler = (e:React.FormEvent):void => {
        e.preventDefault()
        if(cat === "" || cat === "Select your category"){
          toast.error("Please choose a category")
          check = false;
        }
        if (title.length === 0 || body.length === 0 ){
          toast.error("Please fill in all the details of the thread")
          check = false
        }
        if (check) {
          try{
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Access-Control-Allow-Origin','https://mysite-bg8a.onrender.com');
            // requestHeaders.set("Access-Control-Allow-Credentials",'true');
  
          fetch(`https://mysite-bg8a.onrender.com/forum_threads/${post_id}`, {
            method: "PUT", 
            credentials: 'include',
            headers:requestHeaders,
            body: JSON.stringify({
              title: title,
              body: body,
              category: cat,
            })
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{ 
            
           alert('Thread has been updated')
           navigate(`/home`)
        })
       
      }
      catch(err){
          console.log(err)
      }
        }
    }

    const cancelHandler = (e:React.FormEvent):void => {
      e.preventDefault()
      navigate('/home')
    }

  return (
    <div >
        <NavigationBar/>
        <div style={{display:"flex", justifyContent:"center"}}>
        <div className='postform'>
        <h3 className='titleSign'>Update Thread</h3>
        <Form style={{display:"flex", flexDirection:"column"}}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="title" defaultValue={post.title} onChange={(e)=>setTitle(e.target.value)} style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBody">
          <Form.Label>Body:</Form.Label>
          <Form.Control as="textarea" defaultValue={post.body}  onChange={(e)=>setBody(e.target.value)} style={{height: "300px", width:"300px"}}/>
        </Form.Group>
        <Form.Label>Category:</Form.Label>
        <Form.Select aria-label="Default select example" style={{ width:"300px"}} onChange={(e) => setCat(e.target.value)}>
        <option>Select your category</option>
          <option value="General">General</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Programming">Programming</option>
        </Form.Select>
        <br></br>
        <Button variant="outline-success" type="submit" onClick={(e)=>submitHandler(e)} style={{width:"300px"}}>
          Update my post
        </Button>
        <Button variant="outline-danger" type="submit"  style={{width:"300px"}} onClick={(e) => cancelHandler(e)}>
          Cancel
        </Button>
    </Form>
        </div>
        <ToastContainer/>
        </div>
    </div>
  )
}

export default UpdatePost