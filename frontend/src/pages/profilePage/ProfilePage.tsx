import React from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

function ProfilePage() {
  return (
    <div>
            <Header linkTo='/homepage' />
    </div>
  );
}

export default ProfilePage;