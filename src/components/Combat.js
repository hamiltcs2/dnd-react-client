import React from "react";
import axios from 'axios';
class Combat extends React.Component {
    
    state = {
        num: [],
        fighters: [],
        posts: []
      };
    
      componentDidMount = () => {
        this.getBattle();
      };
    
      
      getBattle = () => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const IDFromURL = Object.fromEntries(params.entries());
        axios.get('api/battle', {
            params: {
                _id: IDFromURL._id
            }
        })
        .then((response) => {
          const data = response.data;
          this.setState({posts:data});
          this.setState({fighters:data.fighters});

          console.log(this.state.posts);
          console.log(this.state.fighters);

          var tempArray = this.state.fighters;
          this.setState({fighters:tempArray.sort((firstItem, secondItem) => secondItem.roll - firstItem.roll)});
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
        //console.log(event.target);
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
          url: 'api/battleSave',
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

      spacePress = (event) => {
        event.preventDefault();

      }
    
      resetUserInputs = () => {
        this.setState({
          num: [],
          fighters: []
        })
      };
      displayCombatants = (posts) => {
        if (!posts.length) return null;
        return posts.map((post, index) => (
          <tr key={index}  onKeyPress={this.spacePress}>
            <td>{post.name}</td>
            <td>{post.roll}</td>
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
      <form>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Initiative</th>
                </tr>
            </thead>
            <tbody>
              {this.displayCombatants(this.state.fighters)}
            </tbody>
        </table>
        {/* <button>Submit</button> */}
      </form>
    </div>
        );
      };
}
export default Combat;