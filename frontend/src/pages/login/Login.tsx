import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import { useAuth } from '../../context/AuthenticationContext';
import Header from '../../components/Header/Header';
import './Login.css';

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log(
      `Logging in with email: ${user.email} and password: ${user.password}`,
    );
    login(user.email, user.password);
    navigate('/');
  };

  return (
    <div className="outerContainer">
      <Header linkTo="/homepage" />
      <form onSubmit={handleSubmit} className="formContainer">
        {[
          {
            label: 'Email',
            name: 'email',
            type: 'email',
            placeholder: 'name@email.com',
          },
          {
            label: 'Password',
            name: 'password',
            type: 'password',
            placeholder: '**********',
          },
        ].map(({ label, name, type, placeholder }) => (
          <label key={name} className="formSection">
            <p>{label}</p>
            <input
              type={type}
              name={name}
              value={user[name as keyof User]}
              onChange={handleChange}
              placeholder={placeholder}
              className="formInput"
            />
          </label>
        ))}
        <Button className="submitButton">Login</Button>
        <br />
        <div className="createUserPrompt">Don't have an account?</div>

        <Link to="/createUser" className="createUserLink">
          <Button className="createUserButton">Create User</Button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
