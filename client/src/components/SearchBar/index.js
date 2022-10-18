import React, { useState } from "react";


import "../SearchBar/searchBar.css";

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = () => {
  const [userName, setUserName] = useState('');
 
  const handleSearch = (event) => {
    event.preventDefault();
    
   window.location.assign(`/user/${userName}`);
    setUserName('');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if(name === 'userName') {
            setUserName(value);
        }
    };
  

  const clearInput = () => {
    setUserName('')
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <form
        onSubmit={handleSearch}
        >
        <input
          type="text"
          name="userName"
          placeholder="Serach Username..."
          value={userName}
          onChange={handleChange}
        />
        <div className="searchIcon">
          {userName.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        </form>
        </div>
        </div>
        )
    };

export default SearchBar;