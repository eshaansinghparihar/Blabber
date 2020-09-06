import React , {useState, useEffect, useReducer , createContext} from 'react';

import * as firebase from 'firebase';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import FriendList from './FriendListComponent';
import Message from './MessageComponent';
import { makeStyles } from '@material-ui/core/styles';
import ProfileComponent from './ProfileComponent';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
    imageFriendList: {
        background: 'linear-gradient(45deg, #1de9b6 30%, #4dd0e1 90%)',
        // height: '100vh',
        // width:'100vh',
        padding: theme.spacing(2),
      },
      imageMessage: {
        background: 'linear-gradient(-45deg, #FE6B8B 30%, #FF8E53 90%)',
        // backgroundPosition: 'center',
        // width:'100vh',
        // height: '100vh',
        padding: theme.spacing(2),
      },  
}));

export const AppContext = createContext();

const initialState = {
  personSelected: ''
};
function reducer(state, action) {
  switch (action.type) {
      case 'CHANGE_PERSON':
          return {
            personSelected: action.data
          };

      default:
          return initialState;
  }
}

export default function Home(){
    const [state, dispatch] = useReducer(reducer, initialState);
    const {personSelected}=state;
    const classes = useStyles();
    return(
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <AppContext.Provider value={{ state, dispatch }}>
        <Grid item xs={5} sm={4} md={3} className={classes.imageFriendList} component={Paper} elevation={8} square>
        <ProfileComponent/>
        <FriendList/>
        </Grid>
        <Grid item xs={7} sm={8} md={9} className={classes.imageMessage} component={Paper} elevation={8} square>
        <Message personSelected={personSelected}/>
        </Grid>
        </AppContext.Provider>
        </Grid>
    );
}