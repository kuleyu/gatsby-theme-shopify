import React from 'react';

const initialState = {
	isDesktopViewport: null,
	cartStatus: 'initial',
	productImageFeatured: null,
	currentProductImages: [],
	productImagesBrowserStatus: 'initial'
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_VIEW_PORT':
			return { ...state, isDesktopViewport: action.payload };
		case 'TOGGLE_PRODUCT_IMAGES':
			const img = action.payload;
			return {
				...state,
				productImagesBrowserStatus: img ? 'open' : 'closed',
				productImageFeatured: img ? img : state.productImageFeatured
			};
		case 'TOGGLE_CART':
			return {
				...state,
				cartStatus: state.cartStatus === 'open' ? 'closed' : 'open'
			};
		case 'FEATURE_PRODUCT_IMAGE':
			return { ...state, productImageFeatured: action.payload };
		case 'SET_CURRENT_IMAGES':
			return { ...state, currentProductImages: action.payload };
		default:
			return { ...state };
	}
};

const Ctx = React.createContext(initialState);

export const InterfaceProvider = ({ children }) => {
	const contextValue = React.useReducer(reducer, initialState);

	return <Ctx.Provider value={contextValue}>{children}</Ctx.Provider>;
};

export const useInterface = () => React.useContext(Ctx);
