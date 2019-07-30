module.exports = ({
	shopName = 'graphql',
	accessToken = 'dd4d4dc146542ba7763305d71d1b3d38',
	imagesPath = 'src/images'
}) => ({
	siteMetadata: {
		title: 'Gatsby Theme Jam Example Submission'
	},
	plugins: [
		'gatsby-plugin-theme-ui',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-emotion',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: imagesPath
			}
		},
		{
			resolve: 'gatsby-source-shopify2',
			options: {
				shopName,
				accessToken
			}
		},
		{
			resolve: 'gatsby-plugin-layout',
			options: {
				component: require.resolve('./src/components/Layout')
			}
		}
	]
});
