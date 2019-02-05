import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route,Redirect,withRouter} from 'react-router-dom'
import Group from './group'
import Gallery from './gallery'
import Overview from './overview'


class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log('props',this.props);
    return (
      <BrowserRouter>
      <div >
        {window.location.pathname == "/" ? <Redirect from="/" to="/group" /> : <Redirect  to={window.location.pathname} />  }
        <Route path={"/group"} component={Group} />
        <Route path={"/gallery/:id"} component={Gallery} />
        <Route path={"/overview/:id"} component={Overview} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
