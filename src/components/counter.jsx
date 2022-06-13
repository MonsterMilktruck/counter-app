import React, { Component } from "react";

class Counter extends Component {
  styleNumber = {
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "blue",
  };

  styleZero = {
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "yellow",
  };

  styleButton = {
    fontSize: 15,
    fontWeight: "bold",
  };

  // renderTags() {
  //   if (this.state.tags.length === 0) {
  //     return <p>There are no tags!</p>;
  //   } else {
  //     return (
  //       <ul>
  //         {this.state.tags.map((tag) => (
  //           <li key={tag}>{tag}</li>
  //         ))}
  //       </ul>
  //     );
  //   }
  // }

  render() {
    return (
      <div>
        {this.props.children}
        <span style={this.getStyle()} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        {/* increment button */}
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
           style={this.styleButton}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        {/* decrement button */}
        {this.checkForDisableDecrement()}
        {/* delete button */}
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          style={this.styleButton} 
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
        {/* // {this.renderTags()} */}
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  getStyle() {
    let styles;
    if (this.props.counter.value === 0) {
      styles = this.styleZero;
    } else {
      styles = this.styleNumber;
    }
    return styles;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }

  checkForDisableDecrement() {
    const { value } = this.props.counter;
    if (value === 0) {
      return (
        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          style={this.styleButton}
          className="btn btn-secondary btn-sm"
          disabled
        >
          Decrement
        </button>
      );
    } else {
      return (
        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          style={this.styleButton}
          className="btn btn-secondary btn-sm"
        >
          Decrement
        </button>
      );
    }
  }
}

export default Counter;
