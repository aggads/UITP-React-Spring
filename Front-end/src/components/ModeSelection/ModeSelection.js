import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Container, ButtonGroup, Button } from 'reactstrap';
import Mode from './Mode';
import './Mode.css'
//import axios from 'axios';
//import URLStorage from '../../constants';



class ModeSelection extends Component {
    state = {
        //modes: JSON.parse(localStorage.getItem("modes")),
        modes: [{ id: 1, name: "train", url: "", selected: false }, { id: 2, name: "bus", url: "", selected: false }, { id: 3, name: "metro", url: "", selected: false }, { id: 4, name: "trolley", url: "", selected: false }],
        grouping: [{ text: "Multiple Separate Reports", active: false }, { text: "One Grouped Report", active: false }],
        selectedModes: [],
        periodeDone: false
        
    };

    onRadioBtnClick(idx) {
        this.setState({ rSelected: idx });
        localStorage.setItem("group", idx);
    }

    componentDidMount() {
        // let pathToCheck = `${localStorage.getItem("ptoid")}/${JSON.parse(localStorage.getItem("periods")).currentPeriod}`
        // axios.get(`${URLStorage.API_URL}/lastPeriode/${pathToCheck}`)
        // .then(res => {
        //     if (res.data.message === "DONE") {
        //         this.setState({periodeDone : true})
        //     } else if(res.data.message === "NOTDONE"){
        //         this.setState({periodeDone : false})
        //     }
        // }) 
    // -------------- TESTING : UNCOMMENT WHEN SERVER DOWN ----------------
            //const localmodes = JSON.parse(localStorage.getItem("modes"));
            // this.setState({ modes: localmodes });
            //console.log("LOCAL MODES ", this.state.modes)

    // -------------- TESTING : COMMENT WHEN SERVER DOWN ----------------
            // axios.get(`${URLStorage.API_URL}/mode`)
            //     .then(res => {
            //         if (res) {
            //             const modes = res.data;
            //             this.setState({ modes });
            //             localStorage.setItem("modes", JSON.stringify(modes));                   
            //         }
            //     })
            //     .then(() => {
            //         if (!this.state.modes){
            //         const localmodes = JSON.parse(localStorage.getItem("modes"));
            //         this.setState({ modes: localmodes })}
            //     })

    // -------------------------------------------------------------------   
    
    }

    handleSelection = (idx) => {
        let copiedState = Object.assign({}, this.state);
        copiedState.modes[idx].selected = !copiedState.modes[idx].selected;

        this.setState(copiedState);

        const selectedModes = copiedState.modes.filter(mode => mode.selected === true);
        localStorage.setItem("selectedModes", JSON.stringify(selectedModes));
        
        

        // -------- ARRAY OF BOOLEAN FOR COMPLETED ANSWER ----------------
        const completedModes = JSON.parse(localStorage.getItem("selectedModes")).map(mode => {
            return false
        });
        localStorage.setItem("completedModes", JSON.stringify(completedModes));
        this.setState({completedModes});

                
    };
    
    render() {
        // if (localStorage.getItem('group'))    {
        //     return <Redirect to={{ pathname: '/mainform' }}/>
        //   }
        if(!this.state.modes){
            return null;
        }
        return (
            this.state.periodeDone === false ? <Container >

                <h4 style={{ textAlign: "center", margin: "20px" }}>Select Transports to Report For</h4>

                <div style={{ display: "flex", justifyContent: "space-around", padding: "40px", margin: "40px", flexWrap: "wrap", alignItems: "flex-end",  }}>
                    {this.state.modes.map((mode, idx) =>

                        <Mode key={idx} id={mode.id} name={mode.name} url={mode} handleSelection={() => this.handleSelection(idx)} selected={mode.selected} />
                    )}
                </div>

                {this.state.modes.filter(mode => mode.selected === true).length > 0 &&
                <div style={{display: "flex", flexDirection: "column", width: "50vw", alignItems: "space-around", margin: "auto"}}>
                 <h4 style={{ textAlign: "center", margin: "20px" }}>Access to Report Form</h4>
                    <ButtonGroup style={{ display: "flex", justifyContent: "space-around" }}>

                                            
                        {this.state.grouping.map((item, idx) =>
                            <Link key={idx} to={{pathname:"/formpage", state : {modes: this.state, group: idx}}}>
                                <Button className="selection-btn" key={idx} style={{ margin: "20px", minWidth: "100px", width: "300px" }} color="success" size="lg" onClick={() => this.onRadioBtnClick(idx)} active={this.state.rSelected === idx}>{item.text}</Button>
                            </Link>
                            )}
                          

                    </ButtonGroup>
                </div>    
                }

               


            </Container> : <h3>Form already sent for this period</h3>
            
        
        );
    }
}

export default ModeSelection;
