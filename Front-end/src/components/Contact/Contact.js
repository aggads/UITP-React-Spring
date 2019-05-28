/* eslint-disable no-sequences */
import React, {Component} from 'react';  
import './Contact.css'
import Mailto from 'react-protected-mailto'
import Navbar from '../NavBar/Navbar';

  export default class Contact extends Component {

    render() {
    return (
      <div className="contact">
      <Navbar />
        <h1 className="title">Contact</h1>
        <br/>
        <h3 className="subtitle"> GENERAL-CONTACT</h3>
        <div className="contactInfo">
          <p>
            Phone:  
            <Mailto tel='+32-2-673 61 00' className="item tel"/><br />
            <br />
            Fax:
            <Mailto tel='+32-2-660 10 720' className="item fax"/><br />
            <br />
            Email: 
            <Mailto
            className="item mail"
            email='info@uitp.org'
            headers={
              {subject:'General contact'},
              {cc: 'exemple@exemple.com'}
              
            }/>  
          </p>
        </div>
      </div>
    );
  }

  }