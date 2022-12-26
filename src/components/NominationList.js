import React from 'react'
import LaurelIcon from '../assets/Laurel.png';
import { Box, Typography, ListItem, ListItemText } from '@mui/material';


const NominationList = (props) => {

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
   
        <Box       
            sx ={{
            border: 2,
            borderRadius: 5,
            height: 300,
            pt: 3
            }}>
                {       
                props.nominateList.length === 0 ? (emptyNomination) : (
                    props.nominateList.map((item) => (
                    <ListItem key = {item.imdbID} >
                    <ListItemText primary = {`${item.Title} (${item.Year})`}/>
                    </ListItem>
                )))
                }
        </Box>
    )
}

export default NominationList