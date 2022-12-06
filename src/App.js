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
      if (data.hasOwnProperty('Search')){
        setSearchRes(data['Search'].map(elem => elem.Title));
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [inputText])

  return (
    <Container maxWidth="md">
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
                              onClick={() => setInputText("")}
                              aria-label="clear">
                              <ClearIcon/>
                          </IconButton>
                        ) : undefined
                      }}
            />           
      </Box>
      <Paper>
        <Typography variant="h6" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Search Results
        </Typography>
        <Divider />
      
      {isLoading? (
            <div>Loading...</div>
          ) : (
            <MovieList input = {inputText} 
            titleList = {searchRes}/>
          )}
      </Paper>
    </Container>
      
  );
}

export default App;
