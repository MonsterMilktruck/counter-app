import React, { Component } from "react";
import Counters from "./counters";
import NavBar from "./navbar";

class CounterPages extends Component {

  styleButton = {
    fontSize: 15,
    fontWeight: "bold",
  };


  state = {
    counters: [
      { id: 1, value: 0, name: "Counter #1" },
      { id: 2, value: 0, name: "Counter #2" },
      { id: 3, value: 0, name: "Counter #3" },
      { id: 4, value: 0, name: "Counter #4" },
    ],
    edit: false,
  };

  //deletes a counter
  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId); // filters anything but the one to delete
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
    const tempCounter = {
      id: counters.length + 1,
      value: 0,
      name: "Counter #" + (counters.length + 1),
    };
    counters.push(tempCounter);
    this.setState({ counters });
  };

  //switches mode to Edit so names can be changed
  handleEditMode = () => {
    let edit = !this.state.edit;
    this.setState({ edit });
  };

  //switches mode to Edit so names can be changed
  handleTextChange = (counter) => (event) => {
    let counters = [...this.state.counters];
    let index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].name = event.target.value;
    this.setState({counters});
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
          pageName ={this.props.currentPage.name}
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
            key={this.props.id}
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

export default CounterPages;
