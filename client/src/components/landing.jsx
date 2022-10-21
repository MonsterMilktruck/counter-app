import React, { Component } from "react";
import {Link} from "react-router-dom";

class Landing extends Component {
    state = {  } 
    render() { 
        return (
            <div>
            <h1>WELCOME!!!! this is the landing page :)</h1>
            <Link to ="home">Home</Link>
            </div>
        );
    }
}
 
export default Landing;