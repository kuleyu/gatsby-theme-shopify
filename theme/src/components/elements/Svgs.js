import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const ContainerSvg = styled.div`
	display: flex;
	flex-grow: 1;
	width: 100%;
	position: absolute;
	right: 0;
	svg {
		fill: ${(props) => (props.color ? props.theme.colors.backgroundPrimary : 'white')};
		@media (max-width: ${(props) => props.theme.breakPoints.tablet}px) {
			height: 70px !important;
		}
	}

	${(props) => (props.top ? css`top: ${props.top};` : css`bottom: 0;`)};
`;

const WaveSvg = ({ width = 500, height = 150, ...restProps }) => (
	<ContainerSvg {...restProps}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height={height}
			width={width}
			viewBox="0 0 500 100"
			preserveAspectRatio="none"
		>
			<path
				d="M 0 0 L 500 0 L 500 93 C 500 93 421.647 125.074 360 118 C 298.353 110.926 217 69 140 69 C 63 69 0 93 0 93 Z"
				transform="translate(0 30.981) rotate(180 250 59.51)"
				width="100%"
			/>
		</svg>
	</ContainerSvg>
);

const ConcaveWaveSvg = ({ width = 500, height = 150, ...restProps }) => (
	<ContainerSvg {...restProps}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 500 100"
			preserveAspectRatio="none"
		>
			<path d="M 0 0 C 0 0 125 75 250 75 C 375 75 500 0 500 0 L 500 150 L 0 150 Z" fill="hsl(0, 0%, 100%)" />
		</svg>
	</ContainerSvg>
);

export { WaveSvg, ConcaveWaveSvg };
