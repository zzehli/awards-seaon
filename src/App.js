import { React, useState } from 'react';
import './App.css';
import List from './components/List';
// import { TextField } from '@mui/material';

function App() {
  const [inputText, setInputText] = useState("")
  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase)
  }
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
      <List input = {inputText}/>
    </div>
  );
}

export default App;
