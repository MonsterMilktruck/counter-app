import React, { Component } from "react";
import Counter from "./counter";
import ContentEditable from "react-contenteditable";
import "./random.css";

class Counters extends Component {
  state = {
    value: 0,
  };
  yes = (event) => {
    // let {input} = document.getElementById('phone').value;
    let value = event.target.value;
    this.setState({ value });
    // return input
  };

  render() {
    return (
      <div>
        {/* <label>
          Input phone number: {this.outputPhoneNumber()}
        </label>
        <input
          className="form-control me-2"
          onChange={this.yes}
          type="range"
          class="slider-width"
          id="phone"
          min="0000000000"
          max="9999999999"
        ></input> */}
        
        <button
          onClick={this.props.onReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {this.props.counters.map((counter) => (
          <Counter
            key={counter.counterID}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            counter={counter}
          >
            <h4><ContentEditable className="editable" html={counter.Cname} disabled={!this.props.editable} onChange={this.props.onTextChange(counter)}/></h4>
          </Counter>
        ))}

        {/* add counter button */}
        <button
          onClick={this.props.onAdd}
          className="btn btn-success btn-lg m-2"
        >
          Add
        </button>
      </div>
    );
  }

  //formats phone number from integer variable
  outputPhoneNumber()
  {
    let phoneNumber;
    let val = this.state.value.toString();

    //pads front with zeros
    if(val.length !== 10)
    {
      for(let i = val.length; i < 10; i++)
      {
        val = "0" + val;
      }
    }

    phoneNumber = "(" + val.substring(0,3) + ") " + val.substring(3,6) + "-" + val.substring(6);
    
    return phoneNumber;
  }
}

export default Counters;
