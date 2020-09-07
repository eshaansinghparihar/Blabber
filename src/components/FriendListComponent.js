import React , {useState, useEffect,useContext} from 'react';
import * as firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from './HomeComponent';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  name: {
    margin: theme.spacing(1),
  },
  chatmssg: {
    marginLeft:'auto',
    marginRight:'auto'
},
nochat: {
    marginLeft:'auto',
    marginRight:'auto',
    height:'50vh',
    marginBottom:'auto',
    marginTop:theme.spacing(8)
},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  }
}));

function FriendList(){
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
    // var peopleRegistered=[];
    const [peopleRegistered, setPeopleRegistered]=useState([]);
    const uid=(firebase.auth().currentUser||{}).uid;
    const [error, setError]=useState('');
    useEffect(()=>{
      if(uid){
          firebase.firestore().collection("users").onSnapshot(function(querySnapshot) {
          var users = [];
          querySnapshot.forEach(function(doc) {
              users.push(doc.data());
          })
          setPeopleRegistered(users);
    });
  }
},[uid]);
        if(peopleRegistered.length){
        const friendCard=peopleRegistered.map(people=>{
            if(people.uid!==uid)
            return(
                
                <Paper square elevation={3} onClick={()=>{
                  dispatch({ type: 'CHANGE_PERSON', data: people});
                }}>
                <Grid component="main" container key={people.uid}>
                <Grid item sm={4} md={3}>
                {people.displayImage===''?(<Avatar className={classes.avatar} src="https://placeimg.com/140/140/any"/>):(<Avatar className={classes.avatar} src={people.displayImage} />)}
                </Grid>
                <Grid item sm={8} md={9}>
                {(people.displayName!=='')?(<Typography component="h6" variant="h6" className={classes.name}>
                {people.displayName}
                </Typography>):(<Typography component="h6" variant="h6" className={classes.name}>
                Loading... 
                </Typography>)}
                </Grid>
                </Grid>
                </Paper>
            );
        })
        return(
            <div>
            {friendCard}
            </div>
        );
    }
    else if(error)
    {
      return(
        <Paper elevation={3} >
        <Grid component="main" container>
        <Typography component="h6" variant="h6" color="error" className={classes.nochat}>
        {error? error: ''} 
        </Typography>
        </Grid>
        </Paper>
      );
    }
    else{
        return(
            <Paper elevation={3} >
            <Grid component="main" container>
            <Typography component="h6" variant="h6" className={classes.nochat}>
            There is No Chat to show! Search and Initiate a Convo now !
            {error? error: ''} 
            </Typography>
            </Grid>
            </Paper>
        );
    }

}
export default function FriendListComponent(){
    const classes = useStyles();
    return(
        <div>
        <Paper elevation={3} >
        <Grid component="main" container>
        <Typography component="h5" variant="h5" className={classes.chatmssg}>
        Contacts Appear Below
        </Typography>
        </Grid>
        </Paper>
        <div className="friendScroll">
        <FriendList/>
        </div>
        </div>
    );
}