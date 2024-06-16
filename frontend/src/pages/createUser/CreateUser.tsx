import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './CreateUser.css';

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
    <div className='outerContainer'>
        <Header linkTo='/homepage' />
      <form onSubmit={handleSubmit} className='formContainer'>
          {[
            { label: 'First name', name: 'firstName', type: 'text', placeholder: 'John' },
            { label: 'Last name', name: 'lastName', type: 'text', placeholder: 'Doe' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'name@email.com' },
            { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+49 012 345 6789' },
            { label: 'Country of Residence', name: 'country', type: 'text', placeholder: 'Germany' },
            { label: 'Date of Birth', name: 'dob', type: 'date', placeholder: '' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '**********' },
            { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: '**********' },
          ].map(({ label, name, type, placeholder }) => (
            <label key={name} className='formSection'>
              <p>{label}</p>
              <input
                type={type}
                name={name}
                value={user[name as keyof User]}
                onChange={handleChange}
                placeholder={placeholder}
                className='formInput'
              />
            </label>
          ))}
        <Button className='submitButton'>Create User</Button>
        <p className='loginPrompt'>Already have an account?</p>
        <Button className='loginButton'>
          <Link to="/login" className='loginLink'>Login</Link>
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;