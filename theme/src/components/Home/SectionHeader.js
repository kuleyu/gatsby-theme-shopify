import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { Box } from '@rebass/grid/emotion';
import { Styled, Container } from 'theme-ui';
import Button from '../elements/Button';
import useImage from '../../hooks/useImage';
import { WaveSvg } from '../elements/Svgs';

const SectionRoot = styled.section`
	position: relative;
	min-height: 80vh;
	overflow: hidden;
	padding-top: 140px;
`;

const ContainerImage = styled(Image)`
	position: absolute !important;
	overflow: hidden !important;
	max-width: 1920px;
	margin: 0 auto;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

const Content = styled.div`
	position: relative;
	width: 100%;
	z-index: 1;
`;

const SectionHeader = ({ title = 'Title', description = 'description', image, textButton = 'Text' }) => {
	const file = useImage('background_header');
	return (
		<SectionRoot>
			<ContainerImage fluid={file.childImageSharp.fluid} />
			<Container>
				<Content>
					<Box p={3} width={[ 1, 2 / 3, 1 / 2 ]}>
						<Styled.h1>{title}</Styled.h1>
						<p>{description}</p>
						<Button to="/products">{textButton}</Button>
					</Box>
				</Content>
			</Container>
			<WaveSvg width="100%" height="150" />
		</SectionRoot>
	);
};

export default SectionHeader;
