import React, { Component } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import './Pdf.css'
import { Link } from "react-router-dom";
//import Reports from '../Reports/Reports';


export default class Pdf extends Component {
  render(){
    return(
      <React.Fragment>
        <div className="report">
          <div className="title">
          <Segment placeholder>
    <Header icon>
      <Icon name='pdf file outline' />
      Here is your report.
    </Header>
    <Button primary>Download document</Button>
  </Segment>
            {/* <h1>Thank you</h1> */}
            {/* <button className="reportBtn pdfBtn" type="submit">Download Pdf</button> */}
          </div>
        </div>
        <Link className="returnBtn" to="/"><a className="textBtn">Return</a></Link>
      </React.Fragment>
      )
  }
}
