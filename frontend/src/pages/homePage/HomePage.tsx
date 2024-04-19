import React from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header linkTo='/homePage'/>
      <h1>HOMEPAGE</h1>
      <Button>FILL OUT APPLICATION</Button>
      <Button>VIEW MY APPLICATION</Button>
      <Button>ABOUT ISFiT</Button>
      <Link to="/home" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link>
    </div>
  );
}

export default HomePage;