import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { useInterface } from '../../reducers/interface';

const THUMBNAIL_SIZE = '44px';

const ProductThumbnailsRoot = styled.div`
	height: ${THUMBNAIL_SIZE};
	-webkit-overflow-scrolling: touch;
	overflow-x: scroll;
	width: 100%;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		height: auto;
		overflow-x: hidden;
	}
`;

export const ProductThumbnailsContent = styled.div`
	display: inline-flex;
	height: 100%;
	padding-left: ${(props) => props.theme.space[4]}px;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		justify-content: center;
		min-width: 100%;
		padding: ${(props) => props.theme.space[5]}px 0 0;
	}
`;

export const Thumbnail = styled.a`
	border: 1px solid ${(props) => props.theme.colors.brandBright};
	border-radius: ${(props) => props.theme.radius.default}px;
	height: ${THUMBNAIL_SIZE};
	margin-right: ${(props) => props.theme.space[4]}px;
	width: ${THUMBNAIL_SIZE};
	overflow: hidden; /* Tmeporal, mientras el tamaño se ajusta */
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		cursor: pointer;
		margin-right: ${(props) => props.theme.space[4]}px;
	}
`;

const ProductThumbnails = ({ images, className = '' }) => {
	const interfaceReducer = useInterface();
	const dispatch = interfaceReducer && interfaceReducer[1];

	const handleClick = (image) => (event) => {
		event.preventDefault();
		dispatch({ type: 'FEATURE_PRODUCT_IMAGE', payload: image });
	};

	return (
		<ProductThumbnailsRoot className={className}>
			<ProductThumbnailsContent>
				{images.map((image) => {
					const { id, localFile: { childImageSharp: { fluid } } } = image;
					return (
						<Thumbnail key={id} onClick={handleClick(image)} href={fluid.src}>
							<Image fluid={fluid} />
						</Thumbnail>
					);
				})}
			</ProductThumbnailsContent>
		</ProductThumbnailsRoot>
	);
};

export default ProductThumbnails;
