import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
//class Roll extends React.Component {
  const Roll = (props) => {
    const history = useHistory();;  
    // state = {
    //     num: [],
    //     fighters: [],
    //     posts: [],
    //     auto: []
    //   };
    
      // componentDidMount = () => {
      //   this.getRoll();
      // };
    
      const [num, setNum]=useState([]);
      const [fighters]=useState([]);
      let [posts, setPosts]=useState([]);
      let [id, setId]=useState("");
      const [auto]=useState([]);
      //getRoll = () => {
      useEffect(() =>{
        // const search = window.location.search;
        // const params = new URLSearchParams(search);
        console.log("hello there");
        console.log(props.location.state)
        // const IDFromURL = Object.fromEntries(params.entries());
        axios.get('api/roll', {
        params: {
           // _id: IDFromURL._id
           _id: String(props.location.state)
        }})
        .then((response) => {
        //const data = response.data;
          //this.setState({posts:data.fighters});
          setPosts(response.data.fighters);
          setId(response.data._id);
          console.log(response.data);
          console.log("yes");
          console.log(response.skirmish);
          //console.log(posts);
          console.log("hello");
          //console.log(this.state.posts);
          //for (var i = 0; i < this.state.posts.length; i++) {
          for (var i=0; i<response.data.fighters.length; i++) {
            console.log(i);
            num.push(0);
            //this.state.num.push(0);
            //if(this.state.posts[i].combatantType === 'monster') {
            if(response.data.fighters[i].combatantType === 'monster') {
                //this.state.auto.push(false);
                auto.push(false);
            } else {
                //this.state.auto.push(true);
                auto.push(true);
            }
          }
          //console.log(this.state.auto);
          console.log('Data has been received!!!');
        })
        .catch((err) => {
          console.log(err);
        });
      }, [auto, num, props.location.state]);

      //handleChange(event, index) {
      const handleChange = (event, index) => {
        //let items = [...this.state.num];
        let items = num;
        //let item = {...items[index]};
        let item = num[index];
        //item = event.target.value;
        item = event;
        items[index]=item;
        //this.setState({num:items});
        setNum(items);
      };

      //submit = (event) => {
      const submit = (event) => {
        event.preventDefault();
        //for (var i = 0; i < this.state.posts.length; i++) {
        for (var i=0; i<posts.length; i++) {
            //if (this.state.num[i] > 0) {
            if(num[i] > 0) {
                // this.state.fighters.push({
                //     fighter_id: this.state.posts[i]._id,
                //     name: this.state.posts[i].name,
                //     roll: Number(this.state.num[i])
                // })
                fighters.push({
                  fighter_id: posts[i]._id,
                  name: posts[i].name,
                  roll: Number(num[i])
                })
            } else {
                //var roll = this.state.posts[i].initiative + Math.floor(Math.random() *20) + 1;
                var roll = posts[i].initiative + Math.floor(Math.random() * 20) + 1;
                // this.state.fighters.push({
                //     fighter_id: this.state.posts[i]._id,
                //     name: this.state.posts[i].name,
                //     roll: roll
                // })  
                fighters.push({
                  fighter_id: posts[i]._id,
                  name: posts[i].name,
                  roll: roll
                })
            }

        }
        // const search = this.props.location.search;
        // const params = new URLSearchParams(search);
        // const IDFromURL = Object.fromEntries(params.entries());
        const payload = {
            //fighters: this.state.fighters,
            fighters: fighters,
            battle_id: id
        };

        axios({
          url: 'api/rollSave',
          method: 'POST',
          data: payload
        })
        .then((response) => {
            //window.location.href = response.data.redirect + `${response.data._id}`;
            history.push('/battle?_id='+response.data._id);
          console.log('Data has been sent to the server');
          //this.resetUserInputs();
          //this.getRoll();
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
      // displayCombatants = (posts) => {
      // };
      // <td class="actions">
      //         <a a href="combatants/view?_id={{ this._id }}"><button  type="button" class="btn btn-primary">View</button></a>
		  //       </td>

        //JSX
        return(
    <div className="roll-container">
      <form onSubmit={submit}>
        <table className="content-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="hide">Strength</th>
                    <th className="hide">Dexterity</th>
                    <th className="hide">Constitution</th>
                    <th className="hide">Intelligence</th>
                    <th className="hide">Wisdom</th>
                    <th className="hide">Charisma</th>
                    <th className="hide">Initiative</th>
                    <th className="hide">Max HP</th>
                    <th className="hide">Armor Class</th>
                    <th className="hide">Passive Perception</th>
                    <th className="hide">Combatant Type</th>
                    <th>Roll</th>
                </tr>
            </thead>
            <tbody>
              {/* {this.displayCombatants(this.state.posts)} */}
              {/* {if (!posts.length) return null; */}
        {posts.map((post, index) => (
          <tr key={index} data={post}>
            <td>{post.name}</td>
            <td className="hide">{post.strength}</td>
            <td className="hide">{post.dexterity}</td>
            <td className="hide">{post.constitution}</td>
            <td className="hide">{post.intelligence}</td>
            <td className="hide">{post.wisdom}</td>
            <td className="hide">{post.charisma}</td>
            <td className="hide">{post.initiative}</td>
            <td className="hide">{post.max_hp}</td>
            <td className="hide">{post.armor_class}</td>
            <td className="hide">{post.passive_perception}</td>
            <td className="hide">{post.combatantType}</td>
            <td>
            <div className="select-input">
                {/* { this.state.auto[index] ? ( */}
            <input
                type="number" 
                name='selected'
                min="1" 
                step="1" 
                placeholder="5"
                //value = {this.state.num[index] || ''}
                //onChange={(event) => this.handleChange(event, index)}
                onChange={e => handleChange(e.target.value, index)}
            /> 
            {/* ) : (
                 <div>auto</div>
             )} */}
            </div>
            </td>
          </tr>
        ))}
            </tbody>
        </table>
        <button className="submit-button">Submit</button>
        {/* <input className = "submit-button" type="submit" value="Submit"/> */}
      </form>
    </div>
        );
}
export default Roll;