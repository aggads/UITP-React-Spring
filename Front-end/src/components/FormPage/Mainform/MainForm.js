import Frequency from './Frequency/Radio';
import Comments from './Comment/Comment';
import Categories from './Categories/Categories'
import URLStorage from '../../../constants';
import { Link } from 'react-router-dom';
import '../../../App.css';
import axios from 'axios';
import React from 'react';
import ErrorBoundary from '../Mainform/ErrorBoundary'
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

import './MainForm.css'
import DropdownMotivation from './Motivation/Motivation';

export default class MainForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: [],
            id: 1,
            allData: [],
            answers: [],
            result: [],
            value: [],
            selectedCat: 1,
            selectedMode: 0,
            dataGet: [],
            incidentName: "",
            frequencyFromChild: 0,
            comment: "",
            motivationFromChild: null,
        }
        // this.handleChange = this.handleChange.bind(this)
    }

    getAllStorage() {
        var archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;

        for (; key = keys[i]; i++) {
            archive.push(key + '=' + localStorage.getItem(key));
        }
        return console.log(archive);
    }

    async handleClick(question) {
        if (this.state.allData.length) {
            var getQuestion = this.state.allData.find(function (data, id) {
                console.log("get question ", getQuestion)
                if (data.id === question.id) {
                    return data
                } else {
                    return false
                }
            })
            if (getQuestion) {
                var indexOf = this.state.allData.indexOf(getQuestion);
                console.log("index of ", indexOf)
                for (var key in getQuestion) {
                    if (getQuestion[key] === question[key] || getQuestion[key] === undefined) {
                        getQuestion[key] = question[key]
                        await this.state.allData.splice(indexOf, 1, question)
                        localStorage.setItem("bigItem", JSON.stringify(this.state.allData))
                    }
                }
            }else {
                await this.setState({ allData: [this.state.allData, question] })
                localStorage.setItem("bigItem", JSON.stringify(this.state.allData))

            }
        }else {
            await this.setState({ allData: [question] })
            localStorage.setItem("bigItem", JSON.stringify(this.state.allData))
        }
        await localStorage.setItem("bigItem", JSON.stringify(this.state.allData))
    }

    handleSelection = (idx) => (e) => {
        this.setState({ selectedMode: idx })
    }

    next = () => {
        let id = this.state.id + 1;
        this.fetchQuestions(id);
        this.setState(prevState => ({
            selectedCat: prevState.selectedCat + 1,
            id: prevState.id + 1,
        }));
    }
    prev = () => {
        let id = this.state.id - 1;
        this.fetchQuestions(id);
        this.setState(prevState => ({
            selectedCat: prevState.selectedCat - 1,
            id: prevState.id - 1,
        }));
    }

    fetchQuestions = (id) => {
        axios.get(`${URLStorage.API_URL}/getAllQuestions/${id}`)
            .then(res => {
                const data = res.data
                this.setState({
                    question: data,
                    isLoaded: true,
                })
            })
    }
    anyChange = (id) => (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        let entries = Object.assign({}, this.state);
        const { answers } = entries;
        answers.map(answer => answer.questionID === id ? answer[inputName] = inputValue : undefined);
        this.setState(entries);
        localStorage.setItem(this.props.id, JSON.stringify(this.state.answers));

        // ------------ SWITCH BOOLEAN TO COMPLETED FOR CURRENT MODE ---------------

        if (this.state.allData.filter(answer => answer.frequency === null).length === 0) {

            let completeMode = JSON.parse(localStorage.getItem("completedModes"));
            completeMode[this.props.index] = true;

            if (this.props.group) {
                var dummieArray = [];
                completeMode.map(item => dummieArray.push(true));
                localStorage.setItem("completedModes", JSON.stringify(dummieArray));

            } else {
                localStorage.setItem("completedModes", JSON.stringify(completeMode));
            }
        }
    }

    selectCat = (e) => {
        this.setState({ selectedCat: e.target.value })
        localStorage.setItem(this.props.id, JSON.stringify(this.state.answers));
    }
    frequencyCallback = (regularityCall) => {
        this.setState({
            regularityFromChild: regularityCall
        })
        //console.log("regularity call ", regularityCall)
    }
    componentDidMount() {
        var bigItem = JSON.parse(localStorage.getItem("bigItem"))
        this.fetchQuestions(1);
        const transportId = this.props.id;
        var selected = localStorage.getItem("selected");
        this.setState({ modeID: transportId, selected : selected })
        if (this.state.allData.filter(answer => answer.frequency === null).length === 0) {
            let completeMode = JSON.parse(localStorage.getItem("completedModes"));
            completeMode[this.props.index] = true;
            if (this.props.group) {
                var dummieArray = [];
                completeMode.map(item => dummieArray.push(true));
                localStorage.setItem("completedModes", JSON.stringify(dummieArray));
            } else {
                localStorage.setItem("completedModes", JSON.stringify(completeMode));
            }
        }
    }

    getFrequency = (frequencyCallbackFromChild) => {
        // console.log('From getFrequency in MainForm:')
        // console.log(frequencyCallbackFromChild)
        this.setState({
            frequencyFromChild: frequencyCallbackFromChild
        })
    }

    getMotivation = (motivationCallbackFromChild) => {
        // console.log('From getMotivation in MainForm:')
        // console.log(motivationCallbackFromChild)
        this.setState({
            motivationFromChild: motivationCallbackFromChild
        })
    }
    // handleOptionSelect(e){
    //     this.setState({ selected : e.target.value });
    //     localStorage.setItem("selected", e.target.value);
    //   }

    componentWillMount(){
        var bigItem = JSON.parse(localStorage.getItem("bigItem"))
        var questionStorage = localStorage.getItem("question");
        var getData = JSON.parse(localStorage.getItem(`${questionStorage}`))
        var selectedMode = JSON.parse(localStorage.getItem("selectedModes"))
        var selectedModeName = [];
        for (var i in selectedMode) {
            selectedModeName.push(selectedMode[i].name)
        }
        if (bigItem) {
            bigItem.selectedMode = selectedModeName
        }
        else {
            bigItem = []
        }
        // if(this.state.allData.length === 0 || this.state.allData.length < 60){
        //     this.state.allData.indexOf(questionParent) === -1 ? this.state.allData.push(questionParent) : console.log("This item already exists");
        // }
        // this.setState({ allData: bigItem })

        //------------------ FIX NEEDED -----------------
        // Multiple localStorage and state update with setState: allData
        this.setState({ 
            allData: bigItem, 
            dataGet: getData, 
        })
        
    }
        render() {
            // NEXT / SUBMIT BUTTON SWITCH
            // console.log("THE STATE ", this.state.allData)
            const nextSubmit = this.state.selectedCat === 5 ?
                // || (parseInt((localStorage.getItem("group")) === 1)
                (JSON.parse(localStorage.getItem("completedModes")).filter(item => item === false).length === 0) ?
                    <Link to={{ 
                        pathname: "/confirmation", 
                        state: { answers: this.state.allData } }}>
                        <Button onClick={this.submit} className="submit" >Submit</Button>
                    </Link>
                    : <>
                        <Button className="submit" disabled>Submit</Button>
                    </>
                :
                <Button onClick={this.next} className="submit">Next</Button>
            return (
                <React.Fragment>
                    <Container>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            {this.state.selectedCat !== 1 && <Button style={{ marginRight: "10px" }} onClick={this.prev} className="submit" >Previous</Button>}
                            {nextSubmit}
                        </div>
                        <Categories idPage={this.state.id} />
                        <br />
                        <br />
                        {this.state.question.map((question, index) => {
                            // console.log("STATE ", this.state.allData);
                            
                            // var allData = this.state.allData
                            var questionParent = question
                            this.state.incidentName = questionParent.incident.name
                            localStorage.setItem("question", question.question)
                            var questionStorage = localStorage.getItem("question")
                            localStorage.setItem(`${questionStorage}`, JSON.stringify(questionParent))
                            // var result = []
                            // for( var i = 0; i < allData.length; i++){
                            //     result.push(allData[i])
                            // }
                            // for (var i = 0;i < result.length; i++){
                            //     if(!result[i].hasOwnProperty("motivation")){
                            //         result[i].motivation = "undefined"
                            // }else if(!result[i].hasOwnProperty("frequency")){
                            //     result[i].frequency = 0
                            // }
                            // }
                            if(!questionParent.hasOwnProperty("motivation")){
                                questionParent.motivation = "Undefined"
                            }else if(!questionParent.hasOwnProperty("frequency")){
                                questionParent.frequency = 0
                                
                            }
                        if(this.state.allData.length === 0 || this.state.allData.length < 60){
                            this.state.allData.indexOf(questionParent) === -1 ? this.state.allData.push(questionParent) : console.log("This item already exists");
                        }
                        var answeredQuestion = this.state.allData.find(function(answer) {
                            return answer.id === question.id
                        })
                       
                        console.log("STATE ", this.state.allData);

                            return (
                                <ul
                                    key={index}
                                >
                                    <li
                                        value={question.question}
                                        key={index}
                                        style={{ fontSize: "20px" }}
                                        onClick={this.handleClick.bind(this, question)}
                                    >
                                        {
                                            question.question
                                        }
                                        <DropdownMotivation
                                            listNameFromParent={questionParent}
                                            selectedCategory = {answeredQuestion}
                                            passValueToMainForm={this.getMotivation}
                                            value={this.state.selected}
                                        />
                                        <Frequency
                                            callBackFromParent={this.frequencyCallback}
                                            listNameFromParent={questionParent}
                                            selectedCategory={answeredQuestion}
                                            passValueToMainForm={this.getFrequency}   
                                        />
                                        <Comments
                                            listNameFromParent={questionParent}
                                            getComment={this.getBackComment}
                                            selectedCategory={answeredQuestion}
                                            onBlur={this.onBlur}
                                            handleChange={this.handleChange}
                                        />
                                    </li>
                                </ul>
                            )
                        })}
                    </Container>
                </React.Fragment>
            )
        }
    }
