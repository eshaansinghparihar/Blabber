import React , {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import { Typography, Grid,Paper ,Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import './Styles.css';
const useStyles = makeStyles((theme) => ({
    paper:{
        marginBottom:theme.spacing(2)
    },
    name: {
    float:'left',
    margin:theme.spacing(1),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    left:{
        float:'left',
        // marginRight: theme.spacing(8),
        background: 'linear-gradient(45deg, #b92b27 30%, #1565C0 90%)',
        borderRadius: 20,
        border: 0,
        color: 'white',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginBottom:theme.spacing(1),
    },
    right:{
        float:'right',
        // marginLeft: theme.spacing(8),
        background: 'linear-gradient(45deg, #3c1053 30%,#fdbb2d  90%)',
        borderRadius: 20,
        border: 0,
        color: 'white',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginBottom:theme.spacing(1),
    },
  }));
const FriendProfile=({personSelected})=>{
    const classes = useStyles();
    if(personSelected){
        return(
            <Paper className={classes.paper} square elevation={3} >
              <Grid component="main" container >
              <Grid item sm={1} md={1}>
              {personSelected.displayImage===''?(<Avatar className={classes.avatar} src="https://placeimg.com/140/140/any"/>):(<Avatar className={classes.avatar} src={personSelected.displayImage} />)}
              </Grid>
              <Grid item sm={8} md={8}>
              {(personSelected.displayName!=='')?(<Typography component="h5" variant="h5" className={classes.name}>
              {personSelected.displayName}
              </Typography>):(<Typography component="h5" variant="h5" className={classes.name}>
              Loading... 
              </Typography>)}
              </Grid>
              <Grid item sm={12} md={12}>
              {(personSelected.lastseen!=='')?(<Typography variant="subtitle2" display="block"  color= "primary" className={classes.name}>
              Last seen {moment(personSelected.lastseen).fromNow()} on {new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}).format(personSelected.lastseen)}
              </Typography>):(<Typography variant="subtitle2" display="block"  color= "primary" className={classes.name}>
              Loading... 
              </Typography>)}
              </Grid>
              </Grid>
              </Paper>
        )
    }
    else{
        return(
            <div/>
        );
    }
}
const MessageList=({personSelected, me})=>{
    const classes = useStyles();
    if(me.messages){
    var relevantMssgs= me.messages.filter(mssg=>((mssg.senderID===me.uid && mssg.receiverID===personSelected.uid)||(mssg.senderID===personSelected.uid && mssg.receiverID===me.uid)))
    }
    if(relevantMssgs && personSelected){
        const mssgList=relevantMssgs.map(mssg=>{
            return(
                <Paper elevation={3} width={100}>
                {mssg.senderID===me.uid?(<Grid component={Paper} className={classes.right} >
                    <Typography variant="subtitle2" display="block" className={classes.name}>{mssg.senderName}</Typography>
                    <br/>
                    <Typography variant="subtitle1" display="block" className={classes.name}>{mssg.message}</Typography>
                    <br/>
                    <Typography variant="subtitle1" display="block" className={classes.name}>{new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}).format(mssg.timestamp)}</Typography>
                    <br/>
                    </Grid>):(<Grid component={Paper} className={classes.left} >
                    <Typography variant="subtitle2" display="block" className={classes.name}>{mssg.senderName}</Typography>
                    <br/>
                    <Typography variant="subtitle1" display="block" className={classes.name}>{mssg.message}</Typography>
                    <br/>
                    <Typography variant="subtitle1" display="block" className={classes.name}>{new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}).format(mssg.timestamp)}</Typography>
                    <br/>
                    </Grid>)}
                </Paper>
            )
        }
        )
        return(
            <div className="mssgScroll">
            {mssgList}
            </div>
        )
    }
    else
    {
        return(
            <div/>
        )
    }

}
export default function Message({personSelected }){
    // console.log(props.personSelected.displayName)
    const uid=(firebase.auth().currentUser||{}).uid;
    const [me, setMe]=useState({});
    useEffect(()=>{
        if(uid){
            firebase.firestore().collection("users").doc(uid)
            .onSnapshot(function(doc) {
                setMe(doc.data());
            });
        }
    },[uid]);
    return(
        <div>
        <FriendProfile personSelected={personSelected}/>
        <MessageList personSelected={personSelected} me={me}/>
        <div>
        This is where Message Send Box and Message Send Button will appear
        </div>
        </div>
    );
}