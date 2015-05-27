angular.module( 'services.config', ['lodash'])

.service('config', function(lodash) {

	// private vars here if needed

	return {
		siteName: 'Rackcat',
		heading: '',
		// no trailing slash!
		siteUrl: '/',
		apiUrl: '/api',

		currentUser: false
	};

});
