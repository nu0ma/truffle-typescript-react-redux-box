import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Header } from 'semantic-ui-react';

// import './Home.css';

const Home = () => {
  return (
    <Container>
      <Header>Home</Header>

      <Segment>
        <Link to="/connect"> Test Contract Function</Link>
      </Segment>
    </Container>
  );
};

export default Home;
