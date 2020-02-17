import React from 'react';
import Home from '../components/Home';
import styled from 'styled-components';

// import './Home.css';

const HomePage = () => {
  return (
    <Container>
      <Home />;
    </Container>
  );
};

const Container = styled.div`
  margin: 50;
`;

export default HomePage;
