import React from 'react';
import styled from '@emotion/styled';

import ProductImage from './ProductImage';
import ProductThumbnails, { Thumbnail } from './ProductThumbnails';

const THUMBNAIL_SIZE = '54px';

const ProductImagesDesktopRoot = styled.div`
	margin-right: ${(props) => props.theme.space[5]}px;
	width: 440px;
`;

const Thumbnails = styled(ProductThumbnails)`
  ${Thumbnail} {
    height: ${THUMBNAIL_SIZE};
    width: ${THUMBNAIL_SIZE};
  }
`;

const ProductImagesDesktop = ({ images, imageFeatured, imageOnClick }) => {
	const image = images[0];
	return (
		<ProductImagesDesktopRoot>
			<ProductImage image={imageFeatured ? imageFeatured : image} imageOnClick={imageOnClick} />
			<Thumbnails images={images} />
		</ProductImagesDesktopRoot>
	);
};

export default ProductImagesDesktop;
