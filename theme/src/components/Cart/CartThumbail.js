import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { graphql, StaticQuery } from 'gatsby';

const CartThumbailRoot = styled(Image)`
  border: 1px solid ${(props) => props.theme.colors.brandLight};
  border-radius: ${(props) => props.theme.radius.default}px;
  height: 36px;
  width: 36px;
`;

const CartThumbnail = ({ shopifyImages, id: imageId, fallback, ...imageProps }) => {
	const image = shopifyImages.find(({ id }) => id === imageId);

	if (image) {
		imageProps['fluid'] = image.localFile.childImageSharp.fluid;
	} else {
		imageProps['src'] = fallback;
	}

	return <CartThumbailRoot {...imageProps} />;
};

export default (props) => (
	<StaticQuery
		query={graphql`
			{
				allShopifyProduct {
					nodes {
						images {
							id
							localFile {
								childImageSharp {
									fluid {
										...GatsbyImageSharpFluid_withWebp
									}
								}
							}
						}
					}
				}
			}
		`}
		render={({ allShopifyProduct: { nodes } }) => {
			const images = nodes.map(({ images }) => images).reduce((acc, val) => acc.concat(val), []);

			return <CartThumbnail shopifyImages={images} {...props} />;
		}}
	/>
);
