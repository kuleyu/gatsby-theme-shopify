import { graphql, useStaticQuery } from 'gatsby';

const useImage = (imageName) => {
	const { allFile: { nodes } } = useStaticQuery(graphql`
		query {
			allFile(filter: { sourceInstanceName: { eq: "images" } }) {
				nodes {
					name
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

	const [ file ] = nodes.filter(({ name }) => name === imageName);

	return file;
};

export default useImage;
