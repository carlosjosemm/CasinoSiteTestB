import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './Styles.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDataLayer } from './DataLayer';
import { actionTypes } from './reducer';


function SlotMachine() {
    const [{balance, tablerows}, dispatch] = useDataLayer();    

    const [slot1, setSlot1] = useState('-');
    const [slot2, setSlot2] = useState('-');
    const [slot3, setSlot3] = useState('-');
    const [Spinner, setShow] = useState(null);

    function updateBalance(updateLocal) {
        //checking first pair
        if (slot1==slot2) {
            if (slot2!==slot3) {
                var buffer = balance;
                buffer = buffer + 0.5;
            } else {
                if (slot1==7) {
                    var buffer = balance;
                    buffer = buffer + 10;
                } else {
                    var buffer = balance;
                    buffer = buffer + 5;
                }
            }
        }

        //checking second pair
        if (slot2==slot3) {
            if (slot1!==slot2) {
                var buffer = balance;
                buffer = buffer + 0.5;
            } else {
                if (slot1==7) {
                    var buffer = balance;
                    buffer = buffer + 10;
                } else {
                    var buffer = balance;
                    buffer = buffer + 5;
                }
            }
        } else { //losing case
            var buffer = balance;
            buffer = buffer - 1;
        }

        dispatch({type: actionTypes.SET_BALANCE, balance: buffer})        

        updateLocal(buffer);
        addRow();
    }

    function timestamp() {
        const date = new Date(Date.now());
        return date.toTimeString();
    }

    function addRow() {
        const buffer = tablerows;
        var newlen = (tablerows.length + 1);
        var time = timestamp();
        var finaltime = time.slice(0,17);
        buffer.push({id: newlen, slot1: slot1, slot2: slot2, slot3: slot3, time: finaltime })
        console.log('nueva prueba buffer: ', buffer);
        dispatch({type: actionTypes.ADD_ROW, tablerows: buffer});

    }

    function play() {
        setShow(true);
        setSlot1('-');
        setSlot2('-');
        setSlot3('-');
        setTimeout( function() {
            setSlot1(Math.round(Math.random() * 10))
        },
        1000);

        setTimeout(
            function() {
                setSlot2(Math.round(Math.random() * 10))
            },
        2000);

        setTimeout(
            function() {
                setSlot3(Math.round(Math.random() * 10))
                setShow(null);
            },
        3000);
    };

    function simulateWin() {
        setShow(true);
        setSlot1('-');
        setSlot2('-');
        setSlot3('-');

        setTimeout(
            function() {
                setSlot1(7)
            },
        1000)
        setTimeout(
            function() {
                setSlot2(7)
            },
        2000)
        setTimeout(
            function() {
                setSlot3(7)
                setShow(null);
                
            },
        3000)
    }

    function updateLocal(buffer) {
        localStorage.setItem('balance', buffer);
    }

    useEffect(() => {
        if (slot1=='-' || slot2=='-' || slot3=='-' || !Spinner) {
            return
        } else { //updating balance and rows only after last slot updates
            updateBalance(updateLocal); 
        }
    }, [slot3])

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>

            {Spinner && <CircularProgress />}

            <div className="Slots">
            <Typography variant="h2" className="Slot">
                {`${slot1}`}
            </Typography>
            <Typography variant="h2" className="Slot">
                {`${slot2}`}
            </Typography>
            <Typography variant="h2" className="Slot">
                {`${slot3}`}
            </Typography>
            </div>
            
            <div className="buttons">
            <Button onClick={play} >Play</Button>
            <Button onClick={simulateWin} >Simulate Win</Button>
            </div>
        </div>
    )
}

export default SlotMachine
