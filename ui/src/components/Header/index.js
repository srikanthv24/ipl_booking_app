import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleLogout } from '../../store/actions';
import IPLLogo from '../../assets/ipl.jpg';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "white"
    },
    logo: {
        fontSize: 22,
        color: "Black"
    },
    actions: {
        marginLeft: "auto"
    },
    highlight: {
        fontWeight: "600",
        fontSize: 16
    }
}));

function Header(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user)

    const logoutHandler = () => {
        dispatch(handleLogout())
    }

    useEffect(() => {
        if (userState.logout) {
            props.history.push('/login')
        }
    }, [userState])

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography className={classes.logo} >
                    <img src={IPLLogo} alt='' height={50} />
                </Typography>
                {!userState.loggedin ?
                    <div className={classes.actions}>
                        <Button
                            color="primary"
                            onClick={() => props.history.push('/login')}
                            className={props.location.pathname === '/login' ? classes.highlight : ""}
                        >Login</Button>
                        <Button
                            color="primary"
                            onClick={() => props.history.push('/register')}
                            className={props.location.pathname === '/register' ? classes.highlight : ""}
                        >Register</Button>
                    </div> :
                    <div className={classes.actions}>
                        <Button
                            color="primary"
                            className={props.location.pathname === '/matches' ? classes.highlight : ""}
                            onClick={() => props.history.push('/matches')}
                        >Matches</Button>
                        <Button color="primary" onClick={() => props.history.push('/bookings')}
                            className={props.location.pathname === '/bookings' ? classes.highlight : ""}
                        >Bookings</Button>
                        <Button color="primary" onClick={() => props.history.push('/reminders')}
                            className={props.location.pathname === '/reminders' ? classes.highlight : ""}
                        >Reminders</Button>
                        <Button color="primary" onClick={() => logoutHandler()}>Logout</Button>
                    </div>}
            </Toolbar >
        </AppBar >
    )
}

export default withRouter(Header)