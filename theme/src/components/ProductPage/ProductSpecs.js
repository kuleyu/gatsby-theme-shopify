import React from 'react';
import styled from '@emotion/styled';

const ProductSpecsRoot = styled.div`
	padding: 0 ${(props) => props.theme.space[4]}px;
	@media (min-width: ${(props) => props.theme.breakPoints.tablet}px) {
		padding: ${(props) => props.theme.space[7]}px ${(props) => props.theme.space[6]}px 0;
	}
`;

const Name = styled.h1`
	color: ${(props) => props.theme.colors.primaryDark};
	font-family: ${(props) => props.theme.fonts.heading};
	font-size: 1.8rem;
	font-weight: 500;
	margin: 0;
`;

const Description = styled.p`
	color: ${(props) => props.theme.colors.text};
	font-size: 1rem;
	line-height: 1.5;
`;

const Price = styled.div`
	color: ${(props) => props.theme.colors.primary};
	font-size: 1.8rem;
	font-weight: 500;
	letter-spacing: -0.02em;
	span {
		color: ${(props) => props.theme.colors.textLight};
	}
`;

const removeCareInstructions = (desc) => desc.split(/Care Instructions/).slice(0, 1);

const ProductSpecs = ({ product }) => {
	const { title, description, variants: [ variant ] } = product;
	const { price } = variant;

	return (
		<ProductSpecsRoot>
			<Name>{title}</Name>
			<Description>{removeCareInstructions(description)}</Description>
			<Price>
				<span>MXN</span> ${price}
			</Price>
		</ProductSpecsRoot>
	);
};

export default ProductSpecs;
