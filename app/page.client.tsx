'use client';

import styled from 'styled-components';
import BodyContent from '../components/home/body-content';
import SidebarContent from '../components/home/sidebar-content';

const Container = styled.div`
	scroll-behavior: smooth;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding: var(--spacing-lg);

	--offset: 3px;
	position: relative;
	box-sizing: border-box;

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

	.left-col,
	.right-col {
		z-index: 1;
	}

	.left-col {
		overflow: hidden;
	}

	.right-col {
		flex-grow: 1;
		overflow: scroll;
		overflow-x: hidden;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;
		height: unset;

		.right-col {
			width: 100%;
			overflow: unset;
		}
	}
`;

const HomePage = () => {
  return (
    <Container>
      <div className="left-col">
        <SidebarContent />
      </div>

      <div className="right-col">
        <BodyContent />
      </div>
    </Container>
  );
};

export default HomePage;
