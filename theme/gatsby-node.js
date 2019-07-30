exports.createPages = ({ actions, reporter }) => {
	actions.createPage({
		path: '/',
		component: require.resolve('./src/templates/home.js'),
		context: {
			// apiData,
			// shopName,
			page: '/'
		}
	});
};
