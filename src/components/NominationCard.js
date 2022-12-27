import React from 'react'
import LaurelIcon from '../assets/Laurel.png';
import { Box, Typography, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const NominationCard = (props) => {

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

    return (
        <Box>
            <Box       
            sx ={{
            boxShadow: 3,
            borderRadius: 5,
            height: 300,
            pt: 3
            }}>
                {       
                props.nominateList.length === 0 ? (emptyNomination) : (
                    props.nominateList.map((item) => (
                    <ListItem key = {item.imdbID}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="add"
                                                onClick={() => {props.nominationRemove(item.imdbID)}}>
                                        <RemoveCircleIcon color='primary'  
                                                            sx={{ fontSize: 30 }}/>
                                    </IconButton>
                                }>
                        <ListItemText primary = {`${item.Title} (${item.Year})`}/>
                    </ListItem>
                )))
                }
            </Box>
            <Box
                sx = {{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    pt: 2
                }}>
                <Button 
                    variant="contained"
                    onClick={props.nominationClearHandler}
                    disabled={props.nominateList.length === 0}>
                        Clear Nominations</Button>
            </Box>
        </Box>
   
        
    )
}

export default NominationCard