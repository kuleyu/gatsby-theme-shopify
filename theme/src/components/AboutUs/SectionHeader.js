import React from 'react';
import { Styled, Container, useThemeUI } from 'theme-ui';
import Image from 'gatsby-image';
import { rgba } from 'polished';

import styled from '@emotion/styled';
import { ConcaveWaveSvg } from '../elements/Svgs';

const SectionRoot = styled.section`
	position: relative;
	min-height: 70vh;
	width: 100%;
	padding-top: 140px;
`;

const ContentDescription = styled.div`
	max-width: 900px;
	margin: 0 auto;
	text-align: center;
`;

const ContainerImage = styled.div`
	width: 100%;
	height: 100%;
	max-height: 1200px;
	z-index: -2;
	top: 0;
	position: absolute;
	overflow: hidden;

	.gatsby-image-wrapper {
		position: static !important;
		filter: grayscale(100%) contrast(150%);
		> div {
			padding-bottom: 0 !important;
			height: 100vh;
			max-height: 1200px;
		}
	}
	&:before {
		content: "";
		height: 100%;
		left: 0;
		top: 0;
		position: absolute;
		width: 100%;
		mix-blend-mode: overlay;
		z-index: 1;
		background: ${(props) =>
			`linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, ${rgba(props.theme.colors.primaryLight, 1)} 100%)`};
	}
	&:after {
		backface-visibility: hidden;
		content: "";
		height: 100%;
		left: 0;
		top: 0;
		position: absolute;
		width: 100%;
		background: ${(props) => `linear-gradient(to top, ${props.shade} 0%, ${props.theme.colors
			.backgroundPrimary} 100%),
      linear-gradient(135deg, ${props.shade} 40%, ${props.theme.colors
			.backgroundPrimary} 100%), linear-gradient(-135deg, ${props.shade} 40%, ${props.theme.colors
			.backgroundPrimary} 100%)`};
	}
`;

const Card = styled.div`
	background: ${(props) => props.theme.colors.lightest};
	border-radius: ${(props) => props.theme.radius.large}px;
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
	width: 90%;
	padding: ${(props) => props.theme.space[6]}px ${(props) => props.theme.space[5]}px;
	max-width: 900px;
	margin: 0 auto;
	margin-top: 150px;
	position: absolute;
	left: 0;
	right: 0;
	bottom: -50px;
	min-height: 250px;
	z-index: 3;
`;

const Divider = styled.div`
	height: 5px;
	width: 8%;
	background-color: ${(props) => props.theme.colors.primary};
	margin: 2rem auto;
	border-radius: ${(props) => props.theme.space[0]}px;
`;

const SectionHeader = ({ title, description, file }) => {
	const { theme } = useThemeUI();
	const bg = theme.colors.primaryLight;
	const shade = rgba(bg, 0.2);

	return (
		<SectionRoot>
			<ContainerImage shade={shade}>
				<Image fluid={file.childImageSharp.fluid} />
			</ContainerImage>
			<Container>
				<ContentDescription>
					<Styled.h1>{title}</Styled.h1>
					<Divider />
					<p>{description}</p>
				</ContentDescription>
				<Card>Contenido</Card>
			</Container>
			<ConcaveWaveSvg width="100%" />
		</SectionRoot>
	);
};

export default SectionHeader;
