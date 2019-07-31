import React from 'react';
import { graphql } from 'gatsby';
import SectionHeader from '../components/AboutUs/SectionHeader';
import SectionData from '../components/AboutUs/SectionData';
import SEO from '../components/seo';
import useImage from '../hooks/useImage';

const AboutUs = ({ data: { allSection: { nodes } } }) => {
	const [ dataHeader, ...sections ] = nodes;
	const { title, description, image } = dataHeader;
	const file = useImage(image);

	return (
		<React.Fragment>
			<SEO title={title} description={description} image={file.childImageSharp.fluid.src} />
			<SectionHeader title={title} description={description} file={file} />
			<SectionData sections={sections} />
		</React.Fragment>
	);
};

export default AboutUs;

export const getPageSections = graphql`
	query getAboutUsSections($page: String!) {
		allSection(filter: { path: { eq: $page } }) {
			nodes {
				title
				description
				textButton
				steps {
					icon
					description
					title
				}
				image
			}
		}
	}
`;
