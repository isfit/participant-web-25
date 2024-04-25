import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

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
    <div style={{margin: '30px 30px'}}>
      <Header linkTo='/homepage'/>
      <h2>Application Form For Participants</h2>
      <p>Write about yourself and why you want to join Isfit:</p>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="coverLetter">Cover letter:</label><br />
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formValues.coverLetter}
              onChange={handleChange}
              required
              rows={20}
              style={{ width: '100%', backgroundColor: 'white', borderRadius: '5px', color: 'black', padding: '5px' }} 
            />
        </div>
        <Button type="submit">Submit</Button>
      </form>
        <Link to="/homePage" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
    </div>
  );
};

export default ApplicationForm;
