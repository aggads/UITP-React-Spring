import React, { Component } from 'react';
import axios from 'axios';
import URLStorage from '../../../../constants';
import './Categories.css'


export default class Categories extends Component {

    state = {
        categories: [],
    }

    componentDidMount() {
        axios.get(`${URLStorage.API_URL}/getallincident`)
            .then(res => {
                const data = res.data
                this.setState({
                    categories: data,
                    isLoaded: true,
                })
            })
    };

    render() {
        const { active } = this.props;
        // console.log(this.state.categories[1])
        return (
            <>
                {this.state.categories.map((categorie, i) => {
                    return (
                        <ul key={i}>
                            <li
                                key={i}
                                style={{ fontSize: "15px", padding: "10px", textAlign: "center" }}
                                className={categorie.id === this.props.idPage ? "active" : "inactive"}
                                onClick={this.props.parentCallback}
                            >
                                {categorie.name}
                            </li>
                        </ul>
                    );
                })}

            </>

        )
    }


}

//<li style={{fontSize: "15px", padding: "5px", textAlign:"center"}} key={index} className={data.id === active ? "active" : "inactive"} value={data.id} onClick={this.props.parentCallback}> {data.category_name} </li>

