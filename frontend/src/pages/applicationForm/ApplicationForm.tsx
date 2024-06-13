import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
//import css
import './ApplicationForm.css';

//TODO 
//TODO Few things can be improved:

//TODO Add proper styling to textarea element
//TODO Add proper styling to "Home" navigation button
//TODO Add navigation menu to Application Form page. Top right corner needs navigation to "Login", "Create User" and "Profile"

interface FormValues {
  coverLetter: string;
}

const ApplicationForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    coverLetter: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
    // You can perform form submission logic here
  };

  return (
    <div id='pageContainer'> 
      <Header linkTo='/homepage'/>
      <h2>Application Form For Participants</h2>
      <p>Tell us about yourself and your motivation for joining Isfit</p>
      <form className="applicationForm" onSubmit={handleSubmit}>
        <div id='applicationContainer'>
            <label id='applicationTitle' htmlFor="coverLetter">Cover letter</label><br />
            <div className='textareaContainer'>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formValues.coverLetter}
                onChange={handleChange}
                required
                placeholder='Tell us about yourself and why you want to join isfit'
              />
            </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
        <Link to="/homePage" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
    </div>
  );
};

export default ApplicationForm;
