import React from 'react';
import { StoreProvider } from './src/reducers/store';
import { InterfaceProvider } from './src/reducers/interface';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

export const wrapRootElement = ({ element }, options) => {
	return (
		<InterfaceProvider>
			<StoreProvider options={options}>{element}</StoreProvider>
		</InterfaceProvider>
	);
};
