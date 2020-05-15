import React, { Component } from "react";
//use the Axios library to send HTTP requests to the backend
import axios from "axios";

export default class CreateUser extends Component {
  // 1.always call SUPER when defining the constructor
  //of a subclass
  constructor(props) {
    super(props);
    //------------------------
    // 5. make sure this works properly in our methods,
    //we need to bind the methods to this
    //without bind this==undefiened
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //--------------------------------
    // 2. set the initial state of the component by assigning
    //an object to this.state.
    //The properties of state will correspond to the fields
    //in the MongoDB document.
    this.state = {
      username: "",
    };
  }
  //---------------------------------
  // 3. add the methods  to change the username and
  //submit the Form (to UPDATE the STATE properties)

  //when someone enters username (event) is going to call
  //this function
  onChangeUsername(e) {
    //when user name is being changed we're going to set
    //the state:
    this.setState({
      //change username to entered/choosed name:
      //e=>event
      //target => textbox
      //value => value of textbox
      //! username  takes the value of textbox
      username: e.target.value,
    });
  }

  // 4. method to handle the SUBMIT button event of the form
  onSubmit(e) {
    //prevents the default HTML form submit behavior from taking place
    e.preventDefault();

    //set Object with value of changed field:
    const user = {
      username: this.state.username,
    };

    console.log(user);

    //----------------------
    //The axios.post method sends an HTTP POST request to
    //the backend endpoint http://localhost:5000/users/
    //(backend see in routes>users.js)
    //This endpoint is expecting a JSON object in the request
    //body so we passed in the newUser object as a second argument.
    axios.post("http://localhost:5000/users/", user).then((res) => console.log(res.data));

    //after the Form is submitted set STATE to blank
    this.setState({
      username: "",
    });
  }

  //================================
  // 6. FORM
  render() {
    return (
      <div>
        <h1>Create New User</h1>
        {/*when submit (onSubmit event) will call this.onSubmit method */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              required
              className="form-control"
              //value == entered name
              value={this.state.uswername}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
