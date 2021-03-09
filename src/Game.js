import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react'
import SlotMachine from './SlotMachine';
import Button from '@material-ui/core/Button';
import TableHist from './TableHist';


const modalStyle ={ top: `${50}%`,
left: `${50}%`,
transform: `translate(-${50}%, -${50}%)`,}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Game() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <Button type="button" onClick={handleOpen}>
                <strong>Start playing</strong>
            </Button>

            <TableHist />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            <div style={modalStyle} className={classes.paper}>
                <SlotMachine />
            </div>
            </Modal>
        </div>
    )
}

export default Game
