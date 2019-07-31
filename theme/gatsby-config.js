module.exports = ({
	shopName = 'graphql',
	accessToken = 'dd4d4dc146542ba7763305d71d1b3d38',
	imagesPath = 'src/images',
	contentPath = 'data',
	socialMedia = {
		facebook: 'https://www.facebook.com/plukketech/'
	},
	email = 'plukkemx@gmail.com'
}) => ({
	siteMetadata: {
		siteTitle: 'Theme shopify',
		siteTitleAlt: 'Theme shopify - Gatsby Theme from @Plukke',
		siteUrl: 'http://localhost:8000',
		siteDescription: 'Theme shopify',
		siteLanguage: 'en',
		siteImage: '/banner.png',
		author: '@dma_d',
		socialMedia,
		email
	},
	plugins: [
		'gatsby-plugin-theme-ui',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-emotion',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: imagesPath
			}
		},
		{
			resolve: 'gatsby-transformer-json',
			options: {
				typeName: 'Section' // a fixed string
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'data',
				path: contentPath
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
