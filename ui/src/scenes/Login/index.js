import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
    Avatar,
    Button,
    Container,
    TextField,
    Typography,
    CssBaseline,
    Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { userLogin, clearLoginState } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    page: {
        width: "120%",
        padding: "30px",
        marginLeft: "-40px",
        marginTop: theme.spacing(10),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    content: {
        width: "",
    },
    pointer: {
        cursor: "pointer"
    },
    signintxt: {
        fontSize: '24px',
        color: '#424142',
        fontWeight: '500'
    }
}));

function Login(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(userLogin({
            email: email,
            password: password
        }))
    };

    useEffect(() => {
        if (!loginState.loading && loginState.loggedin) {
            props.history.push('/matches')
        }
    }, [loginState])

    useEffect(() => {
        if (!loginState.loading && loginState.error) {
            setError(loginState.error)
        }
    }, [loginState.error])

    useEffect(() => {
        clearLoginState()
        return () => {
            clearLoginState()
        }
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.page}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4" className={classes.signintxt}>
                        Sign in
                    </Typography>
                    <form onSubmit={onSubmit} className={classes.form} noValidate>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            autoFocus
                            onChange={(event) => setEmail(event.target.value)}
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
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            LogIn
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Typography
                                    color='primary'
                                    variant="body2"
                                    className={classes.pointer}
                                    onClick={() => props.history.push('/register')}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}

export default Login;