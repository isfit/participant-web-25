import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
//import css
import './ApplicationForm.css';
import Dropdown from '../../components/Menus/Dropdown.tsx';

interface FormValues {
  coverLetter: string;
}

interface MenuItemProps {
  type: MenuItemType;
  content?: string;
  onSelect?: () => void;
}

type MenuItemType = 'label' | 'item' | 'separator';

const handleSelect = (message: string) => {
  alert(message);
};

const sectionMenuItems: MenuItemProps[] = [
  { type: 'label', content: '' },
  { type: 'item', content: 'Section 1', onSelect: () => handleSelect('Section 1') },
  { type: 'item', content: 'Section 2', onSelect: () => handleSelect('Section 2') },
  { type: 'separator' },
  { type: 'item', content: 'Section 3', onSelect: () => handleSelect('Section 3') },
  { type: 'item', content: 'Section 4', onSelect: () => handleSelect('Section 4') },
  { type: 'item', content: 'Section 5', onSelect: () => handleSelect('Section 5') },
];

const positionMenuItems: MenuItemProps[] = [
  { type: 'label', content: '' },
  { type: 'item', content: 'Position 1', onSelect: () => handleSelect('Position 1') },
  { type: 'item', content: 'Position 2', onSelect: () => handleSelect('Position 2') },
  { type: 'separator' },
  { type: 'item', content: 'Position 3', onSelect: () => handleSelect('Position 3') },
  { type: 'item', content: 'Position 4', onSelect: () => handleSelect('Position 4') },
  { type: 'item', content: 'Position 5', onSelect: () => handleSelect('Position 5') },
];

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
      <div className="topRight">
        <Button><Link to="/login" style={{ color: 'white'}}>Login</Link></Button>
        <Button><Link to="/createUser" style={{ color: 'white'}}>Create user</Link></Button>
        <Button><Link to="/profilePage" style={{ color: 'white'}}>My profile</Link></Button>
      </div>
      <Header linkTo='/homepage'/>
      <div>
      <div className='applicationInfo'>
        <h2>Application Form For Participants</h2>
        <p>Choose the applicable sections and positions</p>
        <p>Tell us about yourself and your motivation for joining ISFiT</p>
      </div>
      <form className="applicationForm" onSubmit={handleSubmit}>
        <div id='applicationContainer'>

          {/* Drop down for sections and positions */}
          {/* Sections */}
          <div className='dropdownContainer'>
            <label htmlFor="section">Choose a section</label>
            <Dropdown triggerText='Sections' menuItems={sectionMenuItems}/>
          </div>
            {/* Positions */}
            <div className='dropdownContainer'>
              <label htmlFor="position">Choose a position</label>
              <Dropdown triggerText='Positions' menuItems={positionMenuItems}/>
            </div>

            {/* Cover letter  */}
            <div className='dropdownContainer'>
              <label id='applicationTitle' htmlFor="coverLetter">Cover letter</label><br />
            </div>
            <div className='textareaContainer'>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formValues.coverLetter}
                onChange={handleChange}
                required
                placeholder='Give us a brief introduction about yourself and your motivation for joining ISFiT.'
              />
            </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
