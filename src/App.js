import React, { Component} from "react";
import MoveBall from "./MoveBall/MoveBall";

class App extends React.Component {


  render() {
    return(
        <div>
          <div>
            <MoveBall
            radius = {12}
            x = {100}
            y = {60}
            width = {480}
            height = {320}
            />
          </div>
        </div>
    )
  }
}


export  default  App;


