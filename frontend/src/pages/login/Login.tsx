import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import Header from '../../components/Header/Header';

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
    <div className="login-page" style={{margin: '30px 30px'}}>
      <Header linkTo='/homepage'/>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username: 
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}
          />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px'}}
          />
        </label>
        <br />
        <br />
        <Button type="submit">Login</Button>
      </form>
      <br />
      <p>Don't have an account?</p>
      <Button><Link to="/createUser" style={{ color: 'white'}}>Create user</Link></Button>
    </div>
  );
};

export default Login;
