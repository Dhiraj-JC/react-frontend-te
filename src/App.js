import './App.css';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadDataDisabled, setloadDataDisabled] = useState(false);
  const [searchUserName, setSearchUserName] = useState('');

  function getAllUsers() {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setloadDataDisabled(true);
        setUsers(json);
        setSearchUsers(json);
      });
  }

  function filterUserByName() {
    const searchedUsers = searchUsers.filter((user) =>
      user.name.toLowerCase().includes(searchUserName.toLowerCase())
    );
    setUsers(searchedUsers);
  }

  return (
    <>
      <input
        type='text'
        placeholder='Search username'
        id="searchInput"
        data-testid="searchInput"
        value={searchUserName}
        onChange={(event) => setSearchUserName(event.target.value)}
        onBlur={(event) => setSearchUserName(event.target.value)}
      />

<button onClick={filterUserByName}
      >Search User</button>

      <button onClick={getAllUsers}
      disabled={loadDataDisabled}>Load data</button>


      {loading && <h1>Loading .....</h1>}

      <label data-testid="resultfound">{users.length} results found</label>
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <hr />
            <h1>Users Details</h1>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <p>{user.zipcode}</p>
            <hr />
          </div>
        ))}
    </>
  );
}

export default App;
