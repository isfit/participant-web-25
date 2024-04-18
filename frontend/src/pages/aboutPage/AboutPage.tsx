import React from 'react';

import { Heading, Text, Box } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import './AboutPage.css';


const AboutPage: React.FC = () => {
  return (
    <div>
    <Box>
      <Heading as="h1" size={"1"}>
        About ISFIT
      </Heading>
      <Text as="p" size={"4"}>
        ISFiT is the world’s largest international student festival,taking place biennially during the 
        spring semester in Trondheim, Norway. We gather students from different national and cultural 
        backgrounds to talk and connect through exciting and engaging topics and discussions. The first 
        ever ISFiT festival was held in 1990 and ever since people from around the world has gathered
        in Trondheim every other year in unison. The next festival will happen in 2025. Each festival 
        explores a different theme, and this festival's theme is POWER!
      </Text>
      <Text as="p">
        In a world driven by various forms of power, ISFIT25 encourages a reflective journey into 
        understanding and redefining the concept. Power, often associated with authority and control, 
        extends beyond conventional boundaries. At ISFIT, we believe in harnessing the strength of 
        influence to bring about positive change. 
      </Text>
      <Heading as="h2" size={"1"}>
        The Student Peace Prize
      </Heading>
      <Text as="p" size={"4"}>
        The Student Peace Prize (SPP) was established in 1999 – as an initiative by volunteers from the 
        International Student Festival in Trondheim (ISFiT). It is awarded biennially to a student or 
        student organization working to promote peace, human rights and democracy. The Prize is awarded 
        on behalf of all students in Norway, while an independent Student Peace Prize Committee makes 
        the selection itself. The election happens through the independent committee for the Students 
        Peace Prize, while the award itself, takes place during ISFiT’s own award ceremony.
      </Text>
      <Box>
        <Link to="/Home">Home</Link>
      </Box>
    </Box>
    </div>
  );
};

export default AboutPage;