import React from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '30px 30px' }}>
      <Header linkTo='/homePage'/>
      <h1>HOMEPAGE</h1>
      <Button>FILL OUT APPLICATION</Button>
      <br />
      <Button>VIEW MY APPLICATION</Button>
      <br />
      <Button>ABOUT ISFiT</Button>
      <br />
      <Link to="/home" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
    </div>
  );
}

export default HomePage;