'use client';

import styled from 'styled-components';
import Content from '../components/home/content';

const Container = styled.div`
  min-height: 100vh;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  --offset: 3px;
  position: relative;
  z-index: 1;
`;

const HomePage = () => {
  return (
    <Container>
      <Content />
    </Container>
  );
};

export default HomePage;
