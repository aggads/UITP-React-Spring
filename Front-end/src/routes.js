import React from 'react';
//import { Redirect, Route, Router } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ModeSelection from './components/ModeSelection/ModeSelection';
import FormPage from './components/FormPage/FormPage';
import Reports from './components/Reports/Reports';
import Contact from './components/Contact/Contact';
import Confirmation from './components/Confirmation/Confirmation';
import Pdf from './components/PdfPage/pdf';
import Landing from './components/Landing/Landing';

export const makeMainRoutes = () => {

  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Landing"  component={Landing} />
        <Route
          path="/formpage"
          component={FormPage}
        />
        <Route
          path="/contact"
          component={Contact}
        />
        <Route
          path="/confirmation"
          component={Confirmation}
        /> 
        <Route
          path="/reports"
          component={Reports}
        />
        <Route
          path="/modeselection"
          component={ModeSelection}
        />
        {/* <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        /> */}
        <Route
          path="/pdf"
          component={Pdf}
        />
      </div>
    </Router>
  );
};
