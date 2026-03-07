import { useState } from "react";

function AdminGuard({ children }) {
  const [input, setInput] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!authorized) {
    return (
      <div className="container">
        <h2>Admin Access</h2>

        <form className="section" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Admin Password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <br />
          <br />

          <button type="submit">Enter</button>
        </form>
      </div>
    );
  }

  return children;
}

export default AdminGuard;
