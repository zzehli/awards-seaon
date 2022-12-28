import { React} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose } = props;
  
  return (
    <DialogTitle sx={{ m: 0, p: 2}}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default function MovieDetail(props) {

  return (
    <div>
     
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}

        BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.26)" } }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {`${props.detail.title}, ${props.detail.year}`}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', gap: 2}}>
            <Box
              component="img"
              alt="Movie Poster"
              sx={{alignSelf: 'start'}}
              src={`${props.detail.poster}`}
                  >
                 

            </Box>
            <Box>
            <Typography variant='body'>
              <strong>Name: </strong>{`${props.detail.title}`}
            </Typography>
            <Typography variant='body'>
              <br/><strong>Director: </strong>{`${props.detail.director}`}
            </Typography>
            <Typography variant='body'>
              <br/><strong>Cast: </strong>{`${props.detail.actors}`}
            </Typography>
            <Typography variant='body'>
              <br/><strong>Plot: </strong>{`${props.detail.plot}`}
            </Typography>
            </Box>
          </Box>
          
        </DialogContent>
        {/* {props.fromNomCard === false  &&
          <DialogActions>
          <Button autoFocus onClick={() => props.nominate( {Title: props.detail.title,
                                                            Year: props.detail.year,
                                                            imdbID: props.detail.id})}>
            Nominate
          </Button>
        </DialogActions>} */}
      </BootstrapDialog>
    </div>
  );
}