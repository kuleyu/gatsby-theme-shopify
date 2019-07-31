import React from 'react';
import SectionHeader from '../components/Home/SectionHeader';
import SectionFeaturedProducts from '../components/Home/SectionFeaturedProducts';
import SectionProcess from '../components/Home/SectionProcess';
import SectionContact from '../components/Home/SectionContact';

const Home = ({ pageContext, data: { allSection: { nodes } }, location }) => {
	const [ dataHeader, dataFeatureProducts, dataProcess, dataContact ] = nodes;
	const { apiData = {}, shopName } = pageContext;

	const { title, description } = dataHeader;
	return (
		<React.Fragment>
			<SectionHeader {...dataHeader} />
			<SectionFeaturedProducts {...dataFeatureProducts} />
			<SectionProcess {...dataProcess} />
			<SectionContact {...dataContact} apiData={apiData} shopName={shopName} />
		</React.Fragment>
	);
};

export default Home;

export const getPageSections = graphql`
	query getHomeSections($page: String!) {
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
