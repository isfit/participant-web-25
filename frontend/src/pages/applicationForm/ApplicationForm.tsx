import React, { useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
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
  console.log('Selected:', message);
};

const sectionMenuItems: MenuItemProps[] = [
  { type: 'label', content: '' },
  { type: 'item', content: 'Organizational Resources', onSelect: () => handleSelect('OR') },
  { type: 'item', content: 'Event Management', onSelect: () => handleSelect('EM') },
  { type: 'item', content: 'Public Relations', onSelect: () => handleSelect('PR') },
];

const positions: { [key: string]: MenuItemProps[] } = {
  'Organizational Resources': [
    { type: 'item', content: 'IT', onSelect: () => handleSelect('it') },
    { type: 'item', content: 'HR', onSelect: () => handleSelect('hr') },
    { type: 'item', content: 'Finances', onSelect: () => handleSelect('finances') },
  ],
  'Event Management': [
    { type: 'item', content: 'Logistics', onSelect: () => handleSelect('logistics') },
    { type: 'item', content: 'Program Coordination', onSelect: () => handleSelect('program-coordination') },
  ],
  'Public Relations': [
    { type: 'item', content: 'Marketing', onSelect: () => handleSelect('marketing') },
    { type: 'item', content: 'Media Relations', onSelect: () => handleSelect('media-relations') },
  ],
};

const ApplicationForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({ coverLetter: '' });
  const [selectedSection, setSelectedSection] = useState<string>('Organizational Resources');
  const [selectedPosition, setSelectedPosition] = useState<string>('');

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
  };

  // Reset position when section is changed
  useEffect(() => {
    setSelectedPosition('');
    console.log('Selected section:', positions[selectedSection])
  }, [selectedSection]);

  return (
    <div id='pageContainer'>
      <div className="topRight">
        <Link to="/login" style={{ color: 'white'}}><Button>Login</Button></Link>
        <Link to="/profilePage" style={{ color: 'white'}}><Button>My profile</Button></Link>
      </div>
      <Header linkTo='/homepage' />
      <div>
        <div className='applicationInfo'>
          <h2>Application Form For Participants</h2>
          <p>Choose the applicable sections and positions</p>
          <p>Tell us about yourself and your motivation for joining ISFiT</p>
        </div>
        <form className="applicationForm" onSubmit={handleSubmit}>
          <div id='applicationContainer'>
            {/* Sections dropdown */}
            <div className='dropdownContainer'>
              <label className='dropdownLabel' htmlFor="section">Choose a section</label>
              <Dropdown triggerText={selectedSection ? selectedSection : 'Sections'} menuItems={sectionMenuItems} onItemSelected={setSelectedSection} />
            </div>
            {/* Positions dropdown */}
            {selectedSection && (
              <div className='dropdownContainer'>
                <label className='dropdownLabel' htmlFor="position">Choose a position</label>
                <Dropdown
                  triggerText={selectedPosition ? selectedPosition : 'Positions'}
                  menuItems={positions[selectedSection] || []} // Ensure positions[selectedSection] is defined
                  onItemSelected={setSelectedPosition}
                />
              </div>
            )}

            {/* Cover letter */}
            <div className='dropdownContainer'>
              <div className='coverLetterInfo'>
                {selectedSection && selectedPosition ? (
                <div className='applicationInfo' id="selectionInfo">
                  <p>{selectedSection}: {selectedPosition}</p>
                </div>
                ) : 
                (
                  <div className='applicationInfo' id="selectionInfo">
                    <p>Please select a position</p>
                  </div>
                
                )}
              </div>
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
          <Button type="submit">Apply</Button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;