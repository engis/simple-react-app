import React, {Component} from 'react';

import './App.css';
import axios from 'axios';
import Loading from './Loading';


class App extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      users: [],
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.getUsers();
    console.log('more users');
  }

  getUsers() {
    this.setState({loading: true})
    axios('https://api.randomuser.me/?nat=US&results=5').then(response => {
      let users = response.data.results
      console.log(users)
      this.setState({users: [...this.state.users, ...response.data.results], loading: false})
    });
  }

  

  componentDidMount () {
    this.getUsers();
  }

 

  render () {
    const {loading, users} = this.state
    return <div className="App">
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="load users"/>
      </form>
      <hr/>
      {!loading 
        ? users.map(user => 
          <div key={user.id.value}>
            <h3 style={{color: 'red'}}>{user.name.first}</h3>
            <p>{user.email}</p>
            <hr/>
           
          </div>
        )
        : <Loading message="Loading"/>}</div>;
  }
}

export default App;
