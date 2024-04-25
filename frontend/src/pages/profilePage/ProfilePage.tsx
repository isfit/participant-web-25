import React from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

function ProfilePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '30px 30px' }}>
        <h1>PROFILE PAGE</h1>
        <div>Profile info </div>
        <div>profile@email.com </div>
        <div>+47 8008135 </div>
        <br />
        <div>MY APPLICATION</div>
        <div>Masse tekst om hvorfor jeg skal være deltager i ISFiT25 ehhehehehehehhe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit cupiditate tempore illo rem? Aspernatur quisquam harum tempora labore assumenda expedita consequuntur repellendus. A consequatur veniam quibusdam nobis harum ut explicabo.</div>
        <Button>EDIT MY APPLICATION</Button>
        <br />
        <br />
        <Link to="/homePage" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
    </div>
  );
}

export default ProfilePage;