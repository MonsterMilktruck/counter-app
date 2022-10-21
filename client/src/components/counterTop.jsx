
import Page from "./Page";
import { BrowserRouter, Routes, Route, Navigate, Link, useParams} from "react-router-dom";
import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import Axios from 'axios'

class CounterTop extends Component {

state = {
    page: { id: 1, name: "page #1"},
    index: 0,
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

  //changes name of page, the link, and updates array of pages
  handleChangePageName = (page) => (event) => {

    const pages = [...this.state.pages];
    let text = event.target.value;

    let index = pages.indexOf(page);
    pages[index].name = text;
    // will update link AFTER the name is fully changed (by hitting save)
    // pages[index].way = "/" + text;
    // window.location.href=pages[index].way;
    this.setState({ pages });
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
    let index = this.state.index;
    index++;
    console.log(index);
    this.setState({index});
    //sets link to the correct page - doesnt keep index state b/c of refreshing the page
    // (prob wanna set link AFTER server calls)
    window.location.href=this.state.pages[index - 1].way;
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

  componentDidMount()
  {
    let url = window.location.href.split('/');
    let index = url.indexOf('pages');
    index += 1;
    index = Number(url[index]);
    Axios.get("http://localhost:3002/api/getFromId/" + index).then((data) =>{
      let page = data.data;
      this.setState({page});
    })
    this.setState({index});
  }

  render() {
    return(

  <div>

{/* only renders 1 page at a time */}
{/* <Routes>
          <Route
            exact
            path={this.state.pages[this.state.index.value - 1].way}
            element={
              <CounterPages
                key={this.state.pages[this.state.index.value - 1].id}
                id={this.state.pages[this.state.index.value - 1].id}
                onAddPage={this.handleAddPage}
                onDeletePage={this.handleDeletePage}
                onNextPage={this.handleNextPage}
                onBackPage={this.handleBackPage}
                pages={this.state.pages}>
              </CounterPages>
            }
          ></Route>
          </Routes> */}


            {/* renders every page at the same time 
          {this.state.pages.map(page => <Route
            path={page.way}
            key= {page.id}
            element={
              <Page
                key={this.state.pages.id}
                id={this.state.pages.id}
                onAddPage={this.handleAddPage}
                onDeletePage={this.handleDeletePage}
                onNextPage={this.handleNextPage}
                onBackPage={this.handleBackPage}
                currentPage={this.state.pages[this.state.index]}
                index={this.state.index}
                onChangePageName = {this.handleChangePageName}
                onGetIndexTop={this.getIndexTop()}
                onGetIndexBottom={this.getIndexBottom()}>
              </Page>
            }
          ></Route>) */}
          <Page
                key={this.state.page.id}
                id={this.state.page.id}
                onAddPage={this.handleAddPage}
                onDeletePage={this.handleDeletePage}
                onNextPage={this.handleNextPage}
                onBackPage={this.handleBackPage}
                currentPage={this.state.page}
                index={this.state.index}
                onChangePageName = {this.handleChangePageName}>
              </Page>
          
        {/* {
          <CounterPages>
            id={this.state.pages[this.state.index - 1].id}
            onAddPage={this.handleAddPage}
            onDeletePage={this.handleDeletePage}
            onNextPage={this.handleNextPage}
            onBackPage={this.handleBackPage}
          </CounterPages>
        } */}
    {/* this is for loading every page at once */}
    {/* <BrowserRouter>
  {this.state.pages.map(page => <CounterPages>
    id={page.id}
    onAddPage={this.handleAddPage}
    onDeletePage={this.handleDeletePage}
    </CounterPages>)}
    </BrowserRouter> */}
  </div>
);
}
}
    export default CounterTop;