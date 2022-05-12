import React from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import { useNavigate, useLocation } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})
const Layout =({children})=> {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { 
          text: 'Hot Complaints', 
          icon: <SubjectOutlined color="secondary" />, 
          path: '/' 
        },
        { 
          text: 'Make a Complaint', 
          icon: <AddCircleOutlineOutlined color="secondary" />, 
          path: '/create' 
        },
      ];

    return(
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                <div>
                <Typography variant="h5" className={classes.title}>
                    BadMouth
                </Typography>
                </div>

                {/* links/list section */}
                <List>
                {menuItems.map((item) => (
                    <ListItem 
                    button 
                    key={item.text} 
                    onClick={() => navigate(item.path)}
                    className={location.pathname === item.path ? classes.active : null}
                    >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                </List>
                
            </Drawer>
            <div>
            {children}
            </div>
        </div>
    )
}

export default Layout