import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Toolbar } from '@material-ui/core';

import Header from '../components/Header';
import Matches from '../scenes/Matches';
import Match from '../scenes/Match';
import Login from '../scenes/Login';
import Register from '../scenes/Register';
import Bookings from '../scenes/Bookings';
import Reminders from '../scenes/Reminders.js';

function Routes() {
    return (
        <div className="root">
            <Router>
                <Header />
                <Toolbar />
                <main className='content'>
                    <Toolbar />
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to={'/login'} />
                        </Route>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/matches' component={Matches} />
                        <Route exact path='/bookings' component={Bookings} />
                        <Route exact path='/reminders' component={Reminders} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/match/:match_id' component={Match} />
                    </Switch>
                </main>
            </Router>
        </div>
    )
}

export default Routes;