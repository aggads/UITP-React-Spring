import Frequency from '../FormPage/Mainform/Frequency/Radio';
import Comments from '../FormPage/Mainform/Comment/Comment';
import Mode from '../ModeSelection/Mode'
import Motivation from '../FormPage/Mainform/Motivation/Motivation'
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

export default class Confirmation extends React.Component {

    state = {
        categories:[], 
        motivation:[],
        questions: [],
        active: null,
        index: 0,
        regularityId: 0,
        // answers: [],
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

    submit = (e) => {

        e.preventDefault();
        const selectedModes = JSON.parse(localStorage.getItem("selectedModes"));
        JSON.parse(localStorage.getItem("selectedModes"));
        let results = [];
        const localPtoId = parseInt(localStorage.getItem("ptoid"));

        // -------------- GROUPED RESULTS POSTING -----------------------
        if (JSON.parse(localStorage.getItem("group")) === 1) {
            selectedModes.map((mode) => {
                return results.push(this.props.location.state.answers.map((answer) => {
                    return {
                        ptoID: localPtoId,
                        questionID: parseInt(answer.questionID),
                        frequency: parseInt(answer.frequency),
                        modeID: parseInt(mode.id),
                        motivationID: parseInt(answer.motivationID),
                        comment: answer.comment,
                        periodeID: parseInt(answer.periode)

                    }
                }))
            });

            // -------------- SEPARATE RESULTS POSTING -----------------------
        } else {
            selectedModes.map(mode => {
                const oneSelectedMode = JSON.parse(localStorage.getItem(mode.id));
                return results.push(oneSelectedMode.map((answer) => {
                    return {
                        ptoID: localPtoId,
                        questionID: parseInt(answer.questionID),
                        frequency: parseInt(answer.frequency),
                        modeID: parseInt(answer.modeID),
                        motivationID: parseInt(answer.motivationID),
                        comment: answer.comment,
                        periode: parseInt(answer.periode),
                    }
                }
                ))
            })
        }

        // -------------- AXIOS POST -----------------------

        // let successBoolean = true

        // results.forEach((resultOne) => {
        //     axios.post(`${URLStorage.API_URL}/resultAll`, {
        //         resultOne // variable name asked by the backend, do not change
        //     })
        //         .then((res) => { return res.status !== 202 ? successBoolean = false : undefined })
        //         .then(item => { return successBoolean === true ? this.clearQuestions(selectedModes) && this.goTo("reports") : this.goTo("error") })
                
        // })



    }

    render() {

        const selectedModes = JSON.parse(localStorage.getItem("selectedModes"));
        //console.log(selectedModes)
        // const allAnswers = selectedModes.map((item, idx) => {
        //     return JSON.parse(localStorage.getItem(`${item.id}`));
        // })

        //var questionData = localStorage.getItem("")
        var answers = JSON.parse(localStorage.getItem("bigItem"))
        //console.log("bigItem", answers)
        // var regularityId = 
        // this.setState({ active: index, regularityId: index })


        const { motivations } = this.props.location.state;

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
                        console.log("ANSWERS ", data.frequency)
                        return <Container key={index} className="dark-overlay" >
                            <Row key={index} style={{ padding: '15px' }}>
                                <Col key={index} sm="12" md={{ size: 12 }}>
                                    <FormGroup key={index}>
                                        <h5> {index + 1} {data.question} </h5>
                                        {/* <Frequency key={data.question} questionId={data.question} value={data.frequency} disable={"disabled"} /> */}
                                        < Frequency 
                                            value={index}
                                            className={"active"}
                                            
                                        />
                                    </FormGroup>
                                    <p>Comment : {data.comment ? data.comment : "none"}</p>
                                    <Motivation key={data.index} questionId={data.questionID} items={motivations} value={data.motivationID} />

                                    <Comments key={data.questionID + 'coucou'} questionId={data.questionID} comment={data.comment} disable={"disabled"} />

                                </Col>

                            </Row>
                        </Container>
                    })

                    :
                    /* DISPLAY SEPARATE RESULTS */
                    JSON.parse(localStorage.getItem("selectedModes")).map((mode) => {
                        return JSON.parse(localStorage.getItem(mode.id)).map((data, index) => {
                            return (
                                <Container key={index} className="dark-overlay" >
                                    {index === 0 && <h3>{mode.name}</h3>}
                                    <Row key={index} style={{ padding: '15px' }}>
                                        <Col key={index} sm="12" md={{ size: 12 }}>
                                            <FormGroup key={index}>
                                                <h3> {data.index} {data.question} </h3>
                                                <Frequency key={data.questionID} questionId={data.questionID} value={data.frequency} disable={"disabled"} />
                                            </FormGroup>
                                            <h5>Comment : {data.comment}</h5>
                                            {/* <Motivation key={data.questionID} questionId={data.questionID} items={motivations} value={data.motivationID} /> */}
                                            {/* <Comments key={data.questionID + 'coucou'} questionId={data.questionID} comment={data.comment} disable={"disabled"} /> */}
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        })
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

