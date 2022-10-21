import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, navigate, Redirect} from "react-router-dom";


class Home extends Component {
    state = {  } 
    render() { 
        return (
            <div>
            <Link to="/pages">pages</Link>
            </div>
        );
    }
}
 
export default Home;