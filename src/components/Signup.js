import React ,{  Component }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Fire from "../Fire";

const styles = (theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight:'90vh',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
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
    background: 'linear-gradient(45deg, #c471ed 30%, #f64f59 90%)',
    // background: 'linear-gradient(45deg, #FDC830 30%,#f05053 120%)',
    backgroundPosition: 'center',
  },
});

class Signup extends Component{
  constructor(props){
    super(props);
    this.state={
      user:{},
      error:''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  // const [displayName, setDisplayName] = useState('');
  // const [password, setPassword] = useState('');
  handleSubmit=(e)=>{
    e.preventDefault();
    console.log(this.state);
    Fire.shared.createUser(this.state.user)
    .catch(error=>this.setState({error:error.message}))
  }

  render(){
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={3} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {`Hello There ,\n Register Yourself Here`}
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="Full Name"
              name="displayName"
              autoComplete="name"
              autoFocus
              value={this.state.user.displayName}
              onInput={ e=>{this.setState({user:{...this.state.user,displayName:e.target.value}})}}
            />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={this.state.user.email}
              onInput={ e=>{this.setState({user:{...this.state.user,email:e.target.value}})}}
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
              value={this.state.user.password}
              onInput={ e=>{this.setState({user:{...this.state.user,password:e.target.value}})}}
            />
            <Typography component="h5" variant="h6" color="error">
            {this.state.error ? this.state.error : ''}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
             Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/" activeClassName="current">
                  {"Already have an account!  SignIn here"}
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
  
}
export default withStyles(styles, { withTheme: true })(Signup);