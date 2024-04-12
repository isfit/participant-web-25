import React from 'react';
import { Button } from '@radix-ui/themes';

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>HOMEPAGE</h1>
      <Button>FILL OUT APPLICATION</Button>
      <Button>VIEW MY APPLICATION</Button>
      <Button>ABOUT ISFiT</Button>
    </div>
  );
}

export default HomePage;