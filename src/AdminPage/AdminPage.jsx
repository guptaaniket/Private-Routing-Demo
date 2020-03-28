import React from "react";
import { AddBook } from "@/_components";
import { userService } from "@/_services";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount() {
    userService.getAll().then(users => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3>Admin</h3>
          <div>
            <p style={{ marginTop: "10px", marginRight: "5px" }}>
              (can only be accessed by <b>admin</b>.)
            </p>
          </div>
        </div>
        <button
          style={{ float: "right", marginTop: "-50px" }}
          className="btn btn-dark"
        >
          Add Book
        </button>
        <div style={{ borderTop: "solid 1px black" }}></div>
        {/* <form>
        <input type='text'>Book Name</input>
        <input type='text'>Description</input>
        <input type='text'>Writer</input>
        <input type='text'>Price</input>

        </form> */}
      </div>
    );
  }
}

export { AdminPage };
