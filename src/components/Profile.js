import React ,{ useState,useEffect ,Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { IconButton, Button} from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import Typography from '@material-ui/core/Typography';
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
        fontSize:'30px',
        width:'30vh',
        height:'30vh'
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

export default function Profile() {
    const classes = useStyles();
    const uid=(firebase.auth().currentUser||{}).uid
    const [displayName, setDisplayName]=useState('');
    const [displayImage, setDisplayImage]=useState('');
    function handleSignOut(){
        firebase.auth().signOut();
    }
    const handleProfilePicUpload=(e)=>{
        let localUrl=e.target.files[0]
        const uploadTask = firebase.storage().ref(`/avatar/${localUrl.name}`).put(localUrl)
        
        uploadTask.on('state_changed', 
        (snapShot) => {
         
        }, (err) => {
          
          alert(err.message)
        }, () => {
          
          firebase.storage().ref('avatar').child(localUrl.name).getDownloadURL()
           .then(fireBaseUrl => {
            firebase.firestore().collection("users").doc(uid).update({
                displayImage: fireBaseUrl,
                lastseen:Date.now()
            })
            .catch(error=> alert(error.message));
           })
    })
    }  
    const deleteProfilePic=()=>{
        firebase.firestore().collection("users").doc(uid).update({
            displayImage: '',
            lastseen:Date.now()
        })
        .catch(error=> alert(error.message));
    };
    useEffect(()=>{
        if(uid){
        firebase.firestore().collection("users").doc(uid)
        .onSnapshot(function(doc) {
            if(doc.exists){
                setDisplayName(doc.data().displayName);
                setDisplayImage(doc.data().displayImage);
              }
        });
    }
    },[uid])
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
        <div className={classes.paper}>
        <Avatar className={classes.avatar} >
        {displayImage ? <img className={classes.media} src={displayImage} alt="Loading..."/> : <img className={classes.media} src=""/>}
        </Avatar>
        {displayName && <Typography variant="h6" ><h4>Hello , {displayName} . Hope you're day is going great!</h4></Typography>}
        <Fragment>
        <input
        type="file"
        id="raised-button-file"
        accept="image/*"
        style={{ display:"none" ,marginLeft:"auto",marginRight:"auto", }}
        onChange={e=>{  handleProfilePicUpload(e) }}
        />
        <label htmlFor="raised-button-file">
        <IconButton
        type="submit"
        fullWidth
        containerElement='label'
        variant="contained"
        component="span"
        className={classes.submitSend}
        >
        <PublishIcon color="primary"/>
        </IconButton>
        </label>
        </Fragment>
        {displayImage && <Fragment>
        <label>
        <IconButton
        type="submit"
        fullWidth
        containerElement='label'
        variant="contained"
        component="span"
        className={classes.submitUpload}
        onClick={()=>deleteProfilePic()}
        >
        <DeleteIcon color="primary"/>
        </IconButton>
        </label>
        </Fragment>}
        <Button
            type="submit"
            className={classes.submit}
            onClick={handleSignOut}
          >
           Log Out
        </Button>
        </div>
        </Grid>
        <Grid item xs={false} sm={2} md={3} className={classes.image} />
        </Grid>
    )
}