import React, { Component } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import Confirmation from '../Confirmation/Confirmation'
import ReactPDF from '@react-pdf/renderer';
import { renderToString } from "react-dom/server";
// import PrintButton from './PrintButton'
// import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
// import Pdf from "react-to-pdf";
// import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import './Pdf.css'
import { Link } from "react-router-dom";
//import Reports from '../Reports/Reports';


const print = () =>{
  const string = renderToString(<Confirmation />)
  const pdf = new jsPDF("p", "mm", "a4")
  pdf.fromHTML(string)
  pdf.save("pdf")
}

export default class Pdf extends Component {
  
//   exportPDFWithComponent = () => {
//     this.pdfExportComponent.save();
// }

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
    
    <Button primary onClick={print}>Print Report</Button>
    {/* ReactPDF.render(<Confirmation />, `${__dirname}/example.pdf`) */}
    
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
