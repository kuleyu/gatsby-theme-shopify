/**
 * This theme uses `theme-ui` under the hood.
 * @see https://theme-ui.com/
 * @see https://theme-ui.com/gatsby-plugin/
 */

export default {
	space: [ 2, 4, 8, 12, 16, 24, 32, 40, 48 ],
	colors: {
		text: '#232129',
		background: '#fff',
		primary: '#639',
		gray: [ '#efefef', '#ddd', '#333', '#111' ],
		background: '#fff',
		lightest: '#ffffff',
		brandLight: '#f5f3f7',
		brandBright: '#e0d6eb',

		primary: '#663399',
		primaryDark: '#542A7E',
		primaryLight: '#AB8FC7',
		backgroundPrimary: '#F1ECF5',
		primaryLighter: '#fbfafc',
		textLight: '#7e718a',
		lilac: '#8c65b3',
		accent: '#ffb238',
		error: '#ec1818',
		lemon: '#ffdf37'
	},
	fonts: {
		default:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
	},
	fontSizes: [ 16, 18, 20, 22, 27, 36 ],
	lineHeights: {
		text: 1.45,
		heading: 1.1
	},
	breakPoints: {
		mobile: 400,
		phablet: 550,
		tablet: 750,
		desktop: 1000,
		hd: 1300
	},
	sizes: {
		container: 1200
	},
	styles: {
		Layout: {
			backgroundColor: 'background',
			color: 'text',
			fontFamily: 'default',
			fontSize: 1,
			lineHeight: 'text'
		},
		Container: {
			margin: '0 auto',
			maxWidth: 'container',
			width: '90vw'
		},
		h1: {
			color: 'primary',
			fontSize: 5,
			fontWeight: 'bold',
			lineHeight: 'heading',
			margin: 0,
			marginTop: 3
		},
		h2: {
			color: 'primary',
			fontSize: 4,
			fontWeight: 'bold',
			lineHeight: 'heading',
			margin: 0,
			marginTop: 3
		}
	}
};
