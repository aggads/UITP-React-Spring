
import { ButtonGroup, Button } from 'reactstrap';
import axios from 'axios';
import URLStorage from '../../../../constants';
import './Radio.css';

import React, { PureComponent } from 'react'

class Frequency extends PureComponent {

    state = {
        regularity: [],
        regularityId: null,
        active: null,
        id: 0,
    }
    componentDidMount() {
        axios.get(`${URLStorage.API_URL}/getallfrequency`)
            .then(res => {
                const data = res.data
                this.setState({
                    regularity: data,
                    isLoaded: true,
                })
            })
    }

    frequencyForParent = () =>{
        return null
    }

    funFunc = () => {
        const { regularityCall } = this.state.regularityId
        this.props.callBackFromParent(regularityCall)
    }
    render() {
        const questionId = this.props.listNameFromParent;
        // console.log(this.props.selectedCategory.frequency)
        // console.log("question id ", questionId.frequency)
        return (
            <>
                <ButtonGroup className='squareRadio' name="frequency">
                    {this.state.regularity.map((frequency, index) => {
                        return (
                            <Button
                                className={this.props.selectedCategory.frequency == index ? `active` : null}
                                onClick={(a) => {
                                        this.setState({ active: index, regularityId: index })
                                        localStorage.setItem("frequency", a.target.value);
                                        var frequencyStorage = parseInt(localStorage.getItem("frequency"))
                                        questionId.frequency = frequencyStorage
                                        this.props.passValueToMainForm(questionId)
                                    }
                                }
                                name="frequency"
                                key={index}
                                value={index}
                            >
                                {frequency.regularity}
                            </Button>
                        );
                    })}
                </ButtonGroup>
            </>
        )
    }
}

export default Frequency; 