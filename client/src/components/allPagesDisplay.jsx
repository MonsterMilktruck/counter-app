import React, { Component } from "react";
import CounterTop from "./counterTop";
import Axios from 'axios'
import { BrowserRouter, Routes, Route, Link, useNavigate, navigate, Redirect} from "react-router-dom";

class AllPagesDisplay extends Component {
    state = { pages: [],
    }

    componentDidMount() {
        Axios.get("http://localhost:3002/api/get").then((data) => {
            let pages = data.data;
            this.setState({pages});
    })
}
    
    render(){ 
        return (
            <p>hi</p>
        );
    }
}
 
export default AllPagesDisplay;