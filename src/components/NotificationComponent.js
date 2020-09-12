import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
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
export default function NotifificationComponent(){
    const classes = useStyles();

    return(
        <Link to="/notification" style={{ textDecoration: 'none' }}>
        <Grid className={classes.profileBottom}>
        <Paper elevation={3} >
        <Grid component="main" container>
        <Grid item sm={4} md={3}>
        <Avatar className={classes.avatar}>< NotificationsActiveIcon/></Avatar>
        </Grid>
        <Grid item sm={8} md={9}>
        <Typography component="h6" variant="h6" className={classes.name}>
            What's new ?
        </Typography>
        </Grid>
        </Grid>
        </Paper>
        </Grid>
        </Link>
    );
}