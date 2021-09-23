import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';

import { getMatchList, createReminder, getReminderList } from '../../store/actions';

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

function Matches(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user)
    const matchState = useSelector(state => state.match)
    const reminderState = useSelector(state => state.reminder)

    const [matches, setMatches] = useState([])
    const [reminderedMatches, setReminderedMatches] = useState([])
    const [prevReminderMatchId, setPrevReminderMatchId] = useState('')

    useEffect(() => {
        dispatch(getMatchList())
        dispatch(getReminderList(userState.user.unique_id))
    }, [])

    useEffect(() => {
        if (!matchState.loading && matchState.success) {
            setMatches(matchState.matches)
        }
    }, [matchState])

    useEffect(() => {
        if (!reminderState.loading && reminderState.reminderCreated) {
            setReminderedMatches([...reminderedMatches, prevReminderMatchId])
            setPrevReminderMatchId('');
        }
        if (!reminderState.loading && !reminderState.reminderCreated && reminderState.reminders && reminderState.reminders.length > 0) {
            let data = JSON.parse(JSON.stringify(reminderState.reminders)).map(match => match.match_id)
            setReminderedMatches(data)
        }
    }, [reminderState])

    const handleReminderLater = (matchId) => {
        setPrevReminderMatchId(matchId)
        dispatch(createReminder({
            match_id: matchId,
            user_id: userState.user.unique_id,
        }))
    }

    return (
        <div style={{ width: 'calc(100% - 64px)', padding: '32px', marginTop: '-68px' }}>
            <Grid container spacing={2} direction='row' alignItems="center">
                {!matchState.loading && matches.length < 1 && <Grid item xs={12}>
                    <Typography variant='h6'>No Matches Found</Typography>
                </Grid>}
                {matches && matches.length > 0 && matches.map((match) => (
                    <Grid item xs={6} key={match.unique_id}>
                        <Card elevation={4} className={classes.card}>
                            <CardContent >
                                <Grid container direction="row" alignContent="center" spacing={5}>
                                    <Grid item xs={6}>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <img src={match.team_a_img} height="120px"></img>
                                                <Typography variant='h6'>{`${match.team_a.toUpperCase()}`}</Typography>
                                            </div>
                                            <Typography variant='h6'>{` vs `}</Typography>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <img src={match.team_b_img} height="120px"></img>
                                                <Typography variant='h6'>{`${match.team_b.toUpperCase()}`}</Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: '10px' }}>
                                            <div style={{ minHeight: "120px" }}>
                                                <Typography variant='h6'><span style={{ fontWeight: '700' }}> Date:</span> {match.date}</Typography>
                                                <Typography variant='h6'><span style={{ fontWeight: '700' }}> Time:</span> {match.time}</Typography>
                                                <Typography variant='h6'><span style={{ fontWeight: '700' }}> Venue:</span> {match.venue.toUpperCase()}</Typography>
                                            </div>
                                            <div className={classes.actions}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => props.history.push(`/match/${match.unique_id}`)}
                                                >
                                                    Book now
                                                </Button>
                                                {!reminderedMatches.includes(match.unique_id) && <Button
                                                    variant="contained"
                                                    className={classes.buton}
                                                    onClick={() => handleReminderLater(match.unique_id)}
                                                >
                                                    Remind Later
                                                </Button>}
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
        </div>
    )
}

export default Matches;