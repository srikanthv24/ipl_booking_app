import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

import { getMatchDetails, createBooking, clearMatchState, saveUserPollOpinion, getPollResults, clearPollState } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: "600px"
    },
    actions: {
        marginLeft: "auto",
        marginTop: '20px'
    },
    buton: {
        marginLeft: "10px"
    },
    customBtn: {
        minWidth: '120px',
        background: '#f05922',
        color: '#ffffff',
        marginTop: '10px',
        marginRight: '10px',
    }
}));

function Match(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user)
    const pollState = useSelector(state => state.poll)
    const matchState = useSelector(state => state.match)

    const [match, setMatch] = useState({})
    const [stands, setStands] = useState([
        { stand_name: 'A', selected: [], seats: [] },
        { stand_name: 'B', selected: [], seats: [] },
        { stand_name: 'C', selected: [], seats: [] },
        { stand_name: 'D', selected: [], seats: [] }
    ])
    const [ticketSize, setTicketSize] = useState(0);
    const [pollResult, setPollResult] = useState({});

    useEffect(() => {
        if (props.match && props.match.params && props.match.params.match_id) {
            dispatch(getMatchDetails({
                match_id: props.match.params.match_id,
                user_id: userState.user.unique_id,
            }))
            dispatch(getPollResults(props.match.params.match_id))
        }
    }, [props.match])

    useEffect(() => {
        if (!matchState.loading && matchState.matchData && matchState.matchData.unique_id) {
            setMatch(matchState.matchData)
            setPollResult({
                [matchState.matchData.team_a]: 0,
                [matchState.matchData.team_b]: 0
            })
            if (matchState.matchData.booking_data && matchState.matchData.booking_data.length > 0) {
                let d = stands.map(stand => {
                    let s = JSON.parse(JSON.stringify(matchState.matchData.booking_data)).filter(item => item.stand_name === stand.stand_name)
                    if (s && s.length > 0) {
                        s[0].selected = [];
                        return s[0];
                    } else return stand;
                })
                setStands(d);
            }
        }
        if (!matchState.loading && matchState.ticketsBooked) {
            props.history.push('/bookings')
        }
    }, [matchState])

    useEffect(() => {
        return () => {
            dispatch(clearMatchState())
            dispatch(clearPollState())
        }
    }, [])

    useEffect(() => {
        if (!pollState.loading && pollState.success) {
            dispatch(getPollResults(props.match.params.match_id))
        }
    }, [pollState])

    useEffect(() => {
        if (!pollState.loading && pollState.pollResults && pollState.pollResults.length > 0) {
            JSON.parse(JSON.stringify(pollState.pollResults)).forEach(poll => {
                setPollResult({
                    ...pollResult,
                    [poll._id]: poll.poll_count
                })
            })
        }
    }, [pollState.pollResults])

    const onCreateBooking = () => {
        let info = {
            match_id: props.match.params.match_id,
            user_id: userState.user.unique_id,
            num_of_seats: 0,
            seats: []
        }
        stands.forEach(stand => {
            if (stand.selected && stand.selected.length > 0) {
                info.num_of_seats += stand.selected.length;
                info.seats = [...info.seats, { stand_name: stand.stand_name, seats: stand.selected }]
            }
        })
        dispatch(createBooking(info))
    }

    const pollHandler = (choice) => {
        let obj = {
            match_id: props.match.params.match_id,
            user_id: userState.user.unique_id,
            team_name: choice
        }
        dispatch(saveUserPollOpinion(obj))
    }

    return (
        <div style={{ width: 'calc(100% - 64px)', padding: '32px', marginTop: '-68px' }}>
            <Grid container direction="column" spacing={3}>
                {match && match.unique_id &&
                    <>
                        <Grid item xs={12}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Card elevation={4} className={classes.card}>
                                        <CardContent style={{ paddingBottom: '16px' }}>
                                            <Grid container direction="row" alignContent="center" spacing={1}>
                                                <Grid item >
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                            <img src={match.team_a_img} height="100px"></img>
                                                            <Typography variant='h6' style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>{`${match.team_a.toUpperCase()}`}</Typography>
                                                        </div>
                                                        <Typography variant='h6'>vs</Typography>
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                            <img src={match.team_b_img} height="100px"></img>
                                                            <Typography variant='h6' style={{ fontSize: '18px', fontWeight: '700', marginBottom: '0px' }}>{`${match.team_b.toUpperCase()}`}</Typography>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                        <div style={{ minHeight: "80px" }}>
                                                            <Typography variant='h6'><span style={{ fontWeight: '700' }}> Date:</span> {match.date}</Typography>
                                                            <Typography variant='h6'><span style={{ fontWeight: '700' }}> Time:</span> {match.time}</Typography>
                                                            <Typography variant='h6'><span style={{ fontWeight: '700' }}> Venue:</span> {match.venue}</Typography>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card elevation={4}>
                                        <CardContent>
                                            {match.already_polled || pollState.pollRecorded ?
                                                <>
                                                    <Typography variant="h5" style={{ fontSize: '18px', fontWeight: '500', marginBottom: '15px' }}>What is your favourite team ?</Typography>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Button className={classes.customBtn}>{match.team_a}</Button>
                                                            <Typography variant="h6"><span style={{ fontSize: '18px', fontWeight: '600' }}>{pollResult[match.team_a]}</span> votes</Typography>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Button className={classes.customBtn}>{match.team_b}</Button>
                                                            <Typography variant="h6"><span style={{ fontSize: '18px', fontWeight: '600' }}>{pollResult[match.team_b]}</span> votes</Typography>
                                                        </div>
                                                    </div>
                                                </> :
                                                <>
                                                    <Typography variant="h5" style={{ fontSize: '18px', fontWeight: '500', marginBottom: '15px' }}>What is your favourite team ?</Typography>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                                        <Button onClick={() => pollHandler(match.team_a)} className={classes.customBtn}>{match.team_a} </Button>
                                                        <Button onClick={() => pollHandler(match.team_b)} className={classes.customBtn}>{match.team_b} </Button>
                                                    </div>
                                                </>
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} direction="row">
                                {stands.map(stand => (
                                    <Grid item xs={3}>
                                        <Card elevation={4}>
                                            <CardContent>
                                                <Typography variant='h4' style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>{`STAND ${stand.stand_name}`}</Typography>
                                                <Grid container spacing={2}>
                                                    {
                                                        Array.from(Array(100).keys()).map(seat => (
                                                            <div style={{ width: '10%', marginTop: '5px' }}>
                                                                <Button
                                                                    style={{ minWidth: '28px', margin: '0px 6px', padding: '0px 0px' }}
                                                                    variant={stand.selected.includes(seat + 1) ? "contained" : "outlined"}
                                                                    disabled={stand.seats.includes(seat + 1) ? true : false}
                                                                    onClick={() => {
                                                                        let d = JSON.parse(JSON.stringify(stands)).map(s => {
                                                                            if (s.stand_name === stand.stand_name) {
                                                                                if (s.selected.includes(seat + 1)) {
                                                                                    s.selected = s.selected.filter(se => se !== seat + 1)
                                                                                    setTicketSize(ticketSize - 1)
                                                                                } else {
                                                                                    if (ticketSize < 5) {
                                                                                        s.selected = [...s.selected, seat + 1]
                                                                                        setTicketSize(ticketSize + 1)
                                                                                    }
                                                                                }
                                                                            }
                                                                            return s
                                                                        })
                                                                        setStands(d)
                                                                    }}
                                                                    color={stand.selected.includes(seat + 1) ? 'primary' : ''}
                                                                >{seat + 1}</Button>
                                                            </div>
                                                        ))
                                                    }
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} align="right">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => onCreateBooking()}
                            >
                                Confirm Booking
                            </Button>
                        </Grid>
                    </>
                }
            </Grid>
        </div>
    )
}

export default Match;