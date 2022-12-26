import { React, useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import { config } from './config';
import { IconButton, TextField, Box, Typography, ListItem, ListItemText } from '@mui/material';
import  Container from '@mui/material/Container';
import ClearIcon from '@mui/icons-material/Clear';
import LaurelIcon from './assets/Laurel.png';
import { borderRadius, flexbox } from '@mui/system';

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
    setNominateList(prevList => [...prevList, {Title: item.Title, Year: item.Year}]);
  }

  const emptyNomination = (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{height:300}}>
        <img
        src={LaurelIcon}
        alt="Laurel"
        width={100}
        />
        <Typography variant="subtitle1" sx={{pt: 2}}>
          Your nominations will appear here.
        </Typography>
      </Box>

  )

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
        <Typography variant="subtitle1" gutterBottom component="div" sx={{pt: 2}}>
        The Shoppies
        </Typography>
        <Typography variant="subtitle2" component="div">
        Shopify 2021 Summer Internship Challenge
        </Typography>
        <h2>Nomination List</h2>
        <Box       
          sx ={{
            border: 2,
            borderRadius: 5,
            height: 300,
            pt: 3
          }}>
        
        {       
        nominateList.length === 0 ? (emptyNomination) : (
        nominateList.map((item) => (
          <ListItem key = {item} >
            <ListItemText primary = {`${item.Title} (${item.Year})`}/>
          </ListItem>
        )))
        }
        </Box>
        <Box sx={{pt: 5, pb: 2}}>
              <TextField 
                        fullWidth
                        id="standard-basic" 
                        value = {inputText}
                        onChange={inputHandler}
                        label="Search movie titles" 
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
        nominationHandler = {nominationHandler}/>
        )}

    </Container>
      
  );
}

export default App;
