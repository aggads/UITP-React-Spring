
import { ButtonGroup, Button } from 'reactstrap';
import axios from 'axios';
import URLStorage from '../../../../constants';
import './Radio.css';

import React, { PureComponent } from 'react'

class Frequency extends PureComponent {

    state = {
        regularity: [],
        regularityId: 0,
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
        var bigItem = JSON.parse(localStorage.getItem("bigItem"))
        //console.log(bigItem)

    }

    funFunc = () => {
        const { regularityCall } = this.state.regularityId
        this.props.callBackFromParent(regularityCall)
    }
    render() {

        const questionId = this.props.listNameFromParent;

        return (
            <>
                <ButtonGroup className='squareRadio' name="frequency">
                    {this.state.regularity.map((frequency, index) => {
                        return (
                            <Button
                                className={this.props.value == index ? `active` : null}
                                onClick={(a) => {
                                        this.setState({ active: index, regularityId: index })
                                        localStorage.setItem("frequency", a.target.value);
                                        var frequencyStorage = parseInt(localStorage.getItem("frequency"))
                                        questionId.frequency = frequencyStorage
                                        var questionStorage = localStorage.getItem("question");
                                        var getData = JSON.parse(localStorage.getItem(`${questionStorage}`))
                                        getData.frequency = frequencyStorage
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