import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Flex, Box } from '@rebass/grid/emotion';

import ProductItem from '../components/ProductItem';
import { Container } from 'theme-ui';

const TRANSITION_DURATION = '250ms';

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

const Products = ({ data: { allShopifyProduct } }) => {
	return (
		<Container style={{ marginTop: '120px' }}>
			<Flex flexWrap="wrap" justifyContent="center">
				{allShopifyProduct.nodes.map((product) => (
					<StyledBox width={[ 1, 1 / 2, 1 / 3 ]} mx={[ 0, 4 ]} my={[ 0, 4 ]} key={product.id}>
						<ProductItem {...product} />
					</StyledBox>
				))}
			</Flex>
		</Container>
	);
};

export default Products;

export const queryProducts = graphql`
	query {
		allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
			nodes {
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
`;
