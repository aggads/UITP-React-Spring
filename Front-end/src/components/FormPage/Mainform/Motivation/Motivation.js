import axios from 'axios';
import React from 'react';
import _ from 'lodash'
import { FormGroup, Label, Input } from 'reactstrap';
import URLStorage from '../../../../constants';

export default class DropdownMotivation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motivations: [],
      selected: "",
    }
    //this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    axios.get(`${URLStorage.API_URL}/getallmotivations`)
      .then(res => {
        this.setState({ motivations: res.data });
      })
    var selected = localStorage.getItem("selected");
    this.setState({ selected : selected });
  }

  // componentWillMount(){

  //   var questionStorage = localStorage.getItem("question");
  //   var getData = JSON.parse(localStorage.getItem(`${questionStorage}`))
  //   var selectedCategory = this.props.selectedCategory
  //   var selectedCategoryMotivation = this.props.selectedCategory.motivation

  //   if(!this.props.selectedCategory){
  //     this.props.selectedCategory = getData
  //   }else if(!this.props.selectedCategory.motivation){
  //     this.props.selectedCategory.motivation = "Undefined"
  //   }

  //   console.log("get data ", getData.motivation)
  //   console.log("list name from parent ", this.props.listNameFromParent)
  //   console.log("this.props.selectedCategory ", this.props.selectedCategory)
  //   console.log("this.props.selectedCategory.motivation ", this.props.selectedCategory.motivation)
  // }

  handleOptionSelect(e){
    this.setState({ selected : e.target.value });
    localStorage.setItem("selected", e.target.value);
  }

  handleChange = (e, { value }) => this.setState({ value })

  onClick = (a) =>{
    if(!this.props.selectedCategory.motivation){
      this.props.selectedCategory.motivation = "undefined"
    }
    const questionId = this.props.listNameFromParent
    localStorage.setItem("motivations", a.target.value)
    var motivationStorage = localStorage.getItem("motivations")
    questionId.motivation = motivationStorage
    this.props.passValueToMainForm(questionId)
    
    console.log(this.props.selectedCategory.motivation)
  }

  render() {

    // console.log("hello")
    // console.log(this.props.selectedCategory.motivation)
    // if(typeof(this.props.selectedCategory.motivation) === undefined){
    //   console.log("Motivation null")

    // }
    // var result = JSON.parse(localStorage.getItem("bigItem"))
    // console.log(result)
    // for (var i = 0;i < result.length; i++){
    //   if(!result[i].hasOwnProperty("motivation")){
    //       result[i].motivation = "undefined"
    //   }    
    // }
    // if(!this.props.listNameFromParent.hasOwnProperty("motivation")){
    //   this.props.listNameFromParent.motivation = "undefined"
    // }
    

    return <FormGroup>
      <Label for="exampleSelect">Motivation</Label>
      <Input type="select" name="motivations"
      onClick ={this.onClick.bind(this)}
        onChange={this.onClick.bind(this)} 
        value={this.props.selectedCategory.motivation}
        
      >
        {this.state.motivations.map((motivations, idx) =>
          <option
            key={idx}
            //value={questionId.motivation}
          >
            {motivations.motivation}
          </option>)
        }
      </Input>
    </FormGroup>
  }
}
