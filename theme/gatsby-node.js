const fs = require('fs');

exports.onPreBootstrap = ({ reporter }, options) => {
	const imagesPath = options.imagesPath || 'src/images';

	if (!fs.existsSync(imagesPath)) {
		reporter.info(`creating the ${imagesPath} directory`);
		fs.mkdirSync(imagesPath);
	}
};

exports.sourceNodes = ({ actions }) => {
	actions.createTypes(`
		type Section implements Node @dontInfer {
			id: ID!
			path: String!
      title: String!
			description: String!
			textButton: String
			image: String
			steps: [StepsJson]
		}

		"""
    Steps information
		"""

    type StepsJson implements Node @dontInfer {
			icon: String!
			title: String!
			description: String!
    }
	`);
};

exports.createPages = async ({ actions, graphql, reporter }, options) => {
	const { apiData, shopName } = options;

	actions.createPage({
		path: '/',
		component: require.resolve('./src/templates/home.js'),
		context: {
			apiData,
			shopName,
			page: '/'
		}
	});

	actions.createPage({
		path: '/about-us',
		component: require.resolve('./src/templates/aboutUs.js'),
		context: {
			page: '/about-us'
		}
	});

	actions.createPage({
		path: '/products',
		component: require.resolve('./src/templates/products.js')
	});

	// Create page for each product
	const result = await graphql(`
		query {
			allShopifyProduct {
				nodes {
					handle
				}
			}
		}
	`);

	if (result.errors) {
		reporter.panic('error loading events', reporter.errors);
		return;
	}

	const products = result.data.allShopifyProduct.nodes;

	products.map(({ handle }) => {
		actions.createPage({
			path: `/product/${handle}`,
			component: require.resolve('./src/templates/product'),
			context: {
				handle
			}
		});
	});
};
