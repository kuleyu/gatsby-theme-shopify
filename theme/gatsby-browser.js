import React from 'react';
import { StoreProvider } from './src/reducers/store';
import { InterfaceProvider } from './src/reducers/interface';

export const wrapRootElement = ({ element }, options) => {
	return (
		<InterfaceProvider>
			<StoreProvider options={options}>{element}</StoreProvider>
		</InterfaceProvider>
	);
};
