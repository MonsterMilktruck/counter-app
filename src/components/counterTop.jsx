
import CounterPages from "./counterPages";
import { BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";
import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

class CounterTop extends Component {

state = {
    pages: [
      { id: 1, name: "page #1", way: "/page1" },
      { id: 2, name: "page #2", way: "/page2" },
    ],
    index: {value: 1},
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
    for (let i = 0; i < pages.length; i++) {
      pages[i].id = i + 1;
    }
    this.setState({ pages });
  };

  //cycles forward a page to the next counter
  handleNextPage = () => {
    let index = this.state.index;
    index.value++;
    console.log(index);
    this.setState({index});
    //sets link to the correct page - doesnt keep index state b/c of refreshing the page
    // (prob wanna set link AFTER server calls)
    window.location.href=this.state.pages[index.value - 1].way;
  };

  //cycles back a page to the previous counter
  handleBackPage = () => {
    let index = this.state.index;
    index.value--;
    console.log(index);
    this.setState({index});
    //sets link to the correct page (prob wanna set link AFTER server calls)
    window.location.href=this.state.pages[index.value - 1].way;
  };

    render() {
        return(
      <BrowserRouter>
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


                {/* renders every page at the same time */}
              <Routes>
              {this.state.pages.map(page => <Route
                exact
                path={page.way}
                key= {page.id}
                element={
                  <CounterPages
                    key={page.id}
                    id={page.id}
                    onAddPage={this.handleAddPage}
                    onDeletePage={this.handleDeletePage}
                    onNextPage={this.handleNextPage}
                    onBackPage={this.handleBackPage}
                    currentPage={page}
                    index={this.state.index}
                    onChangePageName = {this.handleChangePageName}
                    onGetIndexTop={this.getIndexTop()}
                    onGetIndexBottom={this.getIndexBottom()}>
                  </CounterPages>
                }
              ></Route>)}
              </Routes>

              
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
      </BrowserRouter>
    );
    }
    getIndexTop()
    {
      let val = false;
      if(this.state.index.value === this.state.pages.length)
      {
        val = true;
      }
      return val;
    }

    getIndexBottom()
    {
      let val = false;
      if(this.state.index.value === 1)
      {
        val = true;
      }
      return val;
    }
}
    export default CounterTop;