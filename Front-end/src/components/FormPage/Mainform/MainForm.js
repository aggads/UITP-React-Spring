import Frequency from './Frequency/Radio';
import Comments from './Comment/Comment';
// import Legend from './Legend/Legend';
import Motivation from './Motivation/Motivation'
import Categories from './Categories/Categories'
import URLStorage from '../../../constants';
import { Link } from 'react-router-dom';
import uniqueid from 'uniqid';
// import  ConfirmModal  from '../Modal';

import '../../../App.css';

import axios from 'axios';
import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

import './MainForm.css'
import DropdownExampleCompact from './Motivation/Motivation';
import { ButtonGroup, Dropdown } from 'semantic-ui-react';
import DropdownMotivation from './Motivation/Motivation';

export default class MainForm extends React.Component {

    state = {

        // --------- TESTING : UNCOMMENT WHEN SERVER DOWN ----------------
        categories: [],
        motivations: [],
        regularity: [],
        question: [],
        questions: [],
        id: 1,
        name: [],
        incident: [],
        test: null,
        results: [],
        regularityFromChild: 0,
        // ----------------------------------------------------------------

        allData: [],
        answers: [],
        value: [],
        selectedCat: 1,
        selectedMode: 0,

    };
    handleSelection = (idx) => (e) => {
        this.setState({ selectedMode: idx });
    };

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

    test = (question) => {
        var test = this.state.allData
        //console.log("test value ", test)
        if (test === null){
            return this.setState({
                allData: ["Hello"]
            })
        }else{
            
            for (let i = 0; i < test.length; i++) {

                //console.log("RUN SECONDE TIME BABY", test[i].motivation)
                //, test[i].motivation, test[i].comment, test[i].frequency
                if (test[i].question === question) {
                    //console.log("HELLLOOO ", test[i].frequency)
                    //return test[i].frequency 
                    if (test[i].frequency) {
                        console.log("frequency", test[i].frequency)
                        return test[i].frequency
                    } else if (test[i].motivation) {
                        console.log("motivation", test[i].motivation)
                        return test[i].motivation
                    } else if (test[i].comment) {
                        console.log("comment", test[i].comment)
                        return test[i].comment
                    } else {
                        console.log("Nothing")
                    }
    
    
                }
    
            }
        }
        

    }



    // anyChange = (id) => (e) => {
    //     const inputName = e.target.name;
    //     const inputValue = e.target.value;
    //     let entries = Object.assign({}, this.state);
    //     const { answers } = entries;
    //     answers.map(answer => answer.questionID === id ? answer[inputName] = inputValue : undefined);
    //     this.setState(entries);
    //     localStorage.setItem(this.props.id, JSON.stringify(this.state.answers));

    //     // ------------ SWITCH BOOLEAN TO COMPLETED FOR CURRENT MODE ---------------

    //     console.log(this.state.allData)

    //     if (this.state.allData.filter(answer => answer.frequency === null).length === 0) {

    //         let completeMode = JSON.parse(localStorage.getItem("completedModes"));
    //         completeMode[this.props.index] = true;

    //         if (this.props.group) {
    //             var dummieArray = [];
    //             completeMode.map(item => dummieArray.push(true));
    //             localStorage.setItem("completedModes", JSON.stringify(dummieArray));

    //         } else {
    //             localStorage.setItem("completedModes", JSON.stringify(completeMode));
    //         }
    //     }
    // }

    selectCat = (e) => {
        this.setState({ selectedCat: e.target.value })
        localStorage.setItem(this.props.id, JSON.stringify(this.state.answers));
    }
    frequencyCallback = (regularityCall) => {
        this.setState({
            regularityFromChild: regularityCall
        })
    }
    componentDidMount() {
        localStorage.getItem("frequency", "motivations", "comments", "questions", "question")

        this.fetchQuestions(1);

        const transportId = this.props.id;


        var bigItem = JSON.parse(localStorage.getItem("bigItem"))
        this.setState({ modeID: transportId, allData: bigItem })

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
    };


    render() {
        // NEXT / SUBMIT BUTTON SWITCH
        console.log(this.state.allData)
        const nextSubmit = this.state.selectedCat === 5 ?
            // || (parseInt((localStorage.getItem("group")) === 1)
            (JSON.parse(localStorage.getItem("completedModes")).filter(item => item === false).length === 0) ?
                <Link to={{ pathname: "/confirmation", state: { answers: this.state.answers } }}>
                    <Button onClick={this.submit} className="submit" >Submit</Button>
                </Link>
                : <>
                    <Button className="submit" disabled>Submit</Button>
                </>
            :
            <Button onClick={this.next} className="submit">Next</Button>;
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
                        let questionParent = question
                        let incidentName = questionParent.incident.name
                        questionParent.incident = incidentName
                        return (
                            <ul
                                key={index}
                            >
                                <li
                                    value={question.question}
                                    key={index}
                                    style={{ fontSize: "20px" }}
                                    onClick={(a) => {
                                        localStorage.setItem("question", question.question)
                                        var questionStorage = localStorage.getItem("question");
                                        localStorage.setItem(`${questionStorage}`, JSON.stringify(questionParent))
                                        //let answer = this.state.allData;

                                        var getData = JSON.parse(localStorage.getItem(`${questionStorage}`))

                                        var bigItem = JSON.parse(localStorage.getItem("bigItem"))

                                        if (!bigItem) {
                                            bigItem = []
                                        }
                                        var selectedMode = JSON.parse(localStorage.getItem("selectedModes"))
                                        // console.log("Before ===>", selectedMode)

                                        var selectedModeName = [];
                                        for (var i in selectedMode) {
                                            selectedModeName.push(selectedMode[i].name)
                                            //selectedModeName =  selectedMode[i].name
                                            // console.log("in loop ===>", selectedModeName) //key's value
                                        }

                                        bigItem.selectedMode = selectedModeName

                                        // console.log("big item ", getData)
                                        // this.setState({
                                        //     allData: []
                                        // })
                                        var allData = this.state.allData
                                        var copiedState = this.state

                                        //var allData = [...this.state.allData]
                                        //copiedState = Object.values(copiedState)
                                        copiedState = Object.values(allData)
                                        console.log("iterable", copiedState)

                                        
                                        var modified = false
                                        //console.log("state data ", this.state.allData)
                                        
                                        var verif = copiedState.find(function (data, id) {
                                            if (data.id === getData.id) {
                                                for (var key in data) {
                                                    if (data[key] === getData[key]) {
                                                        if (data[key] === undefined) {
                                                            continue
                                                        }
                                                        else {
                                                            data[key] = getData[key]
                                                            modified = true
                                                            
                                                            // for (var i = 0; allData.length; i++){
                                                            //     console.log("in loop", allData[i].question)
                                                            // }
                                                            // allData.forEach(function(item){
                                                            //     //console.log("this ...", item.motivation)
                                                            //     var allDataId = allData[id]
                                                            //     //console.log("all data in for each ", allDataId)
                                                            //     allData.splice(id, 1)
                                                            //     //console.log("item ", item)
                                                                
                                                            // })
                                                            
                                                            const allSplicedData = copiedState.splice(id, 1)
                                                            console.log("all spliced data", allSplicedData)
                                                            console.log("copied state ", copiedState)
                                                            //console.log("get data ", getData)
                                                        }
                                                    }

                                                }
                                                return true
                                            } else {
                                                return false
                                            }
                                        })


                                        if (!verif || modified) {
                                            copiedState.push(getData)
                                            localStorage.setItem("bigItem", JSON.stringify(copiedState))
                                        }
                                    }
                                    }

                                >
                                    {
                                        question.question
                                    }
                                    <DropdownMotivation
                                        key={index}
                                        listNameFromParent={questionParent}
                                        value={this.test(question.question)}
                                    />
                                    <Frequency
                                        callBackFromParent={this.frequencyCallback}
                                        listNameFromParent={questionParent}
                                        value={this.test(question.question)}
                                    />
                                    <Comments
                                        listNameFromParent={questionParent}
                                        getComment={this.getBackComment}
                                        value={this.test(question.question)}
                                    />
                                </li>
                            </ul>
                        );
                    })}
                </Container>
            </React.Fragment>
        )
    }
}


