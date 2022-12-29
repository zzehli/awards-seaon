import { React, useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import NominationCard from './components/NominationCard';
import { config } from './config';
import { Button, IconButton, TextField, Box, Typography} from '@mui/material';
import  Container from '@mui/material/Container';
import ClearIcon from '@mui/icons-material/Clear';
import { getQueryParam } from './util';
import LinkIcon from '@mui/icons-material/Link';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';


function App() {
  const [inputText, setInputText] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [isResDiv, setResDiv] = useState(false) ;
  const [nominateList, setNominateList] = useState([]);
  const [detail, setDetail] = useState({})
  const [openDetail, setOpenDetail] = useState(false);

  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }
  
  const nominationHandler = (item) => {
    if (!(nominateList.some(elem => elem.imdbID === item.imdbID))){
      setNominateList(prevList => [...prevList, {Title: item.Title, 
        Year: item.Year,
        imdbID: item.imdbID}]);
    }
  }

  const nominationRemove = (id) => {
    setNominateList(prevList => prevList.filter(item => id !== item.imdbID))
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('https://www.omdbapi.com/?' + new URLSearchParams(
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
          const queryParams = getQueryParam();

          window.history.replaceState(null, "", window.location.pathname);

          async function fetchGroup() {
           // https://stackoverflow.com/questions/50006595/using-promise-all-to-fetch-a-list-of-urls-with-await-statements
            let urls = queryParams.map((query) => {
              let param =  new URLSearchParams({apikey: config.OMDB_KEY,
                                                i: `${query}`}).toString()
              return 'https://www.omdbapi.com/?' + param
            });
            try{
              const res = await Promise.all(urls.map(url => fetch(url)));
              const data = await Promise.all(res.map(dt => dt.json()));
              setNominateList(
                data.map((item) => ({Title: item['Title'], 
                                    Year: item['Year'],
                                    imdbID: item['imdbID']})
                        )
              )
            } catch (err) {
              console.log(err)
            }
          }

          fetchGroup();
        
      }, [])

   // https://bobbyhadz.com/blog/react-fetch-data-on-button-click
   const fetchDetail = async (id) => {
    try{
        
        const res = await fetch('https://www.omdbapi.com/?' + new URLSearchParams(
                                                        {apikey: config.OMDB_KEY,
                                                        i: `${id}`,
                                                        plot: 'full'}));
            const data = await res.json();
            if (data.hasOwnProperty('Title')){
            setDetail({title: data.Title,
                        year: data.Year,
                        runtime: data.Runtime,
                        director: data.Director,
                        actors: data.Actors,
                        plot: data.Plot,
                        poster: data.Poster,
                        id: data.imdbID})
            }
            setOpenDetail(true);

      } catch (err) {
        console.log(err)
      }
    }
    const handleCloseDetail = () => {
      setOpenDetail(false);
    }


  return (
    <Container maxWidth="md">
        <Box display='flex' justifyContent='space-between' sx={{pt: 2, pb:1}}>
        {/* {{sm: 'flex'}} */}
          <Typography variant= "subtitle1" component="div">
            <strong>Nominate Your Favorite Movies</strong>       
          </Typography>
          <Box>
            <Button size='small' 
                    endIcon={<LinkIcon/>} 
                    href="https://github.com/zzehli/awards-seaon" 
                    target="_blank" 
                    rel="noreferrer"
                 
                    >
              Github Repository
            </Button>
            <Button size='small' 
                    endIcon={<BuildCircleIcon/>} 
                    href="https://jaeli.me/" 
                    target="_blank" 
                    rel="noreferrer"
                    
                    >
              Jae Li
            </Button>
          {/* <Typography variant='body2' sx={{display: 'inline-block', alignSelf: 'flex-end'}}>
             Made by <Link href="https://jaeli.me/" target="_blank" rel="noreferrer">Jae Li</Link>
          </Typography> */}
          </Box>
         
        </Box>

      
        <NominationCard nominateList = {nominateList}
                        nominationClearHandler = {() => {setNominateList([])}}
                        nominationRemove = {nominationRemove}
                        fetchDetail = {fetchDetail}
                        handleCloseDetail = {handleCloseDetail}
                        openDetail = {openDetail}
                        detail = {detail}

                        />

        <Box sx={{pt: 5, pb: 2}}>
              <TextField 
                        fullWidth
                        id="standard-basic" 
                        value = {inputText}
                        onChange={inputHandler}
                        label="Search Movie Titles" 
                        variant="outlined"
                        sx={{
                          bgcolor: 'background.paper'
                        }}
                        InputProps={{
                          endAdornment: inputText ? (
                            <IconButton 
                                size="small"
                                onClick={() => {setInputText("");
                                                setResDiv(false)}}
                                aria-label="clear">
                                <ClearIcon/>
                            </IconButton>
                          ) : undefined}}
                         

              />           
        </Box>

        { isResDiv && (
        <MovieList input = {inputText} 
        titleList = {searchRes}
        nominationHandler = {nominationHandler}
        nominationList = {nominateList}
        fetchDetail = {fetchDetail}
        handleCloseDetail = {handleCloseDetail}
        openDetail = {openDetail}
        detail = {detail}
        />
        )}
    </Container>
      
  );
}

export default App;
