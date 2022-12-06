import { React } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


function MovieList(props) {
    // const filteredData = props.titleList.filter((elem) => {
    //     if (props.input === '') {
    //         return elem;
    //     } else {
    //         return elem.Title.toLowerCase().includes(props.input);
    //     }
    // })
    //console.log(props.titleList)

    return (
            <List>
            {props.titleList.map((item, index) => (
                <ListItem 
                key={index}>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemText primary = {item}/>
                    </ListItemButton>
                </ListItem>
            ))}
           
            </List>
        
    )
}

export default MovieList