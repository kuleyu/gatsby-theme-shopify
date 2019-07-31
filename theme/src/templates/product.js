import React from 'react';
import { graphql } from 'gatsby';
import ProductPage from '../components/ProductPage';
import SEO from '../components/seo';

const ProductPageTemplate = ({ data: { shopifyProduct } = {}, location }) => {
	return (
		<React.Fragment>
			<SEO
				title={shopifyProduct.title}
				description={shopifyProduct.description}
				pathname={location.href}
				image={shopifyProduct.images[0].localFile.childImageSharp.fluid.src}
			/>
			<ProductPage {...shopifyProduct} />
		</React.Fragment>
	);
};

export const getProduct = graphql`
	query($handle: String!) {
		shopifyProduct(handle: { eq: $handle }) {
			id
			title
			handle
			productType
			description
			shopifyId
			options {
				id
				name
				values
			}
			variants {
				id
				title
				price
				availableForSale
				shopifyId
				selectedOptions {
					name
					value
				}
			}
			images {
				originalSrc
				id
				localFile {
					childImageSharp {
						fluid(maxWidth: 910) {
							...GatsbyImageSharpFluid_withWebp_tracedSVG
						}
					}
				}
			}
		}
	}
`;

export default ProductPageTemplate;
