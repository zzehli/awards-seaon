import { React } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Paper, Divider, Typography, IconButton, ListItemButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MovieDetail from "./MovieDetail";

function MovieList(props) {
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
                    <ListItemButton onClick={() => props.fetchDetail(item.imdbID)}>
                        <ListItemText primary = {`${item.Title} (${item.Year})`}/>
                    </ListItemButton>
                </ListItem>
            ))}
           
        </List>
        {Object.keys(props.detail).length !== 0 && <MovieDetail open={props.openDetail} 
                                                    handleClose={props.handleCloseDetail}
                                                    detail={props.detail}/>}
        </Paper> 
    )
}

export default MovieList