import Frequency from './Frequency/Radio';
import Comments from './Comment/Comment';
// import Legend from './Legend/Legend';
import Motivation from './Motivation/Motivation'
import Categories from './Categories/Categories'
import URLStorage from '../../../constants';
import { Link } from 'react-router-dom';
import uniqueid from 'uniqid';
import { AsyncStorage } from 'AsyncStorage';
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
constructor(props){
    super (props)
    this.state = {
        question: [],
        id: 1,
        test: null,
        allData: [],
        answers: [],
        value: [],
        selectedCat: 1,
        selectedMode: 0,
        dataGet : [],
        incidentName: "",

    }
}

    allStorage() {

        var archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;

        for (; key = keys[i]; i++) {
            archive.push( key + '=' + localStorage.getItem(key));
        }

        return console.log(archive);
    }

    async handleClick(question){
        if (this.state.allData.length) {  
            var getQuestion = this.state.allData.find(function (data, id) {
                    if (data.id === question.id) {
                        return data
                    } else {
                        return false
                    }
                })
            if(getQuestion) {
                var indexOf = this.state.allData.indexOf(getQuestion);
                for (var key in getQuestion) {
                    if (getQuestion[key] === question[key] || getQuestion[key] === undefined) {
                        getQuestion[key] = question[key]
                        await this.state.allData.splice(indexOf, 1, question)
                        // console.log(this.state.allData)
                        localStorage.setItem("bigItem ", JSON.stringify(this.state.allData))
                    }
                }
            } else {
                await this.setState({ allData: [...this.state.allData, question ]})
                // console.log(this.state.allData)
                localStorage.setItem("bigItem ", JSON.stringify(this.state.allData))

            }
        } else {
            await this.setState({allData: [question]})
            localStorage.setItem("bigItem ", JSON.stringify(this.state.allData))
        }
        await localStorage.setItem("bigItem ", JSON.stringify(this.state.allData))

        
        // await AsyncStorage.getItem('bigItem')
        //     .then(value =>console.log("AsyncStorage value ", value))
        //         // this.setState({ allData: value }))
        //     .catch(e => console.log('err', e));

        // this.setState({
        //     allData: bigItem
        // })

        console.log("this state all data in handleClik ", this.state.allData)
        console.log(" local storage in handleClick without parse ", localStorage.getItem("bigItem"))
        console.log(" local storage in handleClick with parse ", JSON.parse(localStorage.getItem("bigItem")))

        


    }

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
        // if (test === null) {
        //     return this.setState({
        //         allData: []
        //     })
        //} 
        //else {

        //     for (let i = 0; i < test.length; i++) {
        //         if (test[i].question === question) {
        //         }

        //     }
        // }


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

        var bigItem = JSON.parse(localStorage.getItem("bigItem"))
        console.log(" local storage in did mount without parse ", localStorage.getItem("bigItem"))
        console.log(" local storage in did mount with parse ", JSON.parse(localStorage.getItem("bigItem")))

        this.fetchQuestions(1);

        const transportId = this.props.id;
        this.setState({ modeID: transportId})

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

    

    componentWillMount(){
        
        var bigItem = JSON.parse(localStorage.getItem("bigItem"))
        var questionStorage = localStorage.getItem("question");
        var getData = JSON.parse(localStorage.getItem(`${questionStorage}`))

        console.log(" local storage in will mount without parse ", localStorage.getItem("bigItem"))
        console.log(" local storage in will mount with parse ", JSON.parse(localStorage.getItem("bigItem")))
        var selectedMode = JSON.parse(localStorage.getItem("selectedModes"))
            var selectedModeName = [];
            for (var i in selectedMode) {
                selectedModeName.push(selectedMode[i].name)
            }
            if(bigItem){
                bigItem.selectedMode = selectedModeName
            } 
            else {
                bigItem = []
            }

        this.setState({ allData : bigItem, dataGet: getData})
    }


    render() {
        this.allStorage()
        // NEXT / SUBMIT BUTTON SWITCH
        console.log(" local storage in render without parse ", localStorage.getItem("bigItem"))
        console.log(" local storage in render with parse ", JSON.parse(localStorage.getItem("bigItem")))
        console.log("THE STATE ", this.state.allData)
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
                        var questionParent = question
                        this.state.incidentName = questionParent.incident.name
                        localStorage.setItem("question", question.question)
                        var questionStorage = localStorage.getItem("question");
                        localStorage.setItem(`${questionStorage}`, JSON.stringify(questionParent))
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


