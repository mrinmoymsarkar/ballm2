import React, { Component} from "react";
import MoveBall from "./MoveBall/MoveBall";

class App extends React.Component {


  render() {
    return(
        <div>
          <div>
            <MoveBall
            radius = {12}
            x = {480}
            y = {320}

            />
          </div>
        </div>
    )
  }
}


export  default  App;


