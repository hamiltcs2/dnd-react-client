import React from 'react';
import Home from "./components/Home";
import Combatants from "./components/Combatants";
import CombatSelect from './components/CombatSelect';
import Combat from './components/Combat';
import Roll from './components/Roll';
import Nav from './components/Nav';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './style/index.css';
class App extends React.Component {
  // constructor() {
  //   super();
  // }
  render() {
    return(
    <Router>
      <div className="App">
      <header className="App-header">
        <Nav/>
      </header>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route exact path={"/combatants"} component={Combatants}/>
          {/* <Route path="/combatselect" render={(props) => <Roll {...props}/>}/> */}
          <Route exact path={"/combatselect"} component={CombatSelect}/>
          {/* <Route exact path={"/rolls"} component={ () => <Roll />}/> */}
          <Route exact path={"/rolls"} component={Roll}/>
          <Route exact path={"/battle"} component={Combat}/>
        </Switch>
      </div>
    </Router>
    )}
}
export default App;