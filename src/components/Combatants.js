import axios from 'axios';
import {useState, useEffect, React} from "react";
// class Combatants extends React.Component {
  const Combatants = () => {
    // state = {
    //     name: '',
    //     strength: 0,
    //     dexterity: 0,
    //     constitution: 0,
    //     intelligence: 0,
    //     wisdom: 0,
    //     charisma: 0,
    //     initiative: 0,
    //     max_hp: 0,
    //     armor_class: 0,
    //     passive_perception: 0,
    //     combatantType: '',
    //     posts: []
    //   };
    // const { loading, error, data } = useQuery(GET_MONSTERS);
    //       console.log(loading);
    //       console.log(error);
    //       console.log(data);
    const [combatant, setCombatant]=useState({
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
    });
    const [query, setQuery]=useState({
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
    });
    const [posts, setPosts]=useState([]);
    const [filteredPosts, setFilteredPosts]=useState([]);
    const [queryRadio, setQueryRadio] = useState({Player: false, Monster: false});
    
      // componentDidMount = () => {
      //   this.getCombatant();
      // };

      useEffect(() => {      
        axios.get('api/combatantsList')
        .then((response) => {
          const data = response.data;
          setFilteredPosts(data);
          setPosts(data);
          // console.log("Data is: " + data);
          console.log('Data has been received!!!');
        })
        .catch(() => {
          alert('Error retrieving data!!!');
        });
      }, []);

      const getCombatant = () => {
        axios.get('api/combatantsList')
        .then((response) => {
          const data = response.data;
          // this.setState({posts:data});
          setPosts(data);
          //setFilteredPosts(data);
          console.log("Data is: " + data);
          console.log('Data has been received!!!');
        })
        .catch(() => {
          alert('Error retrieving data!!!');
        });
      }
    
      // handleChange = ({ target }) => {
      const handleChange = (event, value) => {
        // const { name, value } = target;
    
        // this.setState({
        //   [name]: value
        // })
        setCombatant(previousState => {
          return { ...previousState, [event]: value}
        })
      };

      const handleQueryChange = (event, value) => {
        if (value) {
          if (queryRadio.Monster === true) {
            let result = posts.filter(post => post.combatantType === "Monster");
            result = result.filter(post => post.name.toUpperCase().includes(value.toUpperCase()));
            setFilteredPosts(result);
          }
          else if (queryRadio.Player === true) {
            let result = posts.filter(post => post.combatantType === "Player");
            result = result.filter(post => post.name.toUpperCase().includes(value.toUpperCase()));
            setFilteredPosts(result);
          }
          else {
            const result = posts.filter(post => post.name.toUpperCase().includes(value.toUpperCase()));
            setFilteredPosts(result);
          }
        }
        else {
          setFilteredPosts(posts);
        }
        setQuery(previousState => {
          return { ...previousState, [event]: value}
        })
      };

      // handleRadioButton(value) {
      const handleRadioButton = (value) => {
        // this.setState({
        //   combatantType: value
        // });
        setCombatant(previousState => {
          return { ...previousState, combatantType: value}
        })
      }

      const handleQueryRadioButton = (e) => {
        if (e) {
            if (query.name) {
              let result = posts.filter(post => post.combatantType === e.target.value);
              result = result.filter(post => post.name.toUpperCase().includes(query.name.toUpperCase()));
              setFilteredPosts(result);
            }
            else {
              const result = posts.filter(post => post.combatantType === e.target.value);
              setFilteredPosts(result);
            }
          }
          else {
            setFilteredPosts(posts);
          }
        setQuery(previousState => {
          return { ...previousState, combatantType: e.target.value}
        })
        setQueryRadio(() => {
          return {
            Player: false,
            Monster: false,
            [e.target.value]: true
          };
        });
      }

      // submit = (event) => {
        const submit = (event) => {
        event.preventDefault();
        const payload = {
          name: combatant.name,
          strength: combatant.strength,
          dexterity: combatant.dexterity,
          constitution: combatant.constitution,
          intelligence: combatant.intelligence,
          wisdom: combatant.wisdom,
          charisma: combatant.charisma,
          initiative: combatant.initiative,
          max_hp: combatant.max_hp,
          armor_class: combatant.armor_class,
          passive_perception: combatant.passive_perception,
          combatantType: combatant.combatantType
        };
    
        axios({
          url: 'api/combatantSave',
          method: 'POST',
          data: payload
        })
        .then(() => {
          console.log('Data has been sent to the server');
          // this.resetUserInputs();
          resetUserInputs();
          getCombatant();
        })
        .catch(() => {
          console.log('Internal server error');
        });
    
    
      };

      const search = (event) => {
        event.preventDefault();
      }
    
      // resetUserInputs = () => {
      const resetUserInputs = () => {
        // this.setState({
        setCombatant({
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
        });
      }
    
      // displayCombatants = (posts) => {
      const displayCombatants = (filteredPosts) => {
        if (!filteredPosts.length) return null;
        return filteredPosts.map((post, index) => (
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
    
      // render() {
        // console.log('State: ', this.state)
        //JSX
        return(
          <div>
            {/* <form onSubmit={this.submit}> */}
            <form onSubmit={submit}>
            <fieldset>
            <legend>Add a new Combatant</legend>
              <div className="form-input">
                <label style={{marginTop:'0'}}>Name: </label><input 
                type="text"
                name="name"
                placeholder="Name"
                // value={this.state.name}
                // onChange={this.handleChange}
                value={combatant.name}
                onChange={e => handleChange("name", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Strength: </label><input 
                type="number"
                name="strength"
                placeholder="Strength"
                // value={this.state.strength}
                // onChange={this.handleChange}
                value={combatant.strength}
                onChange={e => handleChange("strength", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Dexterity: </label><input 
                type="number"
                name="dexterity"
                placeholder="Dexterity"
                // value={this.state.dexterity}
                // onChange={this.handleChange}
                value={combatant.dexterity}
                onChange={e => handleChange("dexterity", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Constitution: </label><input 
                type="number"
                name="constitution"
                placeholder="Constitution"
                // value={this.state.constitution}
                // onChange={this.handleChange}
                value={combatant.constitution}
                onChange={e => handleChange("constitution", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Intelligence: </label><input 
                type="number"
                name="intelligence"
                placeholder="Intelligence"
                // value={this.state.intelligence}
                // onChange={this.handleChange}
                value={combatant.intelligence}
                onChange={e => handleChange("intelligence", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Wisdom: </label><input 
                type="number"
                name="wisdom"
                placeholder="Wisdom"
                // value={this.state.wisdom}
                // onChange={this.handleChange}
                value={combatant.wisdom}
                onChange={e => handleChange("wisdom", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Charisma: </label><input 
                type="number"
                name="charisma"
                placeholder="Charisma"
                // value={this.state.charisma}
                // onChange={this.handleChange}
                value={combatant.charisma}
                onChange={e => handleChange("charisma", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Initiative: </label><input 
                type="number"
                name="initiative"
                placeholder="Initiative"
                // value={this.state.initiative}
                // onChange={this.handleChange}
                value={combatant.initiative}
                onChange={e => handleChange("initiative", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Max HP: </label><input 
                type="number"
                name="max_hp"
                placeholder="Max HP"
                // value={this.state.max_hp}
                // onChange={this.handleChange}
                value={combatant.max_hp}
                onChange={e => handleChange("max_hp", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Armor Class: </label><input 
                type="number"
                name="armor_class"
                placeholder="Armor Class"
                // value={this.state.armor_class}
                // onChange={this.handleChange}
                value={combatant.armor_class}
                onChange={e => handleChange("armor_class", e.target.value)}
                />
              </div>
              <div className="form-input">
              <label>Passive Perception: </label><input 
                type="number"
                name="passive_perception"
                placeholder="Passive Perception"
                // value={this.state.passive_perception}
                // onChange={this.handleChange}
                value={combatant.passive_perception}
                onChange={e => handleChange("passive_perception", e.target.value)}
                />
              </div>
              <div style={{margin:'1em 0 0 0'}}>
              <div style={{marginLeft:'0'}} className="radio">
                  <label>
                      <input 
                      type="radio"
                      // value={this.state.combatantType}
                      // checked={this.state.combatantType === 'Player'}
                      // onChange={() => this.handleRadioButton('Player')}
                      value={combatant.combatantType}
                      checked={combatant.combatantType === 'Player'}
                      onChange={() => handleRadioButton('Player')}
                      />
                      Player
                  </label>
              </div>
              <div style={{marginLeft:'1.5em', marginRight: '0'}} className="radio">
                  <label>
                      <input 
                      type="radio"
                      // value={this.state.combatantType}
                      // checked={this.state.combatantType === 'Monster'}
                      // onChange={() => this.handleRadioButton('Monster')}
                      value={combatant.combatantType}
                      checked={combatant.combatantType === 'Monster'}
                      onChange={() => handleRadioButton('Monster')}
                      />
                      Monster
                  </label>
              </div>
              </div>
              <button className="submit-button" style={{margin:'1em 0'}}>Submit</button>
              </fieldset>
            </form>
            <form onSubmit={search}>
            <fieldset>
              <legend>Search</legend>
              <div className="form-input">
                <label style={{marginTop:'0'}}>Query: </label><input 
                type="text"
                name="query"
                placeholder="Query"
                value={query.name}
                onChange={e => handleQueryChange("name", e.target.value)}
                />
              </div>
              <div style={{margin:'1em 0 0 0'}}>
              <div style={{marginLeft:'0'}} className="radio">
                  <label>
                      <input 
                      type="radio"
                      value="Player"
                      checked={queryRadio.Player}
                      onChange={handleQueryRadioButton}
                      onClick={() => {
                        setQueryRadio(() => ({ Monster: false, Player: false }));
                        if (query.name) {
                          const result = posts.filter(post => post.name.toUpperCase().includes(query.name.toUpperCase()));
                          setFilteredPosts(result);
                        }
                        else {
                          setFilteredPosts(posts);
                        }
                      }}
                      />
                      Player
                  </label>
              </div>
              <div style={{marginLeft:'1.5em', marginRight: '0'}} className="radio">
                  <label>
                      <input 
                      type="radio"
                      value="Monster"
                      checked={queryRadio.Monster}
                      onChange={handleQueryRadioButton}
                      onClick={() => {
                        setQueryRadio(() => ({ Monster: false, Player: false }));
                        if (query.name) {
                          const result = posts.filter(post => post.name.toUpperCase().includes(query.name.toUpperCase()));
                          setFilteredPosts(result);
                        }
                        else {
                          setFilteredPosts(posts);
                        }
                      }}
                      />
                      Monster
                  </label>
              </div>
              </div>
              {/* <button className="submit-button" style={{margin:'1em 0'}}>Submit</button> */}
            </fieldset>
            </form>
              <div className="combatants">
                {/* {this.displayCombatants(this.state.posts)} */}
                {displayCombatants(filteredPosts)}
              </div>
          </div> 
        );
      // };
}
export default Combatants;