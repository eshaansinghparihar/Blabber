import React ,{ useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
  paper: {
    margin: theme.spacing(2),
    display: 'flex',
    minHeight:'90vh',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // width: '100vh'
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image: {
    background: 'linear-gradient(45deg, #1de9b6 30%, #4dd0e1 90%)',
    backgroundPosition: 'center',
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email,password)
    .catch(error=> {setError(error.message)})
  }
  return (

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={2} md={3} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Hello Again , Welcome Back 
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onInput={ e=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onInput={ e=>setPassword(e.target.value)}
          />
          <Typography component="h5" variant="h6" color="error">
          {error ? error : ''}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Sign in
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" activeClassName="current">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Grid>
      <Grid item xs={false} sm={2} md={3} className={classes.image} />
    </Grid>
  );
}