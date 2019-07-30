module.exports = ({ shopName = 'graphql', accessToken = 'dd4d4dc146542ba7763305d71d1b3d38' }) => ({
	siteMetadata: {
		title: 'Gatsby Theme Jam Example Submission'
	},
	plugins: [
		'gatsby-plugin-theme-ui',
		{
			resolve: 'gatsby-source-shopify2',
			options: {
				shopName,
				accessToken
			}
		}
	]
});
