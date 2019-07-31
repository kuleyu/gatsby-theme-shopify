import { graphql, useStaticQuery } from 'gatsby';

const useSiteMetadata = () => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					siteTitle
					siteTitleAlt
					siteUrl
					siteDescription
					siteLanguage
					siteImage
					author
					socialMedia {
						facebook
						instagram
						twitter
					}
					email
				}
			}
		}
	`);
	return data.site.siteMetadata;
};

export default useSiteMetadata;
