import React , { useReducer , createContext, useState} from 'react';
import clsx from 'clsx';
import {Grid,AppBar,Toolbar,IconButton,Typography,Hidden, Box ,Drawer} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import FriendList from './FriendListComponent';
import Message from './MessageComponent';
import { makeStyles  , useTheme} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ProfileComponent from './ProfileComponent';
const drawerWidth = '55vh';
const useStyles = makeStyles((theme) => ({
    root: {
        //height: '100vh',
        display: 'flex',
      },
    imageFriendList: {
        background: 'linear-gradient(45deg, #1de9b6 30%, #4dd0e1 90%)',
        //background: 'linear-gradient(45deg, #c471ed 30%, #f64f59 90%)',
        // use this below in profile section
        // background: 'linear-gradient(45deg, #3c1053 30%,#fdbb2d 110%)',
        // background: 'linear-gradient(45deg, #0cebeb 30%, #29ffc6 90%)',
        height: '100vh',
        backgroundPosition: 'center',
        width:'auto',
        padding: theme.spacing(2),
      },
      imageMessage: {
        background: 'linear-gradient(-45deg, #FDC830 30%,#f05053 120%)',
        //background: 'linear-gradient(-45deg, #c471ed 30%, #f64f59 90%)',
        // background: 'linear-gradient(45deg,#9796f0 30% ,#fbc7d4 90%)',
        backgroundPosition: 'center',
        width:'auto',
        height: '100vh',
        padding: theme.spacing(2),
      },


      appBar: {
        background: 'linear-gradient(-45deg, #c471ed 30%, #f64f59 90%)',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
}));

export const AppContext = createContext();

const initialState = {
  personSelected: ''
};
function reducer(state, action) {
  switch (action.type) {
      case 'CHANGE_PERSON':
          return {
            personSelected: action.data
          };

      default:
          return initialState;
  }
}

export default function Home(){
    const [state, dispatch] = useReducer(reducer, initialState);
    const {personSelected}=state;
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const handleDrawerToggle=()=>{
     
    }
    const handleDrawerClose=()=>{
      setOpen(false);
    }
    const handleDrawerOpen=()=>{
      setOpen(true);
    }
    return(
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <AppContext.Provider value={{ state, dispatch }}>
      <Hidden smUp>
      {/* <div className={classes.root}>Mobile Site is under Construction</div> */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Blabber
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <ProfileComponent/>
        <FriendList/>
      </Drawer>
      <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
      <Grid item xs={12} sm={8} md={9} className={classes.imageMessage} component={Paper} elevation={8} square>
      <Message personSelected={personSelected}/>
      </Grid>
      </main>
      </Hidden>

      <Hidden xsDown>
      <Grid item xs={12} sm={4} md={3} className={classes.imageFriendList} component={Paper} elevation={8} square>
      <ProfileComponent/>
      <FriendList/>
      </Grid>
      <Grid item xs={12} sm={8} md={9} className={classes.imageMessage} component={Paper} elevation={8} square>
      <Message personSelected={personSelected}/>
      </Grid>
      </Hidden>
      </AppContext.Provider>
      </Grid>
    );
}