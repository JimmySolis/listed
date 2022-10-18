import React, { useState } from "react";


import "../SearchBar/searchBar.css";

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [userName, setUserName] = useState('');
 

    const handleChange = (event) => {
        const { name, value } = event.target;

        if(name === 'userName') {
            setUserName(value);
        }
    };
  

  return (
    <div className="search">
      <div className="searchInputs">
        <form
        >
        <input
          type="text"
          name="userName"
          placeholder="Serach Username..."
          value={userName}
          onChange={handleChange}
        />
        <div className="searchIcon">
           <Link to={`/user/${userName}`}><SearchIcon/></Link> 
        </div>
        </form>
        </div>
        </div>
        )
    };

export default SearchBar;