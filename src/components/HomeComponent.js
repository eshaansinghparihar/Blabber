import React , { useReducer , createContext} from 'react';

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
        //background: 'linear-gradient(45deg, #c471ed 30%, #f64f59 90%)',
        // use this below in profile section
        // background: 'linear-gradient(45deg, #3c1053 30%,#fdbb2d 110%)',
        // background: 'linear-gradient(45deg, #0cebeb 30%, #29ffc6 90%)',
        height: '100vh',
        backgroundPosition: 'center',
        width:'100vh',
        padding: theme.spacing(2),
      },
      imageMessage: {
        background: 'linear-gradient(-45deg, #FDC830 30%,#f05053 120%)',
        //background: 'linear-gradient(-45deg, #c471ed 30%, #f64f59 90%)',
        // background: 'linear-gradient(45deg,#9796f0 30% ,#fbc7d4 90%)',
        backgroundPosition: 'center',
        width:'100vh',
        height: '100vh',
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
        <Grid item xs={12} sm={4} md={3} className={classes.imageFriendList} component={Paper} elevation={8} square>
        <ProfileComponent/>
        <FriendList/>
        </Grid>
        <Grid item xs={12} sm={8} md={9} className={classes.imageMessage} component={Paper} elevation={8} square>
        <Message personSelected={personSelected}/>
        </Grid>
        </AppContext.Provider>
        </Grid>
    );
}