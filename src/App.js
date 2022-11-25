import { React, useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import { config } from './config';
// import { TextField } from '@mui/material';

function App() {
  const [inputText, setInputText] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const res = await fetch('http://www.omdbapi.com/?' + new URLSearchParams(
                        {apikey: config.OMDB_KEY,
                        s: `${inputText}`}));
      const data = await res.json();
      setSearchRes(data['Search'].map(elem => elem.Title));
      setIsLoading(false);
    };
    fetchMovies();
  }, [inputText])
  //   fetch('http://www.omdbapi.com/?' + new URLSearchParams(
  //     {apikey: config.OMDB_KEY,
  //      s: `${inputText}`})
  //     )
  //   .then((response) => response.json())
  //   .then((data) => setSearchRes(data['Search'].map(elem => elem.Title)));
  // }, [inputText])
  
  // async function fetchMovies() {
  //   const response = await fetch('/movies');
  //   // waits until the request completes...
  //   console.log(response);
  // }

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
      {isLoading? (
        <div>Loading...</div>
      ) : (
        <List input = {inputText} 
        titleList = {searchRes}/>
      )}
    </div>
  );
}

export default App;
