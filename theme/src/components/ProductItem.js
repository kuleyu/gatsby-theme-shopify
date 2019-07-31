import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from '@emotion/styled';
import { cutDescriptionShort, removeCareInstructions } from '../utils/helpers';

const TRANSITION_DURATION = '250ms';
const DESCRIPTION_LIMIT = 90;

const ProductListingItemLink = styled(Link)`
  text-decoration: none;
`;

const Item = styled.article`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: ${(props) => props.theme.space[5]}px;

	@media (hover: hover) {
		:hover {
			background: ${(props) => props.theme.colors.primaryLighter};
		}
	}
`;

const Preview = styled.div`
	border-bottom: 1px solid ${(props) => props.theme.colors.primaryLighter};
	border-radius: ${(props) => props.theme.radius.large}px ${(props) => props.theme.radius.large}px 0 0;
	margin: -${(props) => props.theme.space[5]}px;
	margin-bottom: ${(props) => props.theme.space[5]}px;
	overflow: hidden;
	position: relative;

	.gatsby-image-wrapper {
		height: 300px;
		transition: all ${TRANSITION_DURATION};
	}
	@media (hover: hover) {
		${ProductListingItemLink}:hover & {
			.gatsby-image-wrapper {
				transform: scale(1.1);
			}
		}
	}
`;

const Name = styled.h1`
	color: ${(props) => props.theme.colors.primaryDark};
	font-family: ${(props) => props.theme.fonts.heading};
	font-size: 1.6rem;
	line-height: 1.2;
	margin: 0px;
`;

const Description = styled.p`
	color: ${(props) => props.theme.colors.gray[2]};
	font-size: 1rem;
	line-height: 1.5;
	flex-grow: 1;
`;

const PriceRow = styled.div`
	align-items: flex-end;
	display: flex;
	justify-content: space-between;
	margin-top: ${(props) => props.theme.space[2]}px;
`;

const Price = styled.div`
	color: ${(props) => props.theme.colors.primary};
	font-size: 1.4rem;
	font-weight: 500;
	letter-spacing: -0.02em;
	span {
		color: ${(props) => props.theme.colors.textLight};
	}
`;

const Incentive = styled.div`
	align-items: center;
	color: ${(props) => props.theme.colors.lilac};
	display: flex;
	font-size: 0.9rem;
	line-height: 1.3;
	margin-bottom: ${(props) => props.theme.space[1]}px;
	margin-right: calc(-${(props) => props.theme.space[5]}px - 40px);
	text-align: right;
	transition: all ${TRANSITION_DURATION};
	@media (hover: hover) {
		${ProductListingItemLink}:hover & {
			transform: translateX(-40px);
		}
	}
	> span {
		svg {
			display: inline;
			margin-right: -${(props) => props.theme.space[0]}px;
			vertical-align: middle;
		}
	}
`;

const CartIcon = styled.span`
	align-items: center;
	background: ${(props) => props.theme.colors.lilac};
	border-radius: ${(props) => props.theme.radius.default}px 0 0 ${(props) => props.theme.radius.default}px;
	display: flex;
	height: 40px;
	justify-content: center;
	margin-left: ${(props) => props.theme.space[5]}px;
	position: relative;
	transition: all ${TRANSITION_DURATION};
	vertical-align: middle;
	width: 40px;
	@media (hover: hover) {
		${ProductListingItemLink}:hover & {
			margin-left: ${(props) => props.theme.space[2]}px;
		}
	}
	svg {
		color: ${(props) => props.theme.colors.accent};
		height: 22px;
		position: relative;
		width: 22px;
	}
`;

const ProductItem = ({ images: [ firstImage ], handle, title, description, variants: [ firstVariant ] }) => {
	const { localFile: { childImageSharp: { fluid } } } = firstImage;
	const { price } = firstVariant;

	return (
		<ProductListingItemLink to={`/product/${handle}`}>
			<Item>
				<Preview>
					<Image fluid={fluid} />
				</Preview>
				<Name>{title}</Name>
				<Description>{cutDescriptionShort(removeCareInstructions(description), DESCRIPTION_LIMIT)}</Description>
				<PriceRow>
					<Price>
						<span>MXN</span> ${price}
					</Price>
					<Incentive>
						<span>
							ver detalles
							<br />& comprar <FontAwesomeIcon icon="arrow-right" />
						</span>
						<CartIcon>
							<FontAwesomeIcon icon="shopping-cart" />
						</CartIcon>
					</Incentive>
				</PriceRow>
			</Item>
		</ProductListingItemLink>
	);
};

export default ProductItem;
