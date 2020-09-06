import React , {useState, useEffect,useContext} from 'react';
import * as firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from './HomeComponent';
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
    backgroundColor: theme.palette.secondary.main,
  }
}));

function FriendList(){
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
    const [peopleRegistered, setPeopleRegistered]=useState([]);
    const [personSelected, SetPersonSelected]= useState({});
    const uid=(firebase.auth().currentUser||{}).uid;
    const [error, setError]=useState('');
    useEffect(()=>{
        if(uid){
          firebase
        .firestore()
        .collection("users")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let users = querySnapshot.docs.map(doc => doc.data());
            setPeopleRegistered(users);
          });
        })
        .catch(err=>alert(err))
        }
    })
    //dispatch personSelected and personSelectedID to the reducer
    // dispatch({ type: 'CHANGE_PERSON', data: personSelected});
    if(peopleRegistered.length){
        const friendCard=peopleRegistered.map(people=>{
            if(people.uid!==uid)
            return(
                
                <Paper square elevation={3} onClick={()=>{
                  dispatch({ type: 'CHANGE_PERSON', data: people});
                }}>
                <Grid component="main" container key={people.uid}>
                <Grid sm={4} md={3}>
                <Button>
                {people.displayImage===''?(<Avatar className={classes.avatar} src="https://placeimg.com/140/140/any"/>):(<Avatar className={classes.avatar} src={people.displayImage} />)}
                </Button>
                </Grid>
                <Grid sm={8} md={9}>
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
        Chats Appear Below
        </Typography>
        </Grid>
        </Paper>
        <FriendList/>
        </div>
    );
}