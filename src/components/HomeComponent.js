import React , {useState, useEffect} from 'react';
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
        backgroundImage: 'url(https://webgradients.com/public/webgradients_png/041%20Happy%20Acid.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width:'100vh',
        padding: theme.spacing(2),
      },
      imageMessage: {
        backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2019/09/Gradient-Desktop-Backgrounds-HD.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        // backgroundPosition: 'center',
        width:'100vh',
        height: '100vh',
        padding: theme.spacing(2),
      },  
}));

export default function Home(){
    const classes = useStyles();
    return(
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={5} sm={4} md={3} className={classes.imageFriendList} component={Paper} elevation={8} square>
        <ProfileComponent/>
        <FriendList/>
        </Grid>
        <Grid item xs={7} sm={8} md={9} className={classes.imageMessage} component={Paper} elevation={8} square>
        <Message/>
        </Grid>
        </Grid>
    );
}