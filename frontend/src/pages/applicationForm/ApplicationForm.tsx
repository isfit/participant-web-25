import React, { useState } from 'react';
import {Button} from '@radix-ui/themes';
import { Link } from 'react-router-dom';

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
    <div>
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
            style={{ width: '100%'}} // Set width and height using inline style
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default ApplicationForm;
