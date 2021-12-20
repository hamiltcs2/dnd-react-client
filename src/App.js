import React from 'react';
import Home from "./components/Home";
import Combatants from "./components/Combatants";
import CombatSelect from './components/CombatSelect';
import Combat from './components/Combat';
import Roll from './components/Roll';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route path={"/combatants"} component={Combatants}/>
          {/* <Route path="/combatselect" render={(props) => <Roll {...props}/>}/> */}
          <Route path={"/combatselect"} component={CombatSelect}/>
          <Route path={"/roll"} component={Roll}/>
          <Route path={"/battle"} component={Combat}/>
        </Switch>
      </div>
    </Router>
    )}
}
export default App;