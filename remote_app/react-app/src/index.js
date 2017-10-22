import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import promis from 'redux-promise';

import Login  from './components/login';
import Register from './components/register';

import Dashboard  from './components/reports/dashboard';
import Funnels  from './components/reports/dashboard';
import Flows  from './components/reports/dashboard';
import Segmentation  from './components/reports/dashboard';
import Clustering  from './components/reports/dashboard';

import Profile from './components/account/profile';
import Membership from './components/account/membership';
import Settings from './components/account/settings';
import Help from './components/account/help';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<BrowserRouter>
  		<div>
  			<Route path="/login" component={Login} />
  			<Route path="/register" component={Register} />
  			
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/funnels" component={Funnels} />
        <Route path="/flows" component={Flows} />
        <Route path="/segmentation" component={Segmentation} />
        <Route path="/clustering" component={Clustering} />

        <Route path="/profile" component={Profile} />        
        <Route path="/membership" component={Membership} />        
        <Route path="/settings" component={Settings} />        
        <Route path="/help" component={Help} />        

  		</div>
  	</BrowserRouter>
  </Provider>
  , document.querySelector('.container')
);