import Mode from '../ModeSelection/Mode'
import MainForm from './Mainform/MainForm'
import Legend from './Mainform/Legend/Legend'
import React, {Suspense} from 'react';
import { Container } from 'reactstrap';



export default class FormPage extends React.Component {
    state = {
        selectedCat: 1,
        selectedMode: 0,
        group: null, 
        stateMode: [],
        modes: [], 
        loading: true,
        data: null
    };

    handleSelection = (idx) => (e) => {
        this.setState({ selectedMode: idx });
    };

    selectCat = (e) => {
        this.setState({ selectedCat: e.target.value })
    }
    componentWillMount(){
        let getGroup = localStorage.getItem("group")
        localStorage.setItem("stateMode", JSON.stringify(this.props.location.state)) 
        
        const asyncLocalStorage = {
            setItem: async function (key, value) {
                await null;
                return localStorage.setItem(key, value);
            },
            getItem: async function (key) {
                await null;
                return localStorage.getItem(key);
            }
        };
        var stateMode = asyncLocalStorage.getItem("stateMode")
        
        // console.log(stateMode)
        stateMode.then((value) => {
            // console.log("async storage ", value) 
            var value = JSON.parse(value)
            this.setState({stateMode: value})
            
            
        })
        
        // var stateModeN = localStorage.getItem("stateMode")  
        // console.log("Normal storage ", JSON.parse(stateModeN))
        // await this.setState({stateMode: JSON.parse(stateModeN)})
        // console.log("state mod value", stateMode)
        this.setState({
            group: getGroup,
            // modes: this.state.stateMode.modes.modes
        })
        
    //   console.log("THE STATE stateMode ", this.state.stateMode)


        
    }
    componentDidMount(){
        var stateModeN = JSON.parse(localStorage.getItem("stateMode"))
        // console.log("did mount ", stateModeN.modes.modes)
        this.setState({modes: stateModeN.modes.modes })
    }
    // async componentDidMount(){
        
    //     localStorage.setItem("stateMode", JSON.stringify(this.props.location.state)) 
    //     var stateModeN = localStorage.getItem("stateMode")  
    //     // console.log("Normal storage ", JSON.parse(stateModeN))
    //     await this.setState({stateMode: JSON.parse(stateModeN)})
        
    //     // console.log("state mode ", stateMode)
    //     // console.log("THE STATE stateMode ", this.state.stateMode.modes.modes)
        
    // }

render() {
        //const selectedtransport = this.props.location.state.modes.modes.filter(item => item.selected === true);
        // console.log("group ", this.state.stateMode)
        // console.log("group state ", this.props.location)
        // console.log("hello")
        // console.log("state mode ", this.state.stateMode.modes)
        
        return (
            <React.Fragment>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <Container>
                    <Legend /> 

                    <div style={{ display: "block", margin: "auto" }}>
                        <h4>{this.state.stateMode.group === 0 ? "Separate" : "Grouped"} Reporting for</h4>

                        <div style={{ display: "flex", justifyContent: "start", marginBottom: "40px" }}>
                            {this.state.stateMode.group === 0 ?
                            
                            this.state.modes.filter(mode => mode.selected === true).map((mode, idx) =>
                            <Mode key={idx} id={mode.id} index={idx} name={mode.name} url={mode} selected={this.state.selectedMode === idx ? true : false} maxHeight="50px" handleSelection={this.handleSelection(idx)} grouped={false} />)
                            :                             
                             this.state.modes.filter(mode => mode.selected === true).map((mode, idx) =>
                             <Mode key={idx} id={mode.id} index={idx} name={mode.name} url={mode} selected={true} maxHeight="50px" grouped={true}  />) }  
                        </div>

                        
                    </div>


                    {this.state.modes.filter(mode => mode.selected === true).map((mode, idx) => idx === this.state.selectedMode &&
                        <MainForm key={idx} id={mode.id} group={this.state.stateMode.group} index={idx} />
                    )}


                </Container>
                {/* </Suspense> */}
            </React.Fragment>
        )
    }
}
