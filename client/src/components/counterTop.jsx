
import Page from "./Page";
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useNavigate} from "react-router-dom";
import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import Axios from 'axios'

function NavigateToNewPage() {
  useNavigate("..");
}
class CounterTop extends Component {

//contains default information to be overrided when server call is made
state = {
    page: [{Tname: "UNKNOWN PAGE", uid: this.props.uid, pageID: 1}],
    index: 1,
    numPages: 1
  };

  //adds a page of counters
  handleAddPage = () => {
    let pages = [...this.state.pages];
    const tempPage = {
      id: pages.length + 1,
      name: "page #" + pages.length + 1,
      way: "/page" + (pages.length + 1),
    };
    pages.push(tempPage);
    this.setState({ pages });
  };

  //changes name of page and updates page name in server and in frontend
  handleChangePageName = (page) => (event) => {

    page = this.state.page;
    let text = event.target.value;

    page.name = text;
    // will update link AFTER the name is fully changed (by hitting save)
    // pages[index].way = "/" + text;
    // window.location.href=pages[index].way;
    this.setState({ page });
  };

  //deletes selected page of counters
  handleDeletePage = (page) => {
    const pages = this.state.pages.filter((c) => c.id !== page.id); // filters anything but the one to delete
    //sets new ids for all of them
    for (let i = 0; i < pages.length; i++) {
      pages[i].id = i + 1;
    }
    this.setState({ pages });
  };

  //cycles forward a page to the next counter
  handleNextPage = () => {
    //window.location.href=this.state.pages[index - 1].way;
    Axios.get("http://localhost:3002/api/getNext/" + this.state.page.pageID + "/" + this.state.page.uid).then((data) =>{
      let pageid = data.data["pageID"];
      console.log(pageid);
    // <Navigate to={"/" + pageid}/>
    NavigateToNewPage();
    })
    //sets link to the correct page - doesnt keep index state b/c of refreshing the page
    // (prob wanna set link AFTER server calls)
    /*let url = window.location.href.split('/');
    url[url.indexOf('pages') + 1] = index;
    let urlString = url.join('/'); 
    window.location.href=urlString; */
  };

  //cycles back a page to the previous counter
  handleBackPage = () => {
    let index = this.state.index;
    index--;
    console.log(index);
    this.setState({index});
    //sets link to the correct page (prob wanna set link AFTER server calls)
    window.location.href=this.state.pages[index - 1].way;
  };

  //fetches correct page on startup
  componentDidMount()
  {
    let url = window.location.href.split('/');
    let index = url.indexOf('pages');
    index += 1;
    index = Number(url[index]);
    Axios.get("http://localhost:3002/api/getFromId/" + index + "/" + this.props.uid).then((data) =>{
    let page = data.data;
    console.log(page)
    this.setState({page});
  })
  this.setState({index});

  Axios.get("http://localhost:3002/api/getCount/" + this.state.page.uid).then((data) =>{
    let numPages = data.data[0]['count(*)'];
    this.setState({numPages});
})
  }

  render() {
    return(

  <div>
          <Page
                key={this.state.page.id}
                id={this.state.page.id}
                onAddPage={this.handleAddPage}
                onDeletePage={this.handleDeletePage}
                onNextPage={this.handleNextPage}
                onBackPage={this.handleBackPage}
                currentPage={this.state.page[0]}
                index={this.state.index}
                onChangePageName = {this.handleChangePageName}
                onGetIndexTop={this.getIndexTop()}
                onGetIndexBottom={this.getIndexBottom()}>
              </Page>
  </div>
);
}
    getIndexTop()
    {
      let val = false;
      if(this.state.index === this.state.numPages)
      {
        val = true;
      }
    
      return val;
    
    }

    getIndexBottom()
    {
      let val = false;
      if(this.state.index === 1)
      {
        val = true;
      }
      return val;
    }
}
    export default CounterTop;