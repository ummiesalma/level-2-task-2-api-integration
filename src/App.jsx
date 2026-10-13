
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load users. Please try again.");
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.address.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>User Directory</h1>
        <p>Discover and explore our community</p>
      </header>

      <main className="container">
        <input
          className="search"
          type="text"
          placeholder="Search by name, email, or city..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {loading && <p className="message">Loading users...</p>}
        {error && <p className="message error">{error}</p>}

        {!loading && !error && (
          <>
            <p className="results">
              Showing {filteredUsers.length} users
            </p>

            <div className="user-grid">
              {filteredUsers.map((user) => (
                <article className="user-card" key={user.id}>
                  <div className="avatar">
                    {user.name.charAt(0)}
                  </div>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p className="city">📍 {user.address.city}</p>
                  <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                    Visit Website ↗
                  </a>
                </article>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <p className="message">No users found.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
