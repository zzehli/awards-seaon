import React from 'react'
import LaurelIcon from '../assets/Laurel.png';
import { Box, Typography, ListItem, ListItemText, Button, IconButton, Snackbar } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { generateNominationURL } from '../util';
import CloseIcon from '@mui/icons-material/Close';

const NominationCard = (props) => {
    const [open, setOpen] = React.useState(false);
    const [copy, setCopy] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
      };

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

    /* https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard */
    // https://web.dev/async-clipboard/

    async function copyNominationURL(nominations) {
        let url = generateNominationURL(nominations);
        try {
            await navigator.clipboard.writeText(url);
            setCopy(true);
        } catch (e) {
            console.error("failed", e);
            setCopy(false);
        }
        handleClick();
    }



    const handleClose = () => {
        setOpen(false);
    }
    
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );



    return (
        <Box>
            <Box       
            sx ={{
            boxShadow: 3,
            borderRadius: 5,
            height: 300,
            pt: 3,
            backgroundColor: 'background.paper'
            }}>
                {       
                props.nominateList.length === 0 ? (emptyNomination) : (
                    props.nominateList.map((item) => (
                    <ListItem key = {item.imdbID}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="add"
                                                onClick={() => {props.nominationRemove(item.imdbID)}}>
                                        <RemoveCircleIcon
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
                    gap: 2,
                    pt: 2
                }}>
                <Button 
                    variant="contained"
                    onClick={props.nominationClearHandler}
                    disabled={props.nominateList.length === 0}>
                        Clear Nominations</Button>
                <Button
                    variant="contained"
                    onClick={() => copyNominationURL(props.nominateList)}
                    disabled={props.nominateList.length === 0}>
                        Export To URL
                </Button>
                <Snackbar
                    action={action}
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message={copy? "URL copied to clipboard": "URL copy failed"}
                    />
            </Box>
        </Box>
   
        
    )
}

export default NominationCard