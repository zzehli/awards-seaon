import { React, useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import { config } from './config';
// import { TextField } from '@mui/material';

function App() {
  const [inputText, setInputText] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }
  useEffect(() => {

    fetch('http://www.omdbapi.com/?' + new URLSearchParams(
      {apikey: config.OMDB_KEY,
       s:"facebook"
        })
      )
    .then((response) => response.json())
    .then((data) => setSearchRes(data['Search'].map(elem => elem.Title)));
  }, [])
  

  return (
    <div className="main">
      <div className='search'>
        {/* <TextField id="standard-basic" 
                  onChange={inputHandler}
                  label="Standard" 
                  variant="standard" 
        /> */}
        <form>
          <label>
            Search
            <input type="text" name="name" onChange={inputHandler}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
      <List input = {inputText} 
            titleList = {searchRes}/>
    </div>
  );
}

export default App;
