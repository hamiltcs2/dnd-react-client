import React from "react";
import axios from 'axios';
class Combatants extends React.Component {
    state = {
        name: '',
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
        initiative: 0,
        max_hp: 0,
        armor_class: 0,
        passive_perception: 0,
        combatantType: '',
        posts: []
      };
    
      componentDidMount = () => {
        //hello
        this.getCombatant();
      };
    
      getCombatant = () => {
        axios.get('api/combatantsList')
        .then((response) => {
          const data = response.data;
          this.setState({posts:data});
          console.log("Data is: " + data);
          console.log('Data has been received!!!');
        })
        .catch(() => {
          alert('Error retrieving data!!!');
        });
      }
    
      handleChange = ({ target }) => {
        const { name, value } = target;
    
        this.setState({
          [name]: value
        })
      };
      handleRadioButton(value) {
        this.setState({
          combatantType: value
        });
      }
      submit = (event) => {
        event.preventDefault();
        const payload = {
          name: this.state.name,
          strength: this.state.strength,
          dexterity: this.state.dexterity,
          constitution: this.state.constitution,
          intelligence: this.state.intelligence,
          wisdom: this.state.wisdom,
          charisma: this.state.charisma,
          initiative: this.state.initiative,
          max_hp: this.state.max_hp,
          armor_class: this.state.armor_class,
          passive_perception: this.state.passive_perception,
          combatantType: this.state.combatantType
        };
    
        axios({
          url: 'api/combatantSave',
          method: 'POST',
          data: payload
        })
        .then(() => {
          console.log('Data has been sent to the server');
          this.resetUserInputs();
          this.getCombatant();
        })
        .catch(() => {
          console.log('Internal server error');
        });
    
    
      };
    
      resetUserInputs = () => {
        this.setState({
            name: '',
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            initiative: 0,
            max_hp: 0,
            armor_class: 0,
            passive_perception: 0,
            combatantType: ''
        })
      }
    
      displayCombatants = (posts) => {
        if (!posts.length) return null;
        return posts.map((post, index) => (
          <div key={index}>
            <h3>Name: {post.name}</h3>
            <p>Strength: {post.strength}</p>
            <p>Dexterity: {post.dexterity}</p>
            <p>Constitution: {post.constitution}</p>
            <p>Intelligence: {post.intelligence}</p>
            <p>Wisdom: {post.wisdom}</p>
            <p>Charisma: {post.charisma}</p>
            <p>Initiative: {post.initiative}</p>
            <p>Max HP: {post.max_hp}</p>
            <p>Armor Class: {post.armor_class}</p>
            <p>Passive Perception: {post.passive_perception}</p>
            <p>Combatant Type: {post.combatantType}</p>
          </div>
        ));
      };
    
      render() {
        console.log('State: ', this.state)
        //JSX
        return(
          <div>
            <form onSubmit={this.submit}>
            <fieldset>
            <legend>Add a new Combatant</legend>
              <div className="form-input">
                <label style={{marginTop:'0'}}>Name: </label><input 
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Strength: </label><input 
                type="number"
                name="strength"
                placeholder="Strength"
                value={this.state.strength}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Dexterity: </label><input 
                type="number"
                name="dexterity"
                placeholder="Dexterity"
                value={this.state.dexterity}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Constitution: </label><input 
                type="number"
                name="constitution"
                placeholder="Constitution"
                value={this.state.constitution}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Intelligence: </label><input 
                type="number"
                name="intelligence"
                placeholder="Intelligence"
                value={this.state.intelligence}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Wisdom: </label><input 
                type="number"
                name="wisdom"
                placeholder="Wisdom"
                value={this.state.wisdom}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Charisma: </label><input 
                type="number"
                name="charisma"
                placeholder="Charisma"
                value={this.state.charisma}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Initiative: </label><input 
                type="number"
                name="initiative"
                placeholder="Initiative"
                value={this.state.initiative}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Max HP: </label><input 
                type="number"
                name="max_hp"
                placeholder="Max HP"
                value={this.state.max_hp}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Armor Class: </label><input 
                type="number"
                name="armor_class"
                placeholder="Armor Class"
                value={this.state.armor_class}
                onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
              <label>Passive Perception: </label><input 
                type="number"
                name="passive_perception"
                placeholder="Passive Perception"
                value={this.state.passive_perception}
                onChange={this.handleChange}
                />
              </div>
              <div style={{margin:'1em 0 0 0'}}>
              <div style={{marginLeft:'0'}} className="radio">
                  <label>
                      <input 
                      type="radio"
                      value={this.state.combatantType}
                      checked={this.state.combatantType === 'Player'}
                      onChange={() => this.handleRadioButton('Player')}
                      />
                      Player
                  </label>
              </div>
              <div style={{marginLeft:'1.5em', marginRight: '0'}} className="radio">
                  <label>
                      <input 
                      type="radio"
                      value={this.state.combatantType}
                      checked={this.state.combatantType === 'Monster'}
                      onChange={() => this.handleRadioButton('Monster')}
                      />
                      Monster
                  </label>
              </div>
              </div>
              <button className="submit-button" style={{margin:'1em 0'}}>Submit</button>
              </fieldset>
            </form>
              <div className="combatants">
                {this.displayCombatants(this.state.posts)}
              </div>
          </div> 
        );
      };
}
export default Combatants;