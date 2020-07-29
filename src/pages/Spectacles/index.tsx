import React from 'react';

import { Container, Content } from './styles';
import SideMenu from '../../components/SideMenu';

const Spectacles: React.FC = () => {
  return (
    <Container>
      <SideMenu />

      <Content />
    </Container>
  );
};

export default Spectacles;
