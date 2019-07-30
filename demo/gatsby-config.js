/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	plugins: [
		{
			resolve: 'gatsby-theme-shopify',
			options: {
				shopName: 'graphql',
				accessToken: 'dd4d4dc146542ba7763305d71d1b3d38'
			}
		}
	]
};
