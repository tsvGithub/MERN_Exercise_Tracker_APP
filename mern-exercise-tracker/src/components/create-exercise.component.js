import React, { Component } from "react";
//use the Axios library to send HTTP requests to the backend
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  // 1.always call SUPER when defining the constructor
  //of a subclass
  constructor(props) {
    super(props);
    //-------------------------------------
    // 5. make sure this works properly in our methods,
    //we need to bind the methods to this
    //without bind this==undefiened
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //-----------------------------------
    // 2. set the initial state of the component by assigning
    //an object to this.state.
    //The properties of state will correspond to the fields
    //in the MongoDB document.
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      //we'll have drop down menu with all users in DB
      users: [],
    };
  }
  //---------------------------------

  // 6. The componentDidMount() method is part of the React life
  //cycle & is invoked immediately after a component is mounted.
  componentDidMount() {
    //to update the Drop Down menu get the list of users
    //from the DB to add to the users dropdown menu in the form
    //The axios.get method sends an HTTP GET request to
    //the backend endpoint http://localhost:5000/users/
    axios
      .get("http://localhost:8000/users/")
      .then((response) => {
        //if at least one user exists in DB
        if (response.data.length > 0) {
          //select the user associated with the exercise from
          //a drop down user list that come directly from the
          //MongoDB
          this.setState({
            //response data =>  the data returned from the DB
            //to set the state of users and username.
            //Map allow to return smth for every element
            //in the array: for every user will return username
            users: response.data.map((user) => user.username),
            //username is automatically set to the first user
            //in the DB [0].username
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //-------------------------------

  //---------------------------------
  // 3. add methods which can be used to UPDATE the STATE properties

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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  // 4. method to handle the SUBMIT button event of the form
  onSubmit(e) {
    // debugger;

    //prevents the default HTML form submit behavior from taking place
    e.preventDefault();

    //set Object with values of changed fields:
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);
    //The axios.post method sends an HTTP POST request to
    //the backend endpoint http://localhost:5000/exercises/
    //(backend see in routes>exercises.js)
    //This endpoint is expecting a JSON object in the request
    //body so we passed in the newExercises object as a second argument.
    axios.post("http://localhost:8000/exercises/", exercise).then((res) => console.log(res.data));

    //After the form is submitted, the location is updated
    //so the user is taken back to the home page
    window.location = "/";
  }

  //===================================
  // 7. Form
  //onChange event for all the form elements calls
  //the corresponding methods
  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        {/*when submit (onSubmit event) will call this.onSubmit method */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            {/*Drop down menu */}
            <select
              //ref userInput casused me problem!
              //   ref="userInput"
              required
              className="form-control"
              //value will be assigned from the STATE
              value={this.state.username}
              //change event
              onChange={this.onChangeUsername}
            >
              {/*Inside the Select Box we have different
              options & we're getting the options right from 
              our users array. 
              this.state.users == array of all the users
              which will come from the MongoDB Atlas
               .map = allow to return smth for each element
               in an array.
               For each user in an array it takes one user  &
               return option (in select box) & Option have KEY
               === user & value ===user & text===user*/}
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              //set value & onChange method
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input type="text" className="form-control" value={this.state.duration} onChange={this.onChangeDuration} />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              {/*Pop up a calendar to select actual date*/}
              {/*install & import the DatePicker component and the associated CSS */}
              <DatePicker
                //initial selection
                selected={this.state.date}
                //happens when change that selection
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
