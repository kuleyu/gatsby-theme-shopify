import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const PageContentRoot = styled.main`
	min-height: 100vh;
	opacity: 1;
	padding-left: 0;
	transition: 0.75s;
	width: 100%;
	will-change: transform;
	&.covered {
		opacity: 0;
		position: fixed;
	}
	&.entry {
		animation: ${(props) => props.theme.animations.deadSimpleEntry};
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		transform: translateX(0);
		&.moved {
			filter: blur(1px);
			/* position: fixed; */
			transform: translateX(-400px);
		}
		&.covered {
			display: none;
		}
	}
`;

const Overlay = styled.div`
	display: none;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		background: rgba(0, 0, 0, 0.1);
		bottom: 0;
		display: block;
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
	}
`;

const PageContent = ({ children, cartStatus, productImagesBrowserStatus }) => {
	const [ className, setClassName ] = useState('');

	useEffect(
		() => {
			// if (isDesktopViewport && productImagesBrowserStatus === 'open') {
			// 	setTimeout(() => setClassName(`${className} covered`), 500);
			// } else {
			// 	const newClassName = className.replace(' covered', '');
			// 	setClassName(newClassName);
			// }

			if (cartStatus === 'open') {
				setClassName(`${className} moved`);
			} else {
				const newClassName = className.replace('moved', '');
				setClassName(newClassName);
			}
		},
		[ cartStatus, productImagesBrowserStatus ]
	);

	return (
		<PageContentRoot className={className}>
			{children}
			{cartStatus === 'open' && <Overlay />}
		</PageContentRoot>
	);
};

export default PageContent;
