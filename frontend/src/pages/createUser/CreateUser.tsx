import React, { useState } from 'react';
import { Button, TextField } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Create User</h1>
      <label>
        First Name:
        <br />
        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '20px' }}/>
        </label>
      <label>
        Last Name:
        <br />
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '20px' }}/>
      </label>
      <label>
        Email:
        <br />
        <input type="email" name="email" value={user.email} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '20px' }}/>
      </label>
      <label>
        Phone Number:
        <br />
        <input type="tel" name="phone" value={user.phone} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '20px' }}/>
      </label>
      <label>
        Country of Residence:
        <br />
        <input type="text" name="country" value={user.country} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '20px' }}/>
      </label>
      <label>
        Date of Birth:
        <br />
        <input type="date" name="dob" value={user.dob} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '20px' }}/>
      </label>
      <label>
        Password:
        <br />
        <input type="password" name="password" value={user.password} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '20px' }}/>
      </label>
      <label>
        Confirm Password:
        <br />
        <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} style={{backgroundColor: 'white', color: 'black', borderRadius: '20px' }}/>
      </label>
      <Button>Create User</Button>
      <br />
      <Link to="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</Link>
      <Link to="/home" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
    </form>
  );
};

export default CreateUser;