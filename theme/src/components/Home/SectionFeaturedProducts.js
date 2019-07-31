import React from 'react';
import { Styled, Container } from 'theme-ui';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import { Flex, Box } from '@rebass/grid/emotion';
import ProductItem from '../ProductItem';

const TRANSITION_DURATION = '250ms';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 150px;
`;

const StyledBox = styled(Box)`
	background: ${(props) => props.theme.colors.lightest};
  border-radius: ${(props) => props.theme.radius.large}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: ${(props) => props.theme.space[5]}px;
  overflow: hidden;
  transition: all ${TRANSITION_DURATION};
	flex-basis: 320px;
	justify-content: 'center';
`;

const SectionFeaturedProducts = ({ title, description }) => {
	const { shopifyCollection: { products } } = useStaticQuery(graphql`
		query {
			shopifyCollection(handle: { eq: "summer-collection" }) {
				id
				handle
				products {
					id
					title
					handle
					createdAt
					description
					images {
						id
						originalSrc
						localFile {
							childImageSharp {
								fluid(maxWidth: 300) {
									...GatsbyImageSharpFluid_withWebp_tracedSVG
								}
							}
						}
					}
					variants {
						price
						compareAtPrice
					}
				}
			}
		}
	`);

	return (
		<Container>
			<Content>
				<Styled.h2>{title}</Styled.h2>
				<p>{description}</p>

				<Flex flexWrap="wrap" justifyContent="center">
					{products.slice(0, 3).map((product) => (
						<StyledBox width={[ 1, 1 / 2, 1 / 3 ]} mx={[ 0, 4 ]} my={[ 0, 4 ]} key={product.id}>
							<ProductItem {...product} />
						</StyledBox>
					))}
				</Flex>
			</Content>
		</Container>
	);
};

export default SectionFeaturedProducts;
