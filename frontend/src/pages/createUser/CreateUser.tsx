import React, { useState } from 'react';
import { Button, TextField } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  dob: string;
  password: string;
  confirmPassword: string;
}

const CreateUser: React.FC = () => {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div style={{ margin: '30px 30px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <Header linkTo='/homepage'/>
        <h1>Create User</h1>
        <label>
          First Name:
          <br />
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}/>
          </label>
        <label>
          Last Name:
          <br />
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}/>
        </label>
        <label>
          Email:
          <br />
          <input type="email" name="email" value={user.email} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}/>
        </label>
        <label>
          Phone Number:
          <br />
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}/>
        </label>
        <label>
          Country of Residence:
          <br />
          <input type="text" name="country" value={user.country} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}/>
        </label>
        <label>
          Date of Birth:
          <br />
          <input type="date" name="dob" value={user.dob} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}/>
        </label>
        <label>
          Password:
          <br />
          <input type="password" name="password" value={user.password} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}/>
        </label>
        <label>
          Confirm Password:
          <br />
          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}/>
        </label>
        <br />
        <Button>Create User</Button>
        <br />
        <p>Already have an account?</p>
        <Button><Link to="/login" style={{ color: 'white'}}>Login</Link></Button>
      </form>
    </div>
  );
};

export default CreateUser;