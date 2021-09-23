import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
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

import { userRegister, clearRegisterState } from '../../store/actions';

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
    }
}));

function Register(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const registerState = useSelector(state => state.user)

    const [userForm, setUserForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile_number: "",
        password: ""
    });

    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(userRegister(userForm))
    };

    useEffect(() => {
        if (registerState.registered) {
            setRegistered(true);
        }
        if (!registerState.loading && !registerState.registered && registerState.error) {
            setError(registerState.error)
        }
    }, [registerState])

    useEffect(() => {
        return () => {
            dispatch(clearRegisterState())
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
                    {!registered ? <>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <form onSubmit={onSubmit} className={classes.form} noValidate>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="firastname"
                                label="First Name"
                                name="firstname"
                                value={userForm.firstname}
                                autoFocus
                                onChange={(event) => setUserForm({ ...userForm, [event.target.name]: event.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                value={userForm.lastname}
                                onChange={(event) => setUserForm({ ...userForm, [event.target.name]: event.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={userForm.email}
                                onChange={(event) => setUserForm({ ...userForm, [event.target.name]: event.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="mobile"
                                label="Mobile Number"
                                name="mobile_number"
                                value={userForm.mobile_number}
                                onChange={(event) => setUserForm({ ...userForm, [event.target.name]: event.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={userForm.password}
                                onChange={(event) => setUserForm({ ...userForm, [event.target.name]: event.target.value })}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Register
                            </Button>
                        </form> </> :
                        <>
                            <Typography>Successfully Registered. Try to login now.</Typography>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => props.history.push('/login')}
                            >
                                Login
                            </Button>
                        </>}
                </div>
            </Paper>
        </Container>
    );
}

export default Register;