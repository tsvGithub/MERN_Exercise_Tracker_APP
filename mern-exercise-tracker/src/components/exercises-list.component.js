import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//------------------------------------
// 8. for 7.
//The Exercise component is implemented as a functional React component.
const Exercise = (props) => (
  //It outputs a table row with the values of the
  //properties of the exercise item passed into the component.
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    {/*full date includes  time & time zone, but we need
    just  first part of it (only date)*/}
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      {/*One link goes to the Edit route (to load another 
      component on the page 'edit-exercise.component.js') 
      and the other  calls the deleteExercise method. (5) */}
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);
//-------------------------------------------
//The class component
export default class ExercisesList extends Component {
  // 1.always call SUPER when defining the constructor
  //of a subclass
  constructor(props) {
    super(props);

    // 2. make sure this works properly in our methods,
    //we need to bind the methods to this
    //without bind this==undefiened
    this.deleteExercise = this.deleteExercise.bind(this);

    // 3.  initialize the state with an empty exercises array
    this.state = { exercises: [] };
  }

  //4.
  // The componentDidMount() method is part of the React life
  //cycle & is invoked immediately after a component is mounted.
  componentDidMount() {
    //Get the list of exercises from the database
    //The code will run before the page is rendered and add
    //the list of exercises to the state.
    axios
      //The axios.get method accesses the /exercises endpoint.
      .get("http://localhost:8000/exercises/")
      //Then we assign response.data to the exercises property
      //of the component’s state object with the this.setState
      //method.
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //----------------------------------
  //5. This component will allow users to delete exercises
  deleteExercise(id) {
    //use the axios.delete request
    axios.delete("http://localhost:8000/exercises/" + id).then((response) => {
      console.log(response.data);
    });
    //then we update the state of exercises and
    //filter out (remove) the exercise that was deleted

    //setState automatically update the page
    //with that new state.
    //this.state.exercises == array of exercises
    //filter array
    //return only "_id" (in MongoDB) of el !== 'id'
    //if exercise 'id' !== 'id' that we're deleting ==>
    //pass it back to the exercises array.
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  //-------------------------
  // 7.for tbody (6)
  exerciseList() {
    //This method iterates through the list of exercise
    //items by using the map function & return smth for every
    //element in the array:
    //for every element 'currentexercise' it will return
    //component Exercise (8.)
    return this.state.exercises.map((currentexercise) => {
      //Each exercise item is output with the Exercise component.
      //with 3 props(==variables)
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
    });
  }

  //===================================
  // 6. All exercises list
  //The exercieses will appear in a table on the page.
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/*the body of the table just calls the exercieseList() 
            method to return the rows of the table ==> 7. */}
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    );
  }
}
