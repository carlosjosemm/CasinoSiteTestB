import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDataLayer } from './DataLayer';
import { Avatar } from '@material-ui/core';
import {auth, provider} from "./firebase";
import {actionTypes} from "./reducer";
import { makeStyles } from '@material-ui/core/styles';
import './Styles.css';
import CasinoIcon from '@material-ui/icons/Casino';
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  

function Header() {

    const classes = useStyles();
    const [{user, balance}, dispatch] = useDataLayer();

    const signIn = () => {
        //Some sign in code...
        auth.signInWithPopup(provider).then(
            (result) => {
                dispatch(
                    {type: actionTypes.SET_USER, user: result.user}
                )
            }
        ).catch(error => alert(error.message));
    };

    //PERSISTING THE USER AUTH
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              dispatch({type: actionTypes.SET_USER, user: user});
            }
        })
    }, [user])

    return (
        <div className="header">
            <AppBar position="sticky">
                <Toolbar>
                    <CasinoIcon />
                {/* <img src= className="logo" /> */}
                <Typography variant="h6" className={classes.title}>
                    Casino Royale
                </Typography>
                <Typography variant="subtitle1" >
                    {`Balance $${balance}`}
                </Typography>

                {/* CHECKS IF USER IS LOGGED IN */}
                {user? 
                <> 
                    <Avatar src={user.photoURL} className="avatar" /> 
                        <Button style={{color: 'white'}}
                            onClick={() => 
                                {firebase.auth().signOut().then(() => {
                                    dispatch({type: actionTypes.SET_USER, user: null})
                                    // Sign-out successful.
                                    }).catch((error) => {
                                    // An error happened.
                                    console.log(error)
                                    });
                                }
                            }> LOGOUT 
                        </Button> 
                </> 
                : 
                <> <Button color="inherit" onClick={signIn}> LOGIN </Button> </> 
                }
                
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
