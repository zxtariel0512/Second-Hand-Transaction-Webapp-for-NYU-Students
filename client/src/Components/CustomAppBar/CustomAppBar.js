import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Theme from '../../Theme/theme.js';
import { useHistory } from 'react-router';
import LogoutBtn from '../../Assets/img/icons/logout.svg';
import ProfileBtn from '../../Assets/img/icons/user.svg';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: Theme.colors.blue
    },
    menuButton: {
        position: 'absolute',
        right: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
        // justifyContent: 'flex-end'
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        
    }
}));

export default function MenuAppBar() {
    const classes = useStyles();
    // TODO: call Auth.currenusersession to see if user is logged in in Auth Context
    const [auth, setAuth] = React.useState(true);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    const history = useHistory();


    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar>
                    {auth && (
                        <>
                            

                                

                                <div className={classes.menuButton}>
                                    <IconButton
                                        href="/login"
                                        onClick={() => { setAuth(false); }}
                                    >
                                        <img src={LogoutBtn} width="20" height="20" alt="Logout" />
                                    </IconButton>
                                    <IconButton
                                        href="/me"
                                    >
                                        <img src={ProfileBtn} width="20" height="20" alt="Profile" />
                                    </IconButton>
                                </div>
                                {/* <span>Hi, Martin</span> */}

                            
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
