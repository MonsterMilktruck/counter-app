import React, { Component } from "react";
import Axios from 'axios'
import {Link, Route} from "react-router-dom";
import CounterTop from "./counterTop";

//Displays all pages for a single user
class AllPagesDisplay extends Component {
    state = { pages: [{
        Tname: 'default',
        pageID: 0,
        uid: -1,
    },
    {
        Tname: 'default',
        pageID: 1,
        uid: -1,}]
    }

    componentDidMount() {
        Axios.get("http://localhost:3002/api/get").then((data) => {
            let pages = data.data;
            this.setState({pages});
    })
}
    
    render(){ 
        return (
            <ol>
                {this.state.pages.map(page => <li key={page.pageID}>
                    <Link to={"" + page.pageID}>{page.Tname}</Link></li>
                )}
            </ol>
        );
    }
}
 
export default AllPagesDisplay;