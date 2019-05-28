import Mode from '../ModeSelection/Mode'
import MainForm from './Mainform/MainForm'
import Legend from './Mainform/Legend/Legend'
import React from 'react';
import { Container } from 'reactstrap';



export default class FormPage extends React.Component {
    state = {
        selectedCat: 1,
        selectedMode: 0,
    };

    handleSelection = (idx) => (e) => {
        this.setState({ selectedMode: idx });
    };

    selectCat = (e) => {
        this.setState({ selectedCat: e.target.value })
    }

    componentDidMount() {

    }

    render() {
        //const selectedtransport = this.props.location.state.modes.modes.filter(item => item.selected === true);
        return (
            <React.Fragment>
                <Container>
                    <Legend /> 

                    <div style={{ display: "block", margin: "auto" }}>
                        <h4>{this.props.location.state.group === 0 ? "Separate" : "Grouped"} Reporting for</h4>

                        <div style={{ display: "flex", justifyContent: "start", marginBottom: "40px" }}>
                            {this.props.location.state.group === 0 ?
                            
                            this.props.location.state.modes.modes.filter(mode => mode.selected === true).map((mode, idx) =>
                            <Mode key={idx} id={mode.id} index={idx} name={mode.name} url={mode} selected={this.state.selectedMode === idx ? true : false} maxHeight="50px" handleSelection={this.handleSelection(idx)} grouped={false} />)
                            :                             
                             this.props.location.state.modes.modes.filter(mode => mode.selected === true).map((mode, idx) =>
                             <Mode key={idx} id={mode.id} index={idx} name={mode.name} url={mode} selected={true} maxHeight="50px" grouped={true}  />) }  
                        </div>

                        
                    </div>


                    {this.props.location.state.modes.modes.filter(mode => mode.selected === true).map((mode, idx) => idx === this.state.selectedMode &&
                        <MainForm key={idx} id={mode.id} group={this.props.location.state.group} index={idx} />
                    )}


                </Container>
            </React.Fragment>
        )
    }
}
