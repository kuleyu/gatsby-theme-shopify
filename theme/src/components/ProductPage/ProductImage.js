import React, { useEffect, useRef } from 'react';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const IMAGE_CHANGE_ANIM_DURATION = 250;

const change = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ProductImageLink = styled.a`
	display: block;
	position: relative;
	&.change {
		animation: ${change} ${IMAGE_CHANGE_ANIM_DURATION}ms ease-out forwards;
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		cursor: zoom-in;
	}
`;

const ZoomHelper = styled.span`
	background: rgba(255, 255, 255, 0.5);
	border-radius: ${(props) => props.theme.radius.large}px;
	display: flex;
	left: ${(props) => props.theme.space[2]}px;
	padding: ${(props) => props.theme.space[2]}px;
	position: absolute;
	top: ${(props) => props.theme.space[2]}px;
	svg {
		fill: ${(props) => props.theme.colors.primary};
		height: 24px;
		width: 24px;
	}
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		display: none;
	}
`;

export const StyledImage = styled(Image)`
  border-radius: ${(props) => props.theme.radius.large}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
`;

const ProductImage = ({ image, imageFeatured = null, imageOnClick }) => {
	const imageLink = useRef();

	useEffect(
		() => {
			if (imageLink) imageLink.current.classList.add('change');
			setTimeout(
				() => imageLink && imageLink.current && imageLink.current.classList.remove('change'),
				IMAGE_CHANGE_ANIM_DURATION
			);
		},
		[ image.id ]
	);

	const handleClick = () => {
		imageOnClick(image);
	};

	return (
		<ProductImageLink onClick={handleClick} ref={imageLink} /* href={fluid.src}*/>
			<StyledImage
				fluid={
					image && image.localFile && image.localFile.childImageSharp && image.localFile.childImageSharp.fluid
				}
				alt=""
			/>
			<ZoomHelper>
				<FontAwesomeIcon icon="search-plus" />
			</ZoomHelper>
		</ProductImageLink>
	);
};

export default ProductImage;
