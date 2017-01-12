;(function() {


	/**
	 * Place to store API URL or any other constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
	 */
  angular
  	.module('mtg-box')
    .constant('CONSTANTS', {
      'API_URL': '',
      'MTG_API_URL': 'https://api.magicthegathering.io/v1/'
    });


})();
