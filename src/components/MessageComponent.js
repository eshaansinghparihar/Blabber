import React , {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import { Typography, Grid,Paper ,Avatar, TextField, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import SendIcon from '@material-ui/icons/Send';
import AttachmentIcon from '@material-ui/icons/Attachment';
import './Styles.css';
const useStyles = makeStyles((theme) => ({
    paper:{
        marginBottom:theme.spacing(2)
    },
    messagebar:{
        minHeight:'4vh',
    },
    messagebararea:{
        // background: '#fff',
        padding: '0 10px',
        borderRadius: 20,
        // background: 'linear-gradient(45deg, #fff 60%, #ffe 90%)',
    },
    name: {
    float:'left',
    margin:theme.spacing(2),
    },
    mssg: {
        float:'left',
        margin:5,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    left:{
        float:'left',
        // marginRight: theme.spacing(8),
        // background: 'linear-gradient(45deg, #b92b27 30%, #1565C0 90%)',
        background: 'linear-gradient(45deg, #3f2b96 30%, #a8c0ff 90%)',
        borderRadius: 20,
        border: 0,
        maxWidth:'90vh',
        color: 'white',
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginBottom:theme.spacing(1),
    },
    right:{
        float:'right',
        // marginLeft: theme.spacing(8),
        // background: 'linear-gradient(45deg, #3c1053 30%,#fdbb2d 110%)',
        background: 'linear-gradient(45deg, #fff 20%, #ffe 90%)',
        borderRadius: 20,
        maxWidth:'90vh',
        border: 0,
        color: 'black',
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginBottom:theme.spacing(1),
    },
    submitSend:{
        background: 'linear-gradient(45deg, #ffdde1 30%,#ee9ca7 110%)',
        borderRadius: 20,
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        width:'80%',
        marginBottom:'5px'
    },
    submitUpload:{
        background: 'linear-gradient(45deg, #ffdde1 30%, #C9D6FF 90%)',
        borderRadius: 20,
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        width:'80%',
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
              Last seen {moment(personSelected.lastseen).fromNow()} on {new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(personSelected.lastseen)} around {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit'}).format(personSelected.lastseen)}
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
    if(me.messages && me.uid ){
    var relevantMssgs= me.messages.filter(mssg=>((mssg.senderID===me.uid && mssg.receiverID===personSelected.uid)||(mssg.senderID===personSelected.uid && mssg.receiverID===me.uid)))
    if(relevantMssgs.length===0)
    {
        relevantMssgs=[
            {
                message:`It appears that you dont have any conversation with ${personSelected.displayName} yet ! I guess they won't mind a "Hello".
                FunFact : Sometimes it only takes a " Hi! " to initiate a connection to people `,
                senderName:'Blabber(Admin)',
                timestamp:Date.now()
            }
        ];
    }
    }
    if(relevantMssgs && personSelected){
        const mssgList=relevantMssgs.map(mssg=>{
            return(
                // <div className="mssgWrapper">
                // <Paper elevation={3} >
                <div>
                {mssg.senderID===me.uid?(
                    <div className="right mssgWrapper">
                    <Paper elevation={3} >
                    <Grid item component={Paper} className={classes.right} >
                    <Typography variant="caption" display="block" className={classes.mssg}>{mssg.senderName}</Typography>
                    <br/>
                    <Typography variant="subtitle1" display="inline" noWrap={false} className={classes.mssg}>{mssg.message}</Typography>
                    <br/>
                    <Typography variant="caption" display="block" className={classes.mssg}>{new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}).format(mssg.timestamp)}</Typography>
                    <br/>
                    </Grid>
                    </Paper>
                    </div>
                    )
                    :(
                    <div  className="left mssgWrapper" >
                    <Paper elevation={3} >
                    <Grid item component={Paper} className={classes.left}  >
                    <Typography variant="caption" display="block" className={classes.mssg}>{mssg.senderName}</Typography>
                    <br/>
                    <Typography variant="subtitle1" display="inline" noWrap={false} className={classes.mssg}>{mssg.message}</Typography>
                    <br/>
                    <Typography variant="caption" display="block" className={classes.mssg}>{new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}).format(mssg.timestamp)}</Typography>
                    <br/>
                    </Grid>
                    </Paper>
                    </div>)}
                </div>    
                // </Paper>
                // </div>
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
            <div className="mssgScroll">
            <Paper container xs={12} sm={12} md={12} elevation={3} >
            <Grid  component={Paper} className={classes.left} >
            <Typography variant="caption" display="block" className={classes.mssg}>Blabber(Admin)</Typography>
            <br/>
            <Typography variant="subtitle1" display="block" className={classes.mssg}>It appears that you dont have  conversation with anyone yet ! I guess {personSelected.displayName} won't mind a "Hello".<br/>FunFact:Sometimes it only takes a " Hi! " to initiate a connection to people </Typography>
            <br/>
            <Typography variant="caption" display="block" className={classes.mssg}>{new Intl.DateTimeFormat('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}).format(Date.now())}</Typography>
            <br/>
            </Grid>    
            </Paper>
            </div>
        )
    }

}

const MessageBar=({personSelected,me})=>{
    const classes = useStyles();
    const [inputMessage,setInputMessage]=useState('');
    const handleAttatchmentUpload=(e)=>{};
    const handleSubmit=(e)=>{
        // e.preventDefault();
        firebase.firestore().collection("users").doc(me.uid).update({
            lastseen: Date.now()
        })
        .catch(error=> alert(error.message));

        firebase.firestore().collection("users").doc(me.uid).update({
        messages:firebase.firestore.FieldValue.arrayUnion({message:inputMessage,imgMssg:'', senderName:me.displayName , receiverName:personSelected.displayName , senderID:me.uid, receiverID:personSelected.uid, timestamp: Date.now()}),
        }).catch(error=>alert(error.message));

        firebase.firestore().collection("users").doc(personSelected.uid).update({
        messages:firebase.firestore.FieldValue.arrayUnion({message:inputMessage,imgMssg:'', senderName:me.displayName , receiverName:personSelected.displayName , senderID:me.uid, receiverID:personSelected.uid, timestamp: Date.now()}),
        }).catch(error=>alert(error.message));

        setInputMessage('');
    }
    if(personSelected && me){
        return(
        <Grid component="main" className={classes.messagebar}  container xs={12} sm={12} md={12} elevation={3}>
        <Grid className={classes.messagebararea} item xs={10} sm={10} md={10} component={Paper}>
        <TextField
              margin="dense"
              fullWidth
              label="Enter your message here..."
              id="inputMessage"
              name="inputMessage"
              multiline
              marginDense
              className={classes.textarea}
              rowsMax={2}
              value={inputMessage}
              onInput={ e=>setInputMessage(e.target.value)}
            />
         </Grid>
        <Grid item xs={2} sm={2} md={2} >
        {inputMessage?(<Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitSend}
            onClick={()=>handleSubmit()}
        ><SendIcon color="secondary"/></Button>):(<div/>)}

         <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitUpload}
            onClick={()=>handleAttatchmentUpload()}
          ><AttachmentIcon color="primary"/>
        </Button> 

         </Grid>
         </Grid>
        )
    }
    else{
        return(<div></div>)
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
            firebase.firestore().collection("users").doc(uid).update({
                lastseen: Date.now()
            })
        }
    },[uid]);
    if(personSelected){
        return(
            <div>
            <FriendProfile personSelected={personSelected}/>
            <MessageList personSelected={personSelected} me={me}/>
            <MessageBar personSelected={personSelected} me={me}/>
            </div>
        );
    }
    else
    {
        return(
            <div>Sometimes it only takes a " Hi! " to initiate a connection to people </div>
        )
    }

}