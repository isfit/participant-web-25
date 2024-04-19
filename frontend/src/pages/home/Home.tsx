import React from 'react';

import { Box, Heading, Text, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../../components/Header/Header';


const HomePage: React.FC = () => {
  return (
    <div style={{margin: '30px 30px'}}>
      <Header linkTo='/home'/>
    <Box>
      <Heading as="h1" size={"1"}>
        Welcome to Participant Web!
      </Heading>
      <Text as="p" size={"4"}>
        Created by IT GÆNG 25.
      </Text>
      <Box>
        <Button>
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        </Button>
      </Box>
      <br />
      <Box>
        <Button>
          <Link to="/createUser" style={{ color: 'white' }}>Create User</Link>
        </Button>
      </Box>
      <Box>
        <Link to="/aboutPage">About Isfit</Link>
      </Box>
      <Box>
        <Link to="/homePage">Home Page</Link>
      </Box>
      <Box>
        <Link to="/applicationForm">Application Form</Link>
      </Box>
    </Box>
    </div>
  );
};

export default HomePage;