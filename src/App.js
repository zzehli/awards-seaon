import { React, useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import NominationCard from './components/NominationCard';
import { config } from './config';
import { IconButton, TextField, Box, Typography} from '@mui/material';
import  Container from '@mui/material/Container';
import ClearIcon from '@mui/icons-material/Clear';


function App() {
  const [inputText, setInputText] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [isResDiv, setResDiv] = useState(false) ;
  const [nominateList, setNominateList] = useState([]);

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }
  
  const nominationHandler = (item) => {
    setNominateList(prevList => [...prevList, {Title: item.Title, 
                                              Year: item.Year,
                                              imdbID: item.imdbID}]);
  }

  const nominationRemove = (id) => {
    setNominateList(prevList => prevList.filter(item => id !== item.imdbID))
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('http://www.omdbapi.com/?' + new URLSearchParams(
                        {apikey: config.OMDB_KEY,
                        s: `${inputText}`}));
      const data = await res.json();
      if (data.hasOwnProperty('Search')){
        setSearchRes(data['Search'].map(elem => ({Title: elem.Title, Year: elem.Year, imdbID: elem.imdbID})));
        setResDiv(true);
      }
    };
    fetchMovies();
  }, [inputText])

  return (
    <Container maxWidth="md">
        <Typography variant="subtitle2" gutterBottom component="div" sx={{pt: 2}}>
        The Shoppies:  Shopify 2021 Summer Internship Challenge
        </Typography>
      
        <NominationCard nominateList = {nominateList}
                        nominationClearHandler = {() => {setNominateList([])}}
                        nominationRemove = {nominationRemove}
                        />

        <Box sx={{pt: 5, pb: 2}}>
              <TextField 
                        fullWidth
                        id="standard-basic" 
                        value = {inputText}
                        onChange={inputHandler}
                        label="Search Movie Titles" 
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
        titleList = {searchRes}
        nominationHandler = {nominationHandler}
        nominationList = {nominateList}/>
        )}

    </Container>
      
  );
}

export default App;
