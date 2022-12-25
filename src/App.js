import { React, useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import { config } from './config';
import { IconButton, TextField, Box, Paper, Divider, Typography } from '@mui/material';
import  Container from '@mui/material/Container';
import ClearIcon from '@mui/icons-material/Clear';

function App() {
  const [inputText, setInputText] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [isResDiv, setResDiv] = useState(false) ;
  const [isNominateList, setNominateList] = useState([]);

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('http://www.omdbapi.com/?' + new URLSearchParams(
                        {apikey: config.OMDB_KEY,
                        s: `${inputText}`}));
      const data = await res.json();
      if (data.hasOwnProperty('Search')){
        setSearchRes(data['Search'].map(elem => ({Title: elem.Title, Year: elem.Year})));
        setResDiv(true);
      }
    };
    fetchMovies();
  }, [inputText])

  return (
    <Container maxWidth="md">
        <Typography variant="subtitle1" gutterBottom component="div" sx={{pt: 2}}>
        The Shoppies
        </Typography>
        <Typography variant="subtitle2" component="div">
        Shopify 2021 Summer Internship Challenge
        </Typography>
        <Box sx={{pt: 5, pb: 2}}>
              <TextField 
                        fullWidth
                        id="standard-basic" 
                        value = {inputText}
                        onChange={inputHandler}
                        label="Movie titles" 
                        variant="outlined"
                        InputProps={{
                          endAdornment: inputText ? (
                            <IconButton 
                                size="small"
                                onClick={() => {setInputText("");
                                                setResDiv(false)}}
                                aria-label="clear">
                                <ClearIcon/>
                            </IconButton>
                          ) : undefined
                        }}
              />           
        </Box>
    
        { isResDiv && (
        <MovieList input = {inputText} 
        titleList = {searchRes}/>
        )}

    </Container>
      
  );
}

export default App;
