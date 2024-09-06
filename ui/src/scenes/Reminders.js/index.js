import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

import { getReminderList } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: "600px"
    },
    actions: {
        marginTop: '0px'
    },
    buton: {
        marginLeft: "10px"
    },
    plalign: {
        paddingLeft: '10px'
    }
}));

function Reminders(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user)
    const reminderState = useSelector(state => state.reminder)

    const [reminders, setReminders] = useState([])

    useEffect(() => {
        dispatch(getReminderList(userState.user.unique_id))
    }, [])

    useEffect(() => {
        if (!reminderState.loading && reminderState.reminders && reminderState.reminders.length > 0) {
            setReminders(reminderState.reminders)
        }
    }, [reminderState])

    return (
        <div style={{ width: 'calc(100% - 0px)', padding: '32px', marginTop: '-68px' }}>
            <Grid container spacing={2} direction='row'>
                <Grid item xs={12}>
                    <Typography variant="h5">User Reminders</Typography>
                </Grid>
                {!reminderState.loading && reminders.length < 1 && <Grid item xs={12}>
                    <Typography variant="h5">No Reminders Found</Typography>
                </Grid>}
                <Grid item xs={12}>
                    <Grid container spacing={2} direction='row'>
                        {
                            reminders && reminders.length > 0 && reminders.map(reminder => (
                                <Grid item xs={6} key={reminder.unique_id}>
                                    <Card elevation={4} >
                                        <CardContent>
                                            <Grid container direction="row" alignContent="center" spacing={5}>
                                                <Grid item xs={6}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                            <img src={reminder.match_data[0].team_a_img} height="120px"></img>
                                                            <Typography variant='h6'>{`${reminder.match_data[0].team_a.toUpperCase()}`}</Typography>
                                                        </div>
                                                        <Typography variant='h6'>{` vs `}</Typography>
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                            <img src={reminder.match_data[0].team_b_img} height="120px"></img>
                                                            <Typography variant='h6'>{`${reminder.match_data[0].team_b.toUpperCase()}`}</Typography>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: '10px' }}>
                                                        <div style={{ minHeight: "120px" }}>
                                                            <Typography variant='h6'><span style={{ fontWeight: '700' }}> Date:</span> {reminder.match_data[0].date}</Typography>
                                                            <Typography variant='h6'><span style={{ fontWeight: '700' }}> Time:</span> {reminder.match_data[0].time}</Typography>
                                                            <Typography variant='h6'><span style={{ fontWeight: '700' }}> Venue:</span> {reminder.match_data[0].venue.toUpperCase()}</Typography>
                                                        </div>
                                                        <div className={classes.actions}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => props.history.push(`/match/${reminder.match_id}`)}
                                                            >
                                                                Book now
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Reminders