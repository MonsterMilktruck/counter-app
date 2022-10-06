import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import "./random.css";

class NavBar extends Component {
  styleButton = {
    fontSize: 15,
    fontWeight: "bold",
  };

  render() {
    return (
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Total counters activated:</a>
          <span
            style={this.styleButton}
            className="badge badge-pill badge-secondary"
          >
            {this.props.totalCounters}
          </span>
          <form className="d-flex" role="search">
            <h1 className="tab">
              <ContentEditable
                className="editable"
                html={this.props.pageName}
                disabled={!this.props.editable}
                onChange={this.props.onChangePageName(this.props.page)}
              />
              {/* back page button */}
        <button
          onClick={this.props.backPage}
           style={this.styleButton}
           disabled={this.props.onGetIndexBottom}
          className="btn btn-secondary btn-sm"
        >back</button>

          {/* next page button */}
        <button
          onClick={this.props.nextPage}
           style={this.styleButton}
           disabled={this.props.onGetIndexTop}
          className="btn btn-secondary btn-sm"
        >next</button>
            </h1>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default NavBar;
