/* eslint-disable no-unused-vars */
// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Landing from '../pages/landing/Landing';

// Define your routes
function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
         
          <MainLayout />
        </Route>
        <Route path='/'>
          <Landing />
        </Route>

     
      </Switch>
    </Router>
  );
}

export default AppRouter;
