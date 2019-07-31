import React, { useEffect } from 'react';
import { css, Global } from '@emotion/core';
import { Layout as StyledLayout } from 'theme-ui';
import { useInterface } from '../reducers/interface';
import { useStore } from '../reducers/store';
import Header from './Header';
import Footer from './Footer';
import PageContent from './PageContent';
import ProductImagesBrowser from './ProductPage/ProductImagesBrowser';

const Layout = ({ children }) => {
	const interfaceReducer = useInterface();
	const stateInterface = interfaceReducer && interfaceReducer[0];
	const dispatchInterface = interfaceReducer && interfaceReducer[1];
	// const [ stateInterface, dispatchInterface ] = interfaceReducer || [];

	const storeReducer = useStore();
	// const [ stateStore, dispatchStore ] = storeReducer || [];
	const stateStore = storeReducer && storeReducer[0];
	const dispatchStore = storeReducer && storeReducer[1];

	const { isDesktopViewport, productImagesBrowserStatus, currentProductImages, productImageFeatured, cartStatus } =
		stateInterface || {};
	const { client } = stateStore || {};

	const mediaQueryToMatch = `(min-width: 1000px)`;
	let dekstopMediaQuery = null;

	useEffect(() => {
		dekstopMediaQuery = window && window.matchMedia(mediaQueryToMatch);
		dekstopMediaQuery && dekstopMediaQuery.addListener(updateViewPortState);

		initializeCheckout();
		updateViewPortState();

		return () => dekstopMediaQuery.removeListener(updateViewPortState);
	}, []);

	const initializeCheckout = async () => {
		const isBrowser = typeof window !== 'undefined';
		const existingCheckoutID = isBrowser ? localStorage.getItem('shopify_checkout_id') : null;

		const setCheckoutInState = (checkout) => {
			if (isBrowser) localStorage.setItem('shopify_checkout_id', checkout.id);
			dispatchStore({ type: 'SET_SHOPIFY_CHECKOUT', payload: checkout });
		};

		const createNewCheckout = () => client.checkout.create();
		const fetchCheckout = (id) => client.checkout.fetch(id);

		if (existingCheckoutID) {
			try {
				const checkout = await fetchCheckout(existingCheckoutID);
				if (!checkout.completedAt) {
					setCheckoutInState(checkout);
					return;
				}
			} catch (error) {
				localStorage.setItem('shopify_checkout_id', null);
			}
		}

		const newCheckout = await createNewCheckout();
		setCheckoutInState(newCheckout);
	};

	const updateViewPortState = (e) => {
		dispatchInterface({ type: 'UPDATE_VIEW_PORT', payload: dekstopMediaQuery && dekstopMediaQuery.matches });
	};

	return (
		<StyledLayout>
			<Global
				styles={css`
					html {
						box-sizing: border-box;
					}
					*,
					*:before,
					*:after {
						box-sizing: inherit;
					}
					body {
						-webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
						margin: 0 auto;
					}
				`}
			/>
			<Header isDesktopViewport={isDesktopViewport} productImagesBrowserStatus={productImagesBrowserStatus} />
			<PageContent
				cartStatus={cartStatus}
				isDesktopViewport={isDesktopViewport}
				productImagesBrowserStatus={productImagesBrowserStatus}
			>
				{children}
			</PageContent>
			<Footer />
			{currentProductImages &&
			currentProductImages.length > 0 && (
				<ProductImagesBrowser
					images={currentProductImages}
					position={productImagesBrowserStatus}
					imageFeatured={productImageFeatured}
					toggle={() => dispatchInterface({ type: 'TOGGLE_PRODUCT_IMAGES', payload: null })}
					isDesktopViewport={isDesktopViewport}
				/>
			)}
		</StyledLayout>
	);
};

export default Layout;
