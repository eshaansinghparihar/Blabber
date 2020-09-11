import React , {useState, useEffect,useContext} from 'react';
import * as firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid,Button ,TextField,ListItem,Divider, CardContent} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from './HomeComponent';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  name: {
    margin: theme.spacing(1),
  },
  messagebararea:{
    // background: '#fff',
    padding: '0 10px',
    // borderRadius: 50,
    marginLeft:'auto',
    marginRight:'auto'
    // background: 'linear-gradient(45deg, #fff 60%, #ffe 90%)',
},
nodata:{
  //   borderBottom:'10px solid #FFD700',
    margin:theme.spacing(2),
    alignItems:'center',
    width:'100%',
    justifyContent:'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft:'auto',
    marginRight:'auto',
    // minWidth:'100'
},
avatarmssg: {
marginTop: theme.spacing(3),
background: 'linear-gradient(45deg, #b92b27 30%, #1565C0 90%)',
marginLeft:'auto',
marginRight:'auto',
marginBottom: theme.spacing(3),
// alignItems:'center',
// justifyItems:'center'
},
submitSend:{
  borderRadius: 5,
  marginBottom:'5px',
  marginLeft:'auto',
  marginRight:'auto',
  marginTop:'5px'
},
  chatmssg: {
    marginLeft:'auto',
    marginRight:'auto',
},
nochat: {
    marginLeft:theme.spacing(1),
    marginRight:theme.spacing(1),
    height:'40vh',
    marginBottom:theme.spacing(8),
    marginTop:theme.spacing(8)
},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  }
}));
function SearchwithFriendList({searchQuery}){
    const classes = useStyles();
    const {state, dispatch} = useContext(AppContext);
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
    firebase.firestore().collection("users").doc(uid).update({
      lastseen: Date.now()
  })
  }
},[uid]);
  var searchResult=[];
  searchResult=peopleRegistered.filter(elem=>(elem.displayName.toUpperCase().includes(searchQuery.toUpperCase())));
  if(searchResult.length ){
    const searchCard=searchResult.map((searchelem)=>{
        if(searchelem.uid!==uid)
        return(
            <Paper container="true" onClick={()=>{
              dispatch({ type: 'CHANGE_PERSON', data: searchelem});
              firebase.firestore().collection("users").doc(uid).update({
                lastseen: Date.now()
              });
            }}>
            <ListItem button>
            <Grid component="main" container key={searchelem.uid}>
            <Grid item sm={4} md={3}>
            {searchelem.displayImage===''?(<Avatar className={classes.avatar} src="https://placeimg.com/140/140/any"/>):(<Avatar className={classes.avatar} src={searchelem.displayImage} />)}
            </Grid>
            <Grid item sm={8} md={9}>
            {(searchelem.displayName!=='')?(<Typography component="h6" variant="h6" className={classes.name}>
            {searchelem.displayName}
            </Typography>):(<Typography component="h6" variant="h6" className={classes.name}>
            Loading... 
            </Typography>)}
            </Grid>
            </Grid>
            </ListItem>
            <Divider/>
            </Paper>
            
      );
    })
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
        {searchCard}
        </div>
      </div>
    )
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
        <CardContent>
            <Avatar className={classes.avatarmssg}>
                <MoodBadIcon />
            </Avatar>
            <Typography component="body2" display="block" className={classes.nochat}>
        There is no chat to show! Either the data is being downloaded or no user is registered. 
        </Typography>
        </CardContent>
        </Grid>
        </Paper>
    );
}
}
export default function FriendListComponent(){
    const classes = useStyles();
    const [searchQuery,setSearchQuery]=useState('');
    return(
        <div>
        <Paper elevation={3} >
        <Grid component="main" container>
        <Grid item xs={9} sm={9} md={9}>
        <TextField
              margin="dense"
              fullWidth
              variant="outlined"
              label=" Search "
              id="searchQuery"
              name="searchQuery"
              className={classes.messagebararea}
              value={searchQuery}
              onInput={ e=>setSearchQuery(e.target.value)}
        />
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
        {searchQuery===''?(<Button
          type="submit"
          className={classes.submitSend}
          color="primary"
          onClick={()=>setSearchQuery('')}
        ><SearchIcon fontSize="default" className={classes.name}>
        </SearchIcon>
        </Button>):(
        <Button
          type="submit"
          className={classes.submitSend}
          onClick={()=>setSearchQuery('')}
        >
        <CancelIcon color="secondary" fontSize="default" className={classes.name}></CancelIcon></Button>)}
        </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
        <SearchwithFriendList searchQuery={searchQuery}/>
        </Grid>
        </Paper>
        </div>
    );
}