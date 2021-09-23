import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as html2Canvas from 'html2canvas';

import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

import { getUserBookingList } from '../../store/actions';

import IPLLogo from '../../assets/ipl.jpg';

function Bookings(props) {
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user)
    const bookingState = useSelector(state => state.booking)

    const [bookings, setBookings] = useState([])

    useEffect(() => {
        if (userState.user && userState.user.unique_id) {
            dispatch(getUserBookingList(userState.user.unique_id))
        }
    }, [userState.user])

    useEffect(() => {
        if (!bookingState.loading && bookingState.bookings) {
            setBookings(bookingState.bookings)
        }
    }, [bookingState])

    const onGetReciept = (id) => {
        const canvasElement = document.getElementById(id);
        html2Canvas(canvasElement).then(function (event) {
            var link = document.createElement('a');
            link.download = `ipl_${id}.png`;
            link.href = event.toDataURL()
            link.click();
        })
    }

    return (
        <div style={{ width: 'calc(100% - 0px)', padding: '32px', marginTop: '-68px' }}>
            <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">User Bookings</Typography>
                </Grid>
                {!bookingState.loading && bookings.length < 1 && <Grid item xs={12}>
                    <Typography variant="h5">No Bookings Found</Typography>
                </Grid>}
                <Grid item xs={12}>
                    <Grid container spacing={2} direction='row'>
                        {
                            bookings && bookings.length > 0 && bookings.map(booking => (
                                <Grid item xs={10} key={booking.unique_id} id={booking.unique_id}>
                                    <Card elevation={4}>
                                        <CardContent>
                                            <Grid container spacing={2} direction='row'>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2} direction='row'>
                                                        <Grid item xs={4}>
                                                            <Typography variant='h6'><span style={{ fontWeight: '700', color: '#f05922' }}>Booking Id:</span> {booking.unique_id}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4} align="center">
                                                            <Typography variant='h6'><span style={{ fontWeight: '700', color: '#f05922' }}>Match Id:</span> {booking.match_id}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4} align="right">
                                                            <Typography variant='h6'><span style={{ fontWeight: '700', color: '#f05922' }}>Seats #:</span> {booking.num_of_seats}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2} direction='row' style={{ margin: '20px 0px ' }}>
                                                        <Grid item xs={2}></Grid>
                                                        <Grid item xs={8}>
                                                            <Grid container spacing={2} direction='row'>
                                                                <Grid item xs={4}>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <img src={booking.match_data[0].team_a_img} height="140px"></img>
                                                                        <Typography variant='h6'>{`${booking.match_data[0].team_a.toUpperCase()}`}</Typography>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={4} align="center">
                                                                    <Typography variant='h6'><span style={{ fontWeight: '700', position: 'relative', bottom: '-25px' }}>VS</span></Typography>
                                                                    <img src={IPLLogo} height="140px"></img>
                                                                </Grid>
                                                                <Grid item xs={4} align="right">
                                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <img src={booking.match_data[0].team_b_img} height="140px"></img>
                                                                        <Typography variant='h6'>{`${booking.match_data[0].team_b.toUpperCase()}`}</Typography>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={2}></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2} direction='row'>
                                                        <Grid item xs={12}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Typography variant='h6'><span style={{ fontWeight: '700', color: '#f05922', marginRight: '10px' }}>Ticket Details:</span></Typography>
                                                                {
                                                                    booking.seats && booking.seats.length > 0 && booking.seats.map(seat => (
                                                                        <div style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', border: '1px solid #d3d3d3', marginRight: '5px', padding: '4px 12px', borderRadius: '4px' }}>
                                                                            <Typography variant='h6' style={{ fontSize: '16px', fontWeight: '400', marginRight: '10px' }}><span style={{ fontSize: '16px', fontWeight: '400' }}>Block Name: </span><span style={{ fontWeight: '700' }}>{seat.stand_name}</span></Typography>
                                                                            <Typography variant='h6' style={{ fontSize: '16px', fontWeight: '400', marginBottom: '0px' }}><span style={{ fontSize: '16px', fontWeight: '400' }}>Ticket Nos: </span><span style={{ fontWeight: '700' }}>{seat.seats.join(',')}</span></Typography>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center', paddingTop: '10px' }}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={(event) => onGetReciept(booking.unique_id)}
                                                                >
                                                                    Get Reciept
                                                                </Button>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
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

export default Bookings