import React from 'react';
import Client from 'shopify-buy';

const initialState = {
	isCartOpen: false,
	adding: false,
	checkout: { lineItems: [] },
	products: [],
	shop: {}
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADDING_PRODUCT':
			return { ...state, adding: true };
		case 'CHECKOUT_SHOPIFY':
			return { ...state, checkout: action.payload, adding: false };
		case 'SET_SHOPIFY_CHECKOUT':
			return { ...state, checkout: action.payload };
		default:
			return { ...state };
	}
};

const Ctx = React.createContext(initialState);

export const StoreProvider = ({ children, options }) => {
	const { shopName, accessToken } = options;
	const client = Client.buildClient({
		domain: `${shopName}.myshopify.com`,
		storefrontAccessToken: accessToken
	});

	const contextValue = React.useReducer(reducer, { ...initialState, client });

	return <Ctx.Provider value={contextValue}>{children}</Ctx.Provider>;
};

export const useStore = () => React.useContext(Ctx);
