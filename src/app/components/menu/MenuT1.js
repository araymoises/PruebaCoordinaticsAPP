import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
  
const drawerWidth = 240;


export default function Menu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
      setOpen(false);
  };

  return (
      <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
            >
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                })}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                Coordinatics
                </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                }),
            }}
            >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                [
                    {
                    'text': 'Ingresar Transacción', 
                    'url': '/new',
                    'icon': <AddBoxIcon />
                    },
                    {
                    'text': 'Listar Transacciones', 
                    'url': '/list',
                    'icon': <AssignmentIcon />
                    },
                    {
                    'text': 'Estadísticas', 
                    'url': '/statistics',
                    'icon': <EqualizerIcon />
                    },
                ].map((obj, index) => (
                  <Link to={obj.url}>
                    <ListItem button key={index}>
                      <ListItemIcon>{obj.icon}</ListItemIcon>
                      <ListItemText primary={obj.text} />
                    </ListItem>
                  </Link>
                ))
                }
            </List>
          </Drawer>
          
      </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
  },
  appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      }),
  },
  appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      }),
  },
  menuButton: {
      marginRight: 36,
  },
  hide: {
      display: 'none',
  },
  drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
  },
  drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      }),
  },
  drawerClose: {
      transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
      },
  },
  toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
  },
  content: {
      flexGrow: 1,
      padding: theme.spacing(3),
  },
}));