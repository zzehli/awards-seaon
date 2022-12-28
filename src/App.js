import { React, useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import NominationCard from './components/NominationCard';
import { config } from './config';
import { IconButton, TextField, Box, Typography} from '@mui/material';
import  Container from '@mui/material/Container';
import ClearIcon from '@mui/icons-material/Clear';
import { getQueryParam } from './util';


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

  useEffect(() => {
        if (window.location.search) {
          let group = [];
          async function fetchGroup() {
            const queryParams = getQueryParam();
            window.history.replaceState(null, "", window.location.pathname);

          //   await Promise.all(queryParams.map(async (query) => {
          //     const res = await fetch('http://www.omdbapi.com/?' + new URLSearchParams(
          //       {apikey: config.OMDB_KEY,
          //       i: `${query}`}));
          //     const data = await res.json();
          //     group.push({Title: data['Title'], 
          //                   Year: data['Year'],
          //                   imdbID: data['imdbID']});
    
          //   }))
          // };
          // fetchGroup();
          

          // console.log('group', group);
          // setNominateList(group);
          // https://stackoverflow.com/questions/50006595/using-promise-all-to-fetch-a-list-of-urls-with-await-statements
          console.log(queryParams)
          try{
            const res = await Promise.all(queryParams.map((query) => {
              fetch('http://www.omdbapi.com/?' + new URLSearchParams(
                                          {apikey: config.OMDB_KEY,
                                          i: `${query}`}))}));
            // console.log(res)
            const data = await Promise.all(res.map(one => one.json()));
            for (let item of data) {
              console.log(item);
            }
          } catch (err) {
            console.log(err)
          }
          }
          fetchGroup();
        }
      }, [])

      useEffect(() => {
        console.log('nominate', nominateList)
      }, [nominateList])

      

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
