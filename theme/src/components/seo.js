import React from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';

import { Helmet } from 'react-helmet';

const SEO = ({ title, description, pathname, image, children }) => {
	const site = useSiteMetadata();

	const {
		siteTitle,
		siteTitleAlt: defaultTitle,
		siteUrl,
		siteDescription: defaultDescription,
		siteLanguage,
		siteImage: defaultImage,
		author
	} = site;

	const seo = {
		title: title || defaultTitle,
		description: description || defaultDescription,
		url: pathname || '',
		image: `${siteUrl}${image || defaultImage}`
	};

	return (
		<Helmet title={title} defaultTitle={defaultTitle} titleTemplate={`%s | ${siteTitle}`}>
			<html lang={siteLanguage} />
			<meta name="description" content={seo.description} />
			<meta name="image" content={seo.image} />
			<meta property="og:title" content={seo.title} />
			<meta property="og:url" content={seo.url} />
			<meta property="og:description" content={seo.description} />
			<meta property="og:image" content={seo.image} />
			<meta property="og:image:height" content="600" />
			<meta property="og:image:width" content="600" />
			<meta property="og:type" content="website" />
			<meta property="og:image:alt" content={seo.description} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={seo.title} />
			<meta name="twitter:url" content={seo.url} />
			<meta name="twitter:description" content={seo.description} />
			<meta name="twitter:image" content={seo.image} />
			<meta name="twitter:image:alt" content={seo.description} />
			<meta name="twitter:creator" content={author} />
			<meta name="gatsby-theme" content="@Plukke/gatsby-theme-shopify" />
			{children}
		</Helmet>
	);
};

export default SEO;
