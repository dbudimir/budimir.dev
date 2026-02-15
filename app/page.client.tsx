'use client';

import styled from 'styled-components';
import Content from '../components/home/content';

const Container = styled.div`
	scroll-behavior: smooth;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding: var(--spacing-lg);
	--offset: 3px;
	position: relative;
`;

const HomePage = () => {
  return (
    <Container>
      <Content />
    </Container>
  );
};

export default HomePage;
