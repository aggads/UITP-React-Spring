import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Navbar from '../NavBar/Navbar';
import Landing from '../Landing/Landing';

class Home extends Component {
  render() {
    return (
      <div className="container">
          <div>
            <div>
                <Landing />

            </div>
          </div>
      </div>
    );
  }
}

export default Home;
