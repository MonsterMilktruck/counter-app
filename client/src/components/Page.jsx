import React, { Component } from "react";
import Counters from "./counters";
import NavBar from "./navbar";
import Axios from 'axios';
class Page extends Component {

  styleButton = {
    fontSize: 15,
    fontWeight: "bold",
  };


  state = {
    counters: [
      { counterID: 1, value: 0, Cname: "Counter #1" , pid: this.props.pageID},
      { counterID: 2, value: 0, Cname: "Counter #2" , pid: this.props.pageID},
      { counterID: 3, value: 0, Cname: "Counter #3" , pid: this.props.pageID},
      { counterID: 4, value: 0, Cname: "Counter #4" , pid: this.props.pageID},
    ],
    edit: false,
  };

  //deletes a counter
  handleDelete = (counterId) => {
    Axios.delete("http://localhost:3002/api/delete/counter/" + this.props.pageID + "/" + counterId);
    const counters = this.state.counters.filter((c) => c.counterID !== counterId); // filters anything but the one to delete
    for (let i = 0; i < counters.length; i++) {
      counters[i].id = i + 1;
    }
    this.setState({ counters }); // gives current version of counters
  };

  //increments a specified counter
  handleIncrement = (counter) => {
    const counters = [...this.state.counters]; //clones array
    const index = counters.indexOf(counter); //gets index of one to change
    counters[index] = { ...counter }; // gets index at location and clones it to a variable
    counters[index].value++; // incremenets varable by 1
    this.setState({ counters }); //sets the current version of counters
  };

  //resets all counters to zero
  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  //decrements a specified counter
  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    if (counters[index].value !== 0) {
      counters[index].value--;
    }
    this.setState({ counters });
  };

  //adds a counter
  handleAdd = () => {
    const counters = [...this.state.counters];
    let nextID = 0;
    Axios.get("http://localhost:3002/api/lastCounter").then((data) =>{
      nextID = data.data[0]["max(counterID)"] + 1;
    
    const tempCounter = {
      counterID: nextID,
      value: 0,
      Cname: "Counter" + (counters.length + 1),
      pid: this.props.pageID
    };
    Axios.post("http://localhost:3002/api/create/counter/" + tempCounter["Cname"] + "/" + tempCounter["counterID"] + "/" + tempCounter["pid"]);
    counters.push(tempCounter);
    this.setState({ counters });
  });
};

  //switches mode to Edit so names can be changed
  handleEditMode = () => {
    let edit = !this.state.edit;
    if(edit === false)
    {
      let payload = {name: this.props.currentPage.Tname, 
      pageID: this.props.pageID, 
      uid: this.props.currentPage.uid, 
      length: this.state.counters.length, 
      counters: this.state.counters};
      Axios.put("http://localhost:3002/api/updateNames", payload);
    }
    this.setState({ edit });
  };

  //switches mode to Edit so names can be changed
  handleTextChange = (counter) => (event) => {
    let counters = [...this.state.counters];
    let index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].Cname = event.target.value;
    this.setState({counters});
  };

  componentDidMount()
  {
    Axios.get("http://localhost:3002/api/getCounters/" + this.props.pageID).then((data) =>{
      let counters = data.data;
      console.log(counters)
      this.setState({counters});
    })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
          pageName ={this.props.currentPage.Tname}
          nextPage = {this.props.onNextPage}
          backPage = {this.props.onBackPage}
          onGetIndexBottom = {this.props.onGetIndexBottom}
          onGetIndexTop = {this.props.onGetIndexTop}
          page ={this.props.currentPage}
          onChangePageName={this.props.onChangePageName}
          editable={this.state.edit}
        />
        <main className="container">

          {/* displays counters */}
          <Counters
            key={this.props.counterID}
            counters={this.state.counters}
            editable={this.state.edit}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onTextChange={this.handleTextChange}
            onDelete={this.handleDelete}
            onAdd={this.handleAdd}
          />

          {/* edit text button */}
          <button
          onClick={this.handleEditMode}
           style={this.styleButton}
          className={this.isEditView()}
        >{this.isEdit()}</button>
        </main>
      </React.Fragment>
    );
  }

  //displays edit or save on the button based on state
  isEdit()
  {
    if(this.state.edit)
    {
      return ("Save");
    }
    else{
      return ("Edit");
    }
  }

  //displays different styles on the button based on state
  isEditView()
  {
    let value = "btn btn-outline-"
    if(this.state.edit)
    {
      value += "success";
    }
    else{
      value += "info";
    }
    return (value);
  }


  // componentDidMount()
// {
//     //make an ajax call / do server stuffs
// }

}

export default Page;
