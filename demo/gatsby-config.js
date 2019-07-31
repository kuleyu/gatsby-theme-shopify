/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
	plugins: [
		{
			resolve: '@plukke/gatsby-theme-shopify',
			options: {
				shopName: 'graphql',
				accessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
				imagesPath: 'src/images',
				contentPath: 'data',
				email: 'damex989@gmail.com',
				socialMedia: {
					facebook: 'https://www.facebook.com/plukketech/',
					instagram: 'https://help.shopify.com/en/api/reference/store-properties/shop#show-2019-07',
					twitter: 'https://blog.logrocket.com/how-to-build-a-custom-gatsbyjs-theme-e9b9529f217b/'
				},
				apiData: {
					url: '/contactForm_submit',
					baseURL: 'https://kwbbw9uwub.execute-api.us-east-1.amazonaws.com/default/',
					auth: {
						username: process.env.API_USERNAME_SEND_EMAIL,
						password: process.env.API_PASSWORD_SEND_EMAIL
					}
				}
			}
		}
	]
};
