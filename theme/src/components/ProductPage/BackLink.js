import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SecondaryButton } from '../elements/Button';

const BackLinkRoot = styled.div`
	background: linear-gradient(
		to top,
		rgba(255, 255, 255, 1) 0%,
		rgba(255, 255, 255, 1) 76%,
		rgba(255, 255, 255, 0.75) 76%,
		rgba(255, 255, 255, 0.75) 82%,
		rgba(255, 255, 255, 0.5) 82%,
		rgba(255, 255, 255, 0.5) 88%,
		rgba(255, 255, 255, 0.25) 88%,
		rgba(255, 255, 255, 0.25) 94%,
		rgba(255, 255, 255, 0) 94%,
		rgba(255, 255, 255, 0) 100%
	);
	bottom: 0;
	left: 0;
	padding: ${(props) => props.theme.space[4]}px;
	padding-top: ${(props) => props.theme.space[5]}px;
	width: 100%;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		padding: 0 ${(props) => props.theme.space[6]}px;
		position: relative;
	}
`;

const BackToListing = styled(SecondaryButton)`
  width: 100%;
	svg {
		margin-right: 0.5rem;
		font-size: 1rem;
	}
  @media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
    width: auto;
  }
`;

const BackLink = ({ children }) => {
	return (
		<BackLinkRoot>
			<BackToListing to="/">
				<FontAwesomeIcon icon="arrow-left" /> {children}
			</BackToListing>
		</BackLinkRoot>
	);
};

export default BackLink;
