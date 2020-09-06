import React , {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Fire from '../Fire';
const useStyles = makeStyles((theme) => ({
  name: {
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  profileBottom:{
      marginBottom:theme.spacing(3)
  }
}));
export default function ProfileComponent(){
    const classes = useStyles();
    const uid=(firebase.auth().currentUser||{}).uid
    const [displayName, setDisplayName]=useState('');
    const [displayImage, setDisplayImage]=useState('');
    const [error, setError]=useState('');
    
    useEffect(()=>{
        if(uid){
        firebase.firestore().collection("users").doc(uid).get()
        .then(function(doc) {
          if(doc.exists){
            setDisplayName(doc.data().displayName);
            setDisplayImage(doc.data().displayImage);
          }
          })
        .catch(error=>{
          setError(error.message)
        })
    }
    })
    return(
        <Link to="/profile" style={{ textDecoration: 'none' }}>
        <Grid className={classes.profileBottom}>
        <Paper elevation={3} >
        <Grid component="main" container>
        <Grid sm={8} md={10}>
        {(displayName!=='')?(<Typography component="h6" variant="h6" className={classes.name}>
        {displayName}
        </Typography>):(<Typography component="h6" variant="h6" className={classes.name}>
        Welcome Back 
        </Typography>)}
        </Grid>
        <Grid sm={4} md={2}>
        {(displayImage!=='')?(<Avatar className={classes.avatar} src={displayImage}/>):(<Avatar className={classes.avatar} src="https://placeimg.com/140/140/any"/>)}
        </Grid>
        </Grid>
        </Paper>
        </Grid>
        </Link>
    );
}