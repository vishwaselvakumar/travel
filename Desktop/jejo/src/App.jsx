import { useState } from 'react'
import { v4 as uuid } from 'uuid';

function App() {
  const [user, setUser] = useState([]);
  const [buttonState, setButtonState] = useState("add");

  const [userInfo, setuserInfo] = useState({
    id: uuid(),
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((currInfo) => {
      return {
        ...currInfo,
        [name]: value,
      };
    });
  };

  const addData = () => {
    setUser((currUser) => [...currUser, userInfo]);
    setuserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
  };

  const Update = () => {
    setUser((currUser) => {
      return currUser.map((user) => {
        if (user.id === userInfo.id) {
          return userInfo; // Update the matching user with new data
        }
        return user; // Return the rest unchanged
      });
    });
    cancel(); // Clear form and reset the button state after updating
  };

  const cancel = () => {
    setuserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
    setButtonState("add");
  };

  const startEdit = (user) => {
    setuserInfo(user);
    setButtonState("edit");
  };

  const DeleteUser = (id) => {
    setUser((currUser) => {
      return currUser.filter((user) => user.id !== id); // Return users not matching the ID
    });
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <input
            type="text"
            value={userInfo.name}
            name="name"
            onChange={handleChange}
            required // Makes the name field required
          />
          <br />
          <input
            type="number"
            value={userInfo.age}
            name="age"
            onChange={handleChange}
            required // Makes the age field required
          />
          <br />
          <input
            type="email"
            value={userInfo.email}
            name="email"
            onChange={handleChange}
            required // Makes the email field required
          />
          <br />
          <input
            type="number"
            value={userInfo.phone}
            name="phone"
            onChange={handleChange}
            required // Makes the phone field required
          />
          <br />
          {buttonState === "add" ? (
            <button onClick={addData}>add</button>
          ) : (
            <div className="buttonContainer">
              <button onClick={Update}>update</button>
              <button className="ml-3" onClick={cancel}>cancel</button>
            </div>
          )}
        </div>
        <div className="dataTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button onClick={() => startEdit(user)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => DeleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
