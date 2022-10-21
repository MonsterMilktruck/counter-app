// import logo from "./logo.svg";
import "./App.css";
import CounterTop from "./components/counterTop";
import Home from "./components/home";
import AllPagesDisplay from "./components/allPagesDisplay";
import Landing from "./components/landing";
import { BrowserRouter, Routes, Route, Link, useNavigate, navigate, Redirect} from "react-router-dom";
import React, { Component } from "react";
import Page from "./components/Page";


// manages view

function App() {

    return (
      /* <BrowserRouter>
      // <div>
      //   <Routes>
      //     <Route path = 'counters' element=
       <CounterTop/>/*
      // </Route>
      // </Routes>
      // </div>
       </BrowserRouter>
       <Route index element={<User />} /> 
       <Route path="/" element={<Landing />} />
       <Route path="allPages" element={<allPages />}/> */

       //add home for login too
       <BrowserRouter>
       <Routes>
           <Route path="" element={<Landing />} />
           <Route path="home" element={<Home />} />
           <Route exact path="pages" element={<AllPagesDisplay />}/>
           <Route path="pages/:id" element={<CounterTop />} />
       </Routes>
     </BrowserRouter> 
    );
  

}

export default App;