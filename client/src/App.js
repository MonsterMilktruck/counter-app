// import logo from "./logo.svg";
import "./App.css";
import CounterTop from "./components/counterTop";
import { BrowserRouter, Routes, Route, Link, useNavigate, navigate, Redirect} from "react-router-dom";
import React, { Component } from "react";


// manages view

function App() {

    return (
      // <BrowserRouter>
      // <div>
      //   <Routes>
      //     <Route path = 'counters' element=
      // {<CounterTop/>}>
      // </Route>
      // </Routes>
      // </div>
      // </BrowserRouter>
      <CounterTop/>
    );
  

}

export default App;