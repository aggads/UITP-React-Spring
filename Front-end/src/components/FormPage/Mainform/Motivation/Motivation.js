import axios from 'axios';
import React from 'react';
import _ from 'lodash'
import { FormGroup, Label, Input } from 'reactstrap';
import URLStorage from '../../../../constants';
import MainForm from '../MainForm'
import { Dropdown, Grid, Segment } from 'semantic-ui-react'
import uniqueid from 'uniqid';

export default class DropdownMotivation extends React.Component {
  state = {
    motivations: [],
  }




  componentDidMount() {

    axios.get(`${URLStorage.API_URL}/getallmotivations`)
      .then(res => {
        this.setState({ motivations: res.data });
        //localStorage.setItem("motivation", JSON.stringify(res.data));
      })
  }

  handleChange = (e, { value }) => this.setState({ value })

  render() {

    const questionId = this.props.listNameFromParent

    return <FormGroup>
      <Label for="exampleSelect">Motivation</Label>
      <Input type="select" name="motivations"
         onClick={(a) => {
          //localStorage.setItem("motivations" + JSON.stringify(questionId.id), JSON.stringify(a.target.value))
          localStorage.setItem("motivations", a.target.value)
          var motivationStorage = localStorage.getItem("motivations")
          questionId.motivation = motivationStorage
          //console.log(motivationStorage)
          
         }
        }
      >
        {this.state.motivations.map((motivations, idx) =>
          
          <option
         
            key={idx}
            value={motivations.motivation}

          >
            {motivations.motivation}
          </option>)
        }
      </Input>
    </FormGroup>
  }
}
