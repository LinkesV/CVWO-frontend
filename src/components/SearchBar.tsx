import React from 'react'

import { Dispatch, SetStateAction } from 'react';
import './styles/SearchBar.css'
import Form from 'react-bootstrap/Form';

type IProps = {
    setSearchStatus: Dispatch<SetStateAction<string>>;
 }

function SearchBar(props: IProps) {

    const handleSearch = (val:string) =>{
        props.setSearchStatus(val);
      }
  return (
    <div>
        <Form.Control className="searchBar" type="text" id="search" placeholder="Type to search..." onChange={(e) => handleSearch(e.target.value)} 
                style={{height:"50px", width:"600px", marginTop:"70px"}}/>
    </div>
  )
}

export default SearchBar