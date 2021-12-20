import React from "react";
import axios from 'axios';
class CombatSelect extends React.Component {
    
    state = {
        num: [],
        fighters: [],
        posts: [],
      };
    
      componentDidMount = () => {
        this.getCombatant();
      };
    
      
      getCombatant = () => {
        axios.get('https://dnd-react.herokuapp.com/api/combatantsList')
        .then((response) => {
          const data = response.data;
          this.setState({posts:data});
          for (var i = 0; i < this.state.posts.length; i++) {
            this.state.num.push(0);
          }
          console.log('Data has been received!!!');
        })
        .catch(() => {
          alert('Error retrieving data!!!');
        });
      };

      handleChange(event, index) {
        //console.log("event is "+event.target.value)
        //console.log("index is"+index)
        let items = [...this.state.num];
        let item = {...items[index]};
        item = event.target.value;
        items[index]=item;
        this.setState({num:items});
      };

      submit = (event) => {
        event.preventDefault();
        console.log(this.state.num);
        for (var i = 0; i < this.state.posts.length; i++) {
          if(this.state.num[i] > 0) {
            for (var k = 0; k < this.state.num[i]; k++) {
              this.state.fighters.push(this.state.posts[i]);
            }
          }
        }
        const payload = {
          fighters: this.state.fighters
        };
        
        axios({
          url: 'https://dnd-react.herokuapp.com/api/battleSave',
          method: 'POST',
          data: payload
        })
        .then((response) => {
          window.location.href = response.data.redirect + `${response.data._id}`;
          console.log('Data has been sent to the server');
          //this.resetUserInputs();
          //this.getCombatant();
        })
        .catch(() => {
          console.log('Internal server error');
        });
    
    
      };
    
      resetUserInputs = () => {
        this.setState({
          num: [],
          fighters: []
        })
      };
      displayCombatants = (posts) => {
        if (!posts.length) return null;
        return posts.map((post, index) => (
          <tr key={index}>
            <td>{post.name}</td>
            <td>{post.strength}</td>
            <td>{post.dexterity}</td>
            <td>{post.constitution}</td>
            <td>{post.intelligence}</td>
            <td>{post.wisdom}</td>
            <td>{post.charisma}</td>
            <td>{post.initiative}</td>
            <td>{post.max_hp}</td>
            <td>{post.armor_class}</td>
            <td>{post.passive_perception}</td>
            <td>{post.combatantType}</td>
            <td>
              <div className="form-input">
                <input 
                  type="number" 
                  name='selected'
                  min="1" 
                  step="1" 
                  placeholder="5"
                  value = {this.state.num[index] || ''}
                  onChange={(event) => this.handleChange(event, index)}
                />
              </div>
            </td>
          </tr>
        ));
      };
      // <td class="actions">
      //         <a a href="combatants/view?_id={{ this._id }}"><button  type="button" class="btn btn-primary">View</button></a>
		  //       </td>

      render() {
        console.log('State: ', this.state)
        //JSX
        return(
    <div className="combat-container">
      <form onSubmit={this.submit}>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Strength</th>
                    <th>Dexterity</th>
                    <th>Constitution</th>
                    <th>Intelligence</th>
                    <th>Wisdom</th>
                    <th>Charisma</th>
                    <th>Initiative</th>
                    <th>Max HP</th>
                    <th>Armor Class</th>
                    <th>Passive Perception</th>
                    <th>Combatant Type</th>
                </tr>
            </thead>
            <tbody>
              {this.displayCombatants(this.state.posts)}
            </tbody>
        </table>
        <button>Submit</button>
      </form>
    </div>
        );
      };
}
export default CombatSelect;