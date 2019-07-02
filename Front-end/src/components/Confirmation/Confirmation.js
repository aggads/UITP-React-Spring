import Frequency from '../FormPage/Mainform/Frequency/Radio';
import Comments from '../FormPage/Mainform/Comment/Comment';
import Mode from '../ModeSelection/Mode'
// import Motivation from '../FormPage/Mainform/Motivation/Motivation'
import DropdownMotivation from '../FormPage/Mainform/Motivation/Motivation';
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import URLStorage from '../../constants';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';
import axios from 'axios';

export default class Confirmation extends React.Component {

    state = {
        categories:[], 
        motivation:[],
        questions: [],
        active: null,
        index: 0,
        regularityId: 0,
        answers: [],
        // value: [],
        selectedCat:1,
        selectedMode: 0,

    };

    clearQuestions(selectedModes)  {
         selectedModes.forEach(mode => localStorage.removeItem(`${mode.id}`));
        return true;
    }

    goTo(route) {
        this.props.history.replace(`/${route}`);
    }

    componentWillMount(){
        var answers = JSON.parse(localStorage.getItem("bigItem"))
        this.setState({answer: answers})
    }
    submit = (e) => {

        e.preventDefault();
        const selectedModes = JSON.parse(localStorage.getItem("selectedModes"));
        JSON.parse(localStorage.getItem("selectedModes"));
        let results = [];
        const localPtoId = parseInt(localStorage.getItem("ptoid"));

        // -------------- GROUPED RESULTS POSTING -----------------------
        // if (JSON.parse(localStorage.getItem("group")) === 1) {
        //     selectedModes.map((mode) => {
        //         return results.push(this.props.location.state.answers.map((answer) => {
        //             return {
        //                 ptoID: localPtoId,
        //                 questionID: parseInt(answer.questionID),
        //                 frequency: parseInt(answer.frequency),
        //                 modeID: parseInt(mode.id),
        //                 motivationID: parseInt(answer.motivationID),
        //                 comment: answer.comment,
        //                 periodeID: parseInt(answer.periode)

        //             }
        //         }))
        //     });

            // -------------- SEPARATE RESULTS POSTING -----------------------
        // } else {
        //     selectedModes.map(mode => {
        //         const oneSelectedMode = JSON.parse(localStorage.getItem(mode.id));
        //         return results.push(oneSelectedMode.map((answer) => {
        //             return {
        //                 ptoID: localPtoId,
        //                 questionID: parseInt(answer.questionID),
        //                 frequency: parseInt(answer.frequency),
        //                 modeID: parseInt(answer.modeID),
        //                 motivationID: parseInt(answer.motivationID),
        //                 comment: answer.comment,
        //                 periode: parseInt(answer.periode),
        //             }
        //         }
        //         ))
        //     })
        // }

        // -------------- AXIOS POST -----------------------

        let successBoolean = true

        // results.forEach((resultOne) => {
        //     axios.post(`${URLStorage.API_URL}/resultAll`, {
        //         resultOne // variable name asked by the backend, do not change
        //     })
        //         .then((res) => { return res.status !== 202 ? successBoolean = false : undefined })
        //         .then(item => { return successBoolean === true ? this.clearQuestions(selectedModes) && this.goTo("reports") : this.goTo("error") })
                
        // })
        console.log("Submit running")

        this.state.answers.forEach((result) => {
            axios.post(`${URLStorage.API_URL}/result`, {
                //--- Data format needed ---
                // {	
                //     "idUser": 1,  ===> Pto id
                //     "idFrequency": 4,
                //     "idMotivation": 2,
                //     "idQuestion": 3
                
                // }

                // idUser:
                idFrequency: result.Frequency,
                idMotivation: result.motivation,
                idQuestion: result.id
            })
                .then((res) => { 
                    return res.status !== 202 ? successBoolean = false : undefined })
                .then(item => { 
                    return successBoolean === true ? this.clearQuestions(selectedModes) 
                    && this.goTo("reports") && console.log("success"): this.goTo("error") 
                    && console.log("something went wrong")})
                .catch(function (error) { 
                    console.log(error) });
        })


        //---- AXIOS METHODE TEMPLATE ------
        // axios.post('/result', {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });



    }

    render() {

        this.state.answer.forEach((item) =>{
            // console.log("item ", item)
        })

        const selectedModes = JSON.parse(localStorage.getItem("selectedModes"));
        //console.log(selectedModes)
        // const allAnswers = selectedModes.map((item, idx) => {
        //     return JSON.parse(localStorage.getItem(`${item.id}`));
        // })

        //var questionData = localStorage.getItem("")
        var answers = JSON.parse(localStorage.getItem("bigItem"))
        // if (!answers){
        //     if(window.confirm("Fill something before submit")){
        //         window.location.href= "/formpage"
        //     }
        // }
        //console.log("bigItem", answers)
        // var regularityId = 
        // this.setState({ active: index, regularityId: index })


        console.log("confirmation ", answers)
        const { motivations } = this.props.location.state;
        var modeId = JSON.parse(localStorage.getItem("selectedModes"))


        return (
            <>
                <div style={{display: "flex", alignItems:"center", justifyContent: "space-between"}}>
                    {selectedModes.map((mode, idx) => <Mode key={idx} id={mode.id} index={idx} name={mode.name} url={mode} selected={true} maxHeight="50px" grouped={true}  />)}
                    <div>
                        <Button onClick={this.submit} className="submit">Confirm Submission</Button>
                    </div>
                </div>
            <Container>
                {JSON.parse(localStorage.getItem("group")) === 1
                    ?
                    
                    /* DISPLAY GROUPED RESULTS  */
                    answers.map((data, index) => {
                        // console.log("ANSWERS ", answers[index].question)
                        // console.log("ANSWERS ", data.frequency)
                        // console.log("data ", data)
                        var questionParent = data
                        var answeredQuestion = answers.find(function(answer) {
                            return answer.id === data.id
                        })

                        return <Container key={index} className="dark-overlay" >
                            <Row key={index} style={{ padding: '15px' }}>
                                <Col key={index} sm="12" md={{ size: 12 }}>
                                    <FormGroup key={index}>
                                        <h5> {index + 1} {data.question} </h5>
                                        {/* <Frequency key={data.question} questionId={data.question} value={data.frequency} disable={"disabled"} /> */}
                                        {/* < Frequency /> */}
                                        <Frequency
                                            callBackFromParent={this.frequencyCallback}
                                            listNameFromParent={questionParent}
                                            selectedCategory={answeredQuestion}
                                            passValueToMainForm={this.getFrequency}   
                                        />
                                        <DropdownMotivation
                                            listNameFromParent={questionParent}
                                            selectedCategory = {answeredQuestion}
                                            passValueToMainForm={this.getMotivation}
                                            value={this.state.selected}
                                        />
                                    </FormGroup>
                                    <p>Comment : {data.comment ? data.comment : "none"}</p>
                                    {/* <Motivation /> */}

                                    {/* <Comments key={data.questionID + 'coucou'} questionId={data.questionID} comment={data.comment} disable={"disabled"} /> */}

                                </Col>

                            </Row>
                        </Container>
                    })

                    :
                    /* DISPLAY SEPARATE RESULTS */
                    JSON.parse(localStorage.getItem("selectedModes")).map((mode, data, index) => {
                        console.log("mod id ", mode.name)
                            // return JSON.parse(localStorage.getItem(mode)).map((data, index) => {
                            return (
                                <Container key={index} className="dark-overlay" >
                                    {index === 0 && <h3>{mode.name}</h3>}
                                    <Row key={index} style={{ padding: '15px' }}>
                                        <Col key={index} sm="12" md={{ size: 12 }}>
                                            <FormGroup key={index}>
                                                <h3> {data.index} {data.question} </h3>
                                                {/* <Frequency
                                                callBackFromParent={this.frequencyCallback}
                                                listNameFromParent={questionParent}
                                                selectedCategory={answeredQuestion}
                                                passValueToMainForm={this.getFrequency}   
                                                />
                                                <DropdownMotivation
                                                    listNameFromParent={questionParent}
                                                    selectedCategory = {answeredQuestion}
                                                    passValueToMainForm={this.getMotivation}
                                                    value={this.state.selected}
                                                /> */}
                                            </FormGroup>
                                            <h5>Comment : {data.comment}</h5>
                                            {/* <Motivation /> */}
                                            {/* <Motivation key={data.questionID} questionId={data.questionID} items={motivations} value={data.motivationID} /> */}
                                            {/* <Comments key={data.questionID + 'coucou'} questionId={data.questionID} comment={data.comment} disable={"disabled"} /> */}
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        // })
                    })
                }
                <Button onClick={this.submit} className="submit">Confirm Submission</Button>
                <Link to={{ pathname: "/formpage"}} className="back-form">
                    <Button>Back to Form</Button>
                </Link>
                </Container>
            </>
        )

    }

}

