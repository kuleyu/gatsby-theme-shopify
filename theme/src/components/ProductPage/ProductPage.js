import React, { useEffect } from 'react';
import { useInterface } from '../../reducers/interface';
import styled from '@emotion/styled';
import BackLink from './BackLink';
import ProductSpecs from './ProductSpecs';
import ProductImagesDesktop from './ProductImagesDesktop';
import ProductImagesMobile from './ProductImagesMobile';
import ProductForm from './ProductForm';

const ProductPageRoot = styled.div`
	padding-bottom: ${(props) => props.theme.space[4]}px;
	margin-top: 120px;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		align-items: center;
		display: flex;
		justify-content: center;
		min-height: calc(100vh - 110px);
		padding: ${(props) => props.theme.space[6]}px;
		width: 100%;
	}
`;

const Container = styled.div`
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		align-items: flex-start;
		display: flex;
	}
`;

const Details = styled.div`
	position: relative;
	flex-direction: column-reverse; /* Se añadio estos cambios al boton de regreso */
	display: flex;
	@media (min-width: ${(props) => props.theme.breakPoints.desktop}px) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-right: -${(props) => props.theme.space[6]}px;
		max-width: 400px;
		min-height: 490px;
	}
`;

const ProductPage = (product) => {
	const interfaceReducer = useInterface();
	const state = interfaceReducer && interfaceReducer[0];
	const dispatch = interfaceReducer && interfaceReducer[1];

	const { id, images, variants } = product;

	useEffect(() => {
		dispatch({ type: 'SET_CURRENT_IMAGES', payload: images });

		return () => dispatch({ type: 'FEATURE_PRODUCT_IMAGE', payload: null });
	}, []);

	const imageOnClick = (image) => {
		dispatch({ type: 'TOGGLE_PRODUCT_IMAGES', payload: image });
	};
	return (
		<React.Fragment>
			<ProductPageRoot>
				<Container>
					{!(state && state.isDesktopViewport) ? (
						<ProductImagesMobile images={images} imageOnClick={imageOnClick} />
					) : (
						<ProductImagesDesktop
							images={images}
							imageFeatured={state && state.productImageFeatured}
							imageOnClick={imageOnClick}
						/>
					)}
					<Details>
						<BackLink>Lista de productos</BackLink>
						<ProductSpecs product={product} />
						<ProductForm id={id} variants={variants} />
					</Details>
				</Container>
			</ProductPageRoot>
		</React.Fragment>
	);
};

export default ProductPage;
