import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@radix-ui/themes';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log(
      `Logging in with username: ${username} and password: ${password}`,
    );
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <Button type="submit">Login</Button>
      </form>
      <br />
      <Link to="/createUser" style={{ color: 'white', textDecoration: 'underline' }}>Create User</Link>
      <br />
      <Link to="/home" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
    </div>
  );
};

export default Login;
