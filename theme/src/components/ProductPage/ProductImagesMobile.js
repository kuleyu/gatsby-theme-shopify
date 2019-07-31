import React from 'react';
import styled from '@emotion/styled';
import ProductImage, { StyledImage } from './ProductImage';

const ProductImagesMobileRoot = styled.div`
	-webkit-overflow-scrolling: touch;
	overflow-x: scroll;
	padding: ${(props) => props.theme.space[4]}px;
	padding-bottom: ${(props) => props.theme.space[2]}px;
	width: 100%;
	@media (min-width: ${(props) => props.theme.breakPoints.tablet}px) {
		padding: ${(props) => props.theme.space[6]}px;
		padding-bottom: ${(props) => props.theme.space[5]}px;
	}
`;

const ProductImagesMobileContent = styled.div`
	display: inline-flex;
	${StyledImage} {
		flex-shrink: 0;
		margin-right: ${(props) => props.theme.space[4]}px;
		width: 75vw;
		@media (min-width: ${(props) => props.theme.breakPoints.tablet}px) {
			margin-right: ${(props) => props.theme.space[6]}px;
		}
	}
`;

const ProductImagesMobile = ({ images, imageOnClick }) => {
	return (
		<ProductImagesMobileRoot>
			<ProductImagesMobileContent>
				{images.map((image, idx) => <ProductImage key={idx} image={image} imageOnClick={imageOnClick} />)}
			</ProductImagesMobileContent>
		</ProductImagesMobileRoot>
	);
};

export default ProductImagesMobile;
