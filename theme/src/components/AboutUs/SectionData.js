import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { Flex, Box } from '@rebass/grid/emotion';
import { Container, Styled } from 'theme-ui';
import useImage from '../../hooks/useImage';

const SectionRoot = styled.div`
	min-height: 500px;
	display: flex;
	align-items: center;
	margin: 5rem 0;
`;

const RowFlex = styled(Flex)`
	padding: 6rem 0;
	flex-direction: ${(props) => (props.inverse === 0 ? 'row-reverse' : 'row')} !important;
`;

const StyledImage = styled(Image)`
	border-radius: ${(props) => props.theme.radius.large}px;
  box-shadow: 0 0.75rem 1rem rgba(0, 0, 0, 0.3);;
`;

const SectionData = ({ sections }) => {
	return (
		<SectionRoot>
			<Container>
				{sections.map(({ title, description, image }, index) => {
					const file = useImage(image);
					return (
						<RowFlex flexWrap="wrap" key={index} inverse={index % 2}>
							<Box px={5} width={[ 1, 3 / 5 ]}>
								<Styled.h2>{title}</Styled.h2>
								<p>{description}</p>
							</Box>
							<Box px={5} width={[ 1, 2 / 5 ]}>
								<StyledImage fluid={file.childImageSharp.fluid} />
							</Box>
						</RowFlex>
					);
				})}
			</Container>
		</SectionRoot>
	);
};

export default SectionData;
