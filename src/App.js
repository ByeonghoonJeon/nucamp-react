import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Directory from './components/DirectoryComponent';
import './App.css';
import { CAMPSITES } from './shared/campsites';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  }
  render() {
    const users = [
      {
        firstName: "test",
        lastName: "user1",
      },
      {
        firstName: "notest",
        lastName: "user1",
      }
    ];
    const printUser = () => {
      users.map(user => {
        
      });
    }
      return (
          <div className="App">
              <Navbar dark color="primary">
              <div className="container">
                  <NavbarBrand href="/">NuCamp</NavbarBrand>
              </div>
              </Navbar>
              <Directory campsites={this.state.campsites} />
              {this.props.testprop}
              {users.map(user => (<p>{user.firstName} {user.lastName}</p>))}
              {printUser()}
          </div>
      );
  }
}

export default App;
