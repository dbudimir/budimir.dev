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

	&:before {
		content: '';
		background: conic-gradient(transparent 270deg, var(--color-accent), transparent);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		aspect-ratio: 1;
		width: 200%;
		animation: rotate 10s linear infinite;
	}

	&:after {
		content: '';
		background: var(--color-background);
		border-radius: inherit;
		position: absolute;
		inset: var(--offset);
	}

	@keyframes rotate {
		from {
			transform: translate(-50%, -50%) scale(1.4) rotate(0turn);
		}
		to {
			transform: translate(-50%, -50%) scale(1.4) rotate(1turn);
		}
	}

	> * {
		z-index: 1;
	}
`;

const HomePage = () => {
  return (
    <Container>
      <Content />
    </Container>
  );
};

export default HomePage;
