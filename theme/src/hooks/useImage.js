import { graphql, useStaticQuery } from 'gatsby';

const useImage = (imageName) => {
	const { allFile: { nodes } } = useStaticQuery(graphql`
		query {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				nodes {
					relativePath
					childImageSharp {
						# Specify the image processing specifications right in the query.
						# Makes it trivial to update as your page's design changes.
						fluid(maxWidth: 1920, quality: 90) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	`);

	console.log('FILES IMAGES', nodes);

	const [ file ] = nodes.filter(({ name }) => name === imageName);

	return file;
};

export default useImage;
