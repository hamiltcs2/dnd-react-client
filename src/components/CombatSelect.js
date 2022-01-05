import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
//class CombatSelect extends React.Component {
  const CombatSelect = () => {
    const history = useHistory();
    
    // state = {
    //     num: [],
    //     fighters: [],
    //     posts: [],
    //   };
    const [num, setNum]=useState([]);
    const [fighters]=useState([]);
    let [posts, setPosts]=useState([]);
    
      // componentDidMount = () => {
      //   this.getCombatant();
      // };
    useEffect(() =>{
      // getCombatant();
      axios.get('api/combatantsList')
        .then((response) => {
          //this.setState({posts:data});
          setPosts(response.data);
          // for (var i = 0; i < this.state.posts.length; i++) {
          //   this.state.num.push(0);
          // }
          for (var i=0; i<posts.length; i++) {
            num.push(0);
          }
          console.log('Data has been received!!!');
        })
        .catch(() => {
          alert('Error retrieving data!!!');
        });
    }, [num, posts.length]);
      
      // const getCombatant = () => {
        
      // };

      //handleChange(event, index) {
      const handleChange = (event, index) => {
        console.log("hi");
        //let items = [...this.state.num];
        let items = num;
        //let item = {...items[index]};
        let item = num[index];
        //item = event.target.value;
        item = event;
        items[index]=item;
        //this.setState({num:items});
        setNum(items);
        //console.log(num);
      };

      //submit = (event) => {
      const submit = (event) => {
        console.log("the best");
        event.preventDefault();
        //console.log(this.state.num);
        //for (var i = 0; i < this.state.posts.length; i++) {
        for (var i = 0; i< posts.length; i++) {
          //if(this.state.num[i] > 0) {
          if(num[i] > 0) {
            //for (var k = 0; k < this.state.num[i]; k++) {
              for(var k = 0; k < num[i]; k++) {
              //this.state.fighters.push(this.state.posts[i]);
              fighters.push(posts[i]);
            }
          }
        }
        const payload = {
          //fighters: this.state.fighters
          fighters: fighters
        };
        
        axios({
          url: 'api/battleSave',
          method: 'POST',
          data: payload
        })
        .then((response) => {
          console.log(response.data.redirect);
          console.log(response.data._id);
          console.log(window.location.origin);
          console.log(window.location);
          console.log(window.location.href);
          //window.location.href = response.data.redirect + `${response.data._id}`;
          history.push('/rolls', response.data._id);
          //window.location.href = window.location.origin + '/api/roll/?_id=' + `${response.data._id}`;
          //window.location.href = 'http://localhost:3000/roll/?_id=61c163f089de6d108d5b3209'
          //window.location.replace(window.location.origin + response.data.redirect + `${response.data._id}`);
          console.log('Data has been sent to the server');
          //this.resetUserInputs();
          //this.getCombatant();
        })
        .catch(() => {
          console.log('Internal server error');
        });
    
    
      };
    
      // resetUserInputs = () => {
      //   this.setState({
      //     num: [],
      //     fighters: []
      //   })
      // };

      //const displayCombatants = (posters) => {
        
      //};

      // <td class="actions">
      //         <a a href="combatants/view?_id={{ this._id }}"><button  type="button" class="btn btn-primary">View</button></a>
		  //       </td>

      //render() {
        //console.log('State: ', this.state)
        //JSX
        return(
    <div className="combat-container">
      {/* <form onSubmit={this.submit}> */}
      <form onSubmit={submit}>
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
              {/* {this.displayCombatants(this.state.posts)} */}
              {/* {displayCombatants(posts)} */}
              {/* if (!posters.length) return null; */}
        {/* posters.map((post, index) => ( */}
          {console.log(posts.length)}
          {posts.map((post, index) => (
          <tr key={index} data={post}>
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
                  //value = {this.state.num[index] || ''}
                  //value = {num[index] || ''}
                  // onChange={(event) => this.handleChange(event, index)}
                  onChange={e => handleChange(e.target.value, index)}
                />
              </div>
            </td>
          </tr>
        ))}
            </tbody>
        </table>
        {/* <button>Submit</button> */}
        <input type="submit" value="Submit"/>
      </form>
    </div>
        );
      //};
}
export default CombatSelect;