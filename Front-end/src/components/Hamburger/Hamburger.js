
import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react'
import './Hamburger.css'
import {Link} from "react-router-dom";

const Hamburger = () => (
  <div>
  <Dropdown trigger={<span><Icon name='bars'/></span>}>
    <Dropdown.Menu>
      <Dropdown.Item><Link className="nav-link" to="/">Home</Link></Dropdown.Item>
      <Dropdown.Item><Link className="nav-link" to="/modeselection">Form</Link></Dropdown.Item>
      <Dropdown.Item><Link className="nav-link" to="/contact">Contact</Link></Dropdown.Item>
      <Dropdown.Item><Link className="nav-link" to="/reports">Reports</Link></Dropdown.Item>
      <Dropdown.Item><a href="https://www.uitp.org/" className="linkU">Sign out</a></Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  </div>
)

export default Hamburger