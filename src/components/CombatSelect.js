import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useHistory } from "react-router-dom";
import {add_cart} from "../redux/setActions";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
  const CombatSelect = () => {
    const history = useHistory();
    
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
    const [num, setNum]=useState([]);
    const [fighters]=useState([]);
    let [posts, setPosts]=useState([]);

    const [pagination, setPagination] = useState({
      data: [],
      offset: 0,
      numberPerPage: 10,
      pageCount: 0,
      currentData: []
    });
    // const [filteredPosts, setFilteredPosts]=useState([]);
    const [queryRadio, setQueryRadio] = useState({Player: false, Monster: false});

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const counter = useSelector(state => state.count);
    const addCart = (props, count) => {
      dispatch(add_cart(props, count));
      console.log("cart: ");
      console.log(cart);
      console.log(posts);
    }
    useEffect(() =>{
      axios.get('api/combatantsList')
        .then((response) => {
          setPosts(response.data);
          // setFilteredPosts(response.data);
          // setPagination({
          //   data: response.data,
          //   offset: 0,
          //   numberPerPage: 10,
          //   pageCount: 0,
          //   currentData: []
          // });
          setPagination((prevState) => ({
            ...prevState,
            data: response.data,
            pageCount: response.data.length / prevState.numberPerPage,
            // pageCount: Math.ceil(response.data.length / 10),
            currentData: response.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
            // currentData: response.data.slice(0, 0 + pagination.numberPerPage)
            // currentData: response.data.slice(0, 10)
          }))
          for (var i=0; i<response.data.length; i++) {
            num.push([response.data[i]._id, 0]);
          }
          console.log('Data has been received!!!');
        })
        .catch((err) => {
          console.log(err);
        });
    }, [num, posts.length, pagination.numberPerPage, pagination.offset]);

    const handlePageClick = event => {
      const selected = event.selected;
      console.log("selected: ");
      console.log(event.selected);

      const offset = selected * pagination.numberPerPage;
      console.log(offset);
      console.log(pagination);
      setPagination({ ...pagination, offset })
    }

    const carted = (post) => {
      let count = 0;
      for (var i = 0; i<posts.length; i++) {
        if (posts[i]._id === post._id) {
          count = num[i][1];
        }
      }
      addCart(post, count);
    }

    const search = (event) => {
      event.preventDefault();
    }

    const handleChange = (event, id) => {
      let index = 0;
      for (var i = 0; i<posts.length; i++) {
        if (posts[i]._id === id) {
          index = i;
        }
      }
      let items = num;
      let item = num[index][1];
      if (event === '') {
        item = 0;
      } else {
        item = parseInt(event);
      }
      items[index][1]=item;
      setNum(items);
    };

    const handleQueryChange = (event, value) => {
      if (value) {
        if (queryRadio.Monster === true) {
          let result = posts.filter(post => post.combatantType === "Monster");
          result = result.filter(post => post.name.toUpperCase().includes(value.toUpperCase()));
          // setFilteredPosts(result);
          setPagination((prevState) =>({
            ...prevState,
            data: result,
            offset: 0,
            pageCount: result.length / prevState.numberPerPage,
            currentData: result.slice(0, prevState.numberPerPage)
          }))
        }
        else if (queryRadio.Player === true) {
          let result = posts.filter(post => post.combatantType === "Player");
          result = result.filter(post => post.name.toUpperCase().includes(value.toUpperCase()));
          // setFilteredPosts(result);
          setPagination((prevState) =>({
            ...prevState,
            data: result,
            offset: 0,
            pageCount: result.length / prevState.numberPerPage,
            currentData: result.slice(0, prevState.numberPerPage)
          }))
        }
        else {
          const result = posts.filter(post => post.name.toUpperCase().includes(value.toUpperCase()));
          // setFilteredPosts(result);
          setPagination((prevState) =>({
            ...prevState,
            data: result,
            offset: 0,
            pageCount: result.length / prevState.numberPerPage,
            currentData: result.slice(0, prevState.numberPerPage)
          }))
        }
      }
      else {
        // setFilteredPosts(posts);
        setPagination((prevState) =>({
          ...prevState,
          data: posts,
          offset: 0,
          pageCount: posts.length / prevState.numberPerPage,
          currentData: posts.slice(0, prevState.numberPerPage)
        }))
      }
      setQuery(previousState => {
        return { ...previousState, [event]: value}
      })
    };

    const handleQueryRadioButton = (e) => {
      if (e) {
          if (query.name) {
            let result = posts.filter(post => post.combatantType === e.target.value);
            result = result.filter(post => post.name.toUpperCase().includes(query.name.toUpperCase()));
            // setFilteredPosts(result);
            setPagination((prevState) =>({
              ...prevState,
              data: result,
              offset: 0,
              pageCount: result.length / prevState.numberPerPage,
              currentData: result.slice(0, prevState.numberPerPage)
            }))
          }
          else {
            const result = posts.filter(post => post.combatantType === e.target.value);
            // setFilteredPosts(result);
            setPagination((prevState) =>({
              ...prevState,
              data: result,
              offset: 0,
              pageCount: result.length / prevState.numberPerPage,
              currentData: result.slice(0, prevState.numberPerPage)
            }))
          }
        }
        else {
          // setFilteredPosts(posts);
          setPagination((prevState) =>({
            ...prevState,
            data: posts,
            offset: 0,
            pageCount: posts.length / prevState.numberPerPage,
            currentData: posts.slice(0, prevState.numberPerPage)
          }))
        }
      setQuery(previousState => {
        return { ...previousState, combatantType: e}
      })
      setQueryRadio(() => {
        return {
          Player: false,
          Monster: false,
          [e.target.value]: true
        };
      });
    }
    const submit = (event) => {
      event.preventDefault();
      // for (var i = 0; i< posts.length; i++) {
      //   if(num[i][1] > 0) {
      //       for(var k = 0; k < num[i][1]; k++) {
      //       fighters.push(posts[i]);
      //     }
      //   }
      // }
      for(var i = 0; i < cart.length; i++) {
        for (var k = 0; k < posts.length; k++) {
          if (posts[k]._id === cart[i]._id) {
            for (var j = 0; j < counter[i].count; j++) {
              fighters.push(cart[i]);
            }
          }
        }
      }
      const payload = {
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
        history.push('/rolls', response.data._id);
        console.log('Data has been sent to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
  
  
    };
  
      return(
        <>
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
                        // setFilteredPosts(result);
                        setPagination((prevState) =>({
                          ...prevState,
                          data: result,
                          offset: 0,
                          pageCount: result.length / prevState.numberPerPage,
                          currentData: result.slice(0, prevState.numberPerPage)
                        }))
                      }
                      else {
                        // setFilteredPosts(posts);
                        setPagination((prevState) =>({
                          ...prevState,
                          data: posts,
                          offset: 0,
                          pageCount: posts.length / prevState.numberPerPage,
                          currentData: posts.slice(0, prevState.numberPerPage)
                        }))
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
                        // setFilteredPosts(result);
                        setPagination((prevState) =>({
                          ...prevState,
                          data: result,
                          offset: 0,
                          pageCount: result.length / prevState.numberPerPage,
                          currentData: result.slice(0, prevState.numberPerPage)
                        }))
                      }
                      else {
                        // setFilteredPosts(posts);
                        setPagination((prevState) =>({
                          ...prevState,
                          data: posts,
                          offset: 0,
                          pageCount: posts.length / prevState.numberPerPage,
                          currentData: posts.slice(0, prevState.numberPerPage)
                        }))
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
  <div className="combat-container">
    {/* <form onSubmit={this.submit}> */}
    <form onSubmit={submit}>
      <table className="content-table">
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
                  <th>Select</th>
                  <th>Add to Cart</th>
              </tr>
          </thead>
          <tbody>
          {pagination.currentData && pagination.currentData.map(((post, index) => (
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
                onChange={e => handleChange(e.target.value, post._id)}
              />
            </div>
          </td>
          <td>
            <button type="button" onClick={function() {carted(post)}} className="submit-button" style={{margin:'0'}}>Add to Cart</button>
          </td>
            {/* <tr key={item.id} className="post">
            <td>{item.title}</td>
            <td>{item.id}</td>
            <td>{item.body}</td> */}
            </tr>
          )))
          }
        {/* {filteredPosts.map((post, index) => (
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
                onChange={e => handleChange(e.target.value, post._id)}
              />
            </div>
          </td>
          <td>
            <button type="button" onClick={function() {carted(post)}} className="submit-button" style={{margin:'0'}}>Add to Cart</button>
          </td>
        </tr>
      ))} */}
          </tbody>
      </table>
      <input type="submit" value="Submit" className="submit-button"/>
    </form>
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      // pageCount={pagination.pageCount}
      pageCount={Math.ceil(pagination.data.length/10)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
      forcePage={Math.ceil(pagination.offset/10)}
    />
  </div>
  </>
      );
    //};
}
export default CombatSelect;