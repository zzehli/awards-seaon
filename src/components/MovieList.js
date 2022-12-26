import { React } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Paper, Divider, Typography } from '@mui/material';


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
                key={item.imdbID}>
                    <ListItemButton component="a" 
                                    onClick={() => {props.nominationHandler(item)}}
                                    >
                        <ListItemText primary = {`${item.Title} (${item.Year})`}/>
                    </ListItemButton>
                </ListItem>
            ))}
           
            </List>
        </Paper> 
    )
}

export default MovieList