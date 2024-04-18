import React from 'react';

import { Box, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import './Home.css';


const HomePage: React.FC = () => {
  return (
    <div>
    <Box>
      <Heading as="h1" size={"1"}>
        Welcome to Participant Web!
      </Heading>
      <Text as="p" size={"4"}>
        Created by IT GÆNG 25.
      </Text>
      <Box>
        <Link to="/login">Login</Link>
      </Box>
      <Box>
        <Link to="/createUser">Create User</Link>
      </Box>
      <Box>
        <Link to="/aboutPage">About Isfit</Link>
      </Box>
    </Box>
    </div>
  );
};

export default HomePage;