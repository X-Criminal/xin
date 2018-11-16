import React, { Component }  from 'react';
import Login                 from "./jsx/login.js";
import Home                  from "./jsx/Home.js"
import cookie                from "react-cookies";

import './App.css';
import "antd/dist/antd.css";
import "./css/_home.css"

class App extends Component {
  constructor(props){
    super(props)
    this.state={
        islogin:false,
    }
  }
  componentWillMount(){
    sessionStorage.setItem("url","https://www.znx158.com/");
      if(cookie.load("userData")){
        this.setState({
          islogin:true,
        })
    }else{
      this.setState({
        islogin:false,
      })
    }
  }
  componentDidMount(){
     
  }
  login=( )=>{
    this.setState({
        islogin:true,
    })
  }
  render() {
    return (
          <div id={"App"}>
            <Router login={this.login} islogin={this.state.islogin}/>
         </div>
    );
  }
}

export default App;

function Router(props){
  if(props.islogin){
     return <Home />
  }else{
    return <Login login={props.login}/>
  }
}