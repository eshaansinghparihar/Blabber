import React ,{ useState,useEffect ,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, Grid ,TextField,ListItem,Divider, CardContent, Container, IconButton , Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ForumIcon from '@material-ui/icons/Forum';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase';
const useStyles = makeStyles((theme) => ({
    root: {
    height: '100vh',
    },
    image: {
    background: 'linear-gradient(45deg, #3c1053 30%,#fdbb2d 110%)',
    backgroundPosition: 'center',
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
    backcol:{
        display:'flex'
    },
    back:{
        float:'left',
        marginTop:theme.spacing(1),
        marginLeft:theme.spacing(1)
    },
    paper: {
        margin: theme.spacing(1),
        display: 'flex',
        // minHeight:'90vh',
        flexDirection: 'column',
        alignItems: 'center',
    }, 
    avatar: {
        marginTop: theme.spacing(1),
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        marginBottom:theme.spacing(1),
    },
    submitUpload:{
        background: 'linear-gradient(45deg, #ffdde1 30%, #C9D6FF 90%)',
        borderRadius: 20,
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        width:'80%',
    },
    submitSend:{
        background: 'linear-gradient(45deg, #ffdde1 30%,#ee9ca7 110%)',
        borderRadius: 20,
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        width:'80%',
        marginBottom:'5px'
    },
    submit:{
        background: 'linear-gradient(45deg, #b92b27 30%, #1565C0 90%)',
        borderRadius: 20,
        margin:theme.spacing(1),
        marginLeft:'auto',
        marginRight:'auto',
        width:'100%',
        color:'white',
        marginBottom:'5px'
    },
}));

export default function Notification() {
    const classes = useStyles();
    const uid=(firebase.auth().currentUser||{}).uid;
    const [displayName, setDisplayName]=useState('');
    const [displayImage, setDisplayImage]=useState('');
    const [messages, setMessages]=useState([]);
    var relevantMssgs=[];
    useEffect(()=>{
        if(uid){
        firebase.firestore().collection("users").doc(uid)
        .onSnapshot(function(doc) {
            if(doc.exists){
                setDisplayName(doc.data().displayName);
                setDisplayImage(doc.data().displayImage);
                setMessages(doc.data().messages);
              }
        });
    }
    },[uid])
    if(messages && uid ){
        relevantMssgs= messages.filter(mssg=>(mssg.receiverID===uid))
    }
    if(relevantMssgs.length!==0){

        const notificationCard=relevantMssgs.map((mssg)=>{
            return(
                <Paper container="true" 
                onClick={()=>{
                  firebase.firestore().collection("users").doc(uid).update({
                    lastseen: Date.now()
                  });
                }}
                >
                <ListItem button>
                <Grid component="main" container>
                <Grid item sm={4} md={3}>
                <Avatar className={classes.avatar} src="https://placeimg.com/140/140/any"/>
                </Grid>
                <Grid item sm={8} md={9}>
                {mssg.message && <Typography component="subtitle1" variant="h6" className={classes.name}>{ mssg.senderName } says " {mssg.message} "</Typography>}
                <br/>
                {mssg.mediaMssg && <Typography component="subtitle1" variant="h6" className={classes.name}>{ mssg.senderName } sent you an Image</Typography>}
                </Grid>
                </Grid>
                </ListItem>
                <Divider/>
                </Paper>
                
          );
        }).reverse()
    
        return(
            <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={2} md={3} className={classes.image} />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <div className={classes.backcol}>
            <Link to="/" activeClassName="current">
            <IconButton
            className={classes.back}
            >
            <KeyboardBackspaceIcon/>
            </IconButton>
            </Link>
            </div>
            {notificationCard}
            </Grid>
            <Grid item xs={false} sm={2} md={3} className={classes.image} />
            </Grid>
        )
    }
    else{
        return(
            <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={2} md={3} className={classes.image} />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <div className={classes.backcol}>
            <Link to="/" activeClassName="current">
            <IconButton
            className={classes.back}
            >
            <KeyboardBackspaceIcon/>
            </IconButton>
            </Link>
            </div>
            <div className={classes.container}>
            <Container component="main">
            <CssBaseline />
            <Paper item  spacing={2} elevation={8}>
            <div  className={classes.nodata}>
            <CardContent>
            <Avatar className={classes.avatarmssg}>
                <ForumIcon />
            </Avatar>
            <Typography component="h3" variant="subtitle1">Sometimes it only take a "Hi !" to initiate a conversation.</Typography>
            <Typography component="h3" variant="subtitle1">Did you know? : Blabber is an installable Web App , Click on "Add to Home Screen" to install the app on your device.</Typography>
            </CardContent>
            </div>
            </Paper>
            </Container>
            </div>
            </Grid>
            <Grid item xs={false} sm={2} md={3} className={classes.image} />
            </Grid>
        )
    }
}