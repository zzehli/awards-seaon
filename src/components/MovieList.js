import { React, useCallback, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Paper, Divider, Typography, IconButton, ListItemButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MovieDetail from "./MovieDetail";
import { config } from '../config';


function MovieList(props) {
    const [openDetail, setOpenDetail] = useState(false);
    const [detail, setDetail] = useState([]);
    
    const handleCloseDetail = () => {
        setOpenDetail(false);
    }
    // https://bobbyhadz.com/blog/react-fetch-data-on-button-click
    const fetchMovie = async (id) => {
        try{
            
            const res = await fetch('http://www.omdbapi.com/?' + new URLSearchParams(
                                                            {apikey: config.OMDB_KEY,
                                                            i: `${id}`,
                                                            plot: 'full'}));
                const data = await res.json();
                if (data.hasOwnProperty('Title')){
                //setSearchRes(data['Search'].map(elem => ({Title: elem.Title, Year: elem.Year, imdbID: elem.imdbID})));
                //setResDiv(true);
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
   

    return (
        <Paper>
        <Typography variant="h6" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Search Results
        </Typography>
        <Divider />
        <List>
            {props.titleList.map((item) => (
                <ListItem 
                key={item.imdbID}
                secondaryAction={
                    <IconButton edge="end" aria-label="add"
                                onClick={() => {props.nominationHandler(item)}}
                                disabled={
                                    props.nominationList.length > 4 ||
                                    props.nominationList.some( one => one.imdbID === item.imdbID)
                                  }>
                        <AddCircleIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                }>
                    <ListItemButton onClick={() => fetchMovie(item.imdbID)}>
                        <ListItemText primary = {`${item.Title} (${item.Year})`}/>
                    </ListItemButton>
                </ListItem>
            ))}
           
        </List>
        {Object.keys(detail).length !== 0 && <MovieDetail open={openDetail} 
                                                    handleClose={handleCloseDetail}
                                                    detail={detail}
                                                    nominate={props.nominationHandler}/>}
        </Paper> 
    )
}

export default MovieList