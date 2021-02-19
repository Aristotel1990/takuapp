import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import NewTable from './NewTable';
import DateCompare from './DateCompare';

ReactDOM.render(
     <StateProvider initialState={initialState} reducer={reducer}>
       <Router>
      <App >
        <Route exact path="/signin" component={Login}/>    
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/feature" component={NewTable}/>
        <Route axact path="/comp" component={DateCompare}/>
      </App>
      </Router>
    </StateProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
