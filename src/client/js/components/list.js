// main-page.js
import React, { Component } from 'react';

// required props: array
// optional props: title
// syntax: <List array={arrayObject} title={titleString} />
export default class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // gets called every time state is updated
    let title = "";
    if (this.props.title) {
      title = <div className="title">{this.props.title}</div>;
    }
    return (
      <div>
        {title}
        <ul>
          {/*
            when displaying an array of elements, use map on the array, and
            you must have the key property (to determine uniqueness)
          */}
          {this.props.array.map((element)=>{
            return <li key={element}>{element}</li>
          })}
        </ul>
      </div>
    )
  }
}
