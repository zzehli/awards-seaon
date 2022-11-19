import { React, useState } from 'react';
import './App.css';
import { TextField } from '@mui/material';
import List from './components/List';

function App() {
  const [inputText, setInputText] = useState("")
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase)
  }
  return (
    <div className="main">
      <div className='search'>
        <TextField id="standard-basic" 
                  onChange={inputHandler}
                  label="Standard" 
                  variant="standard" 
        />
      </div>
      <List input = {inputText}/>
    </div>
  );
}

export default App;
