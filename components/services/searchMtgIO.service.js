/**
 * mtg-box
 * 
 */
 angular
 .module('mtg-box')
 .service('searchMtgIO', searchMtgIO);

 searchMtgIO.$inject = ['QueryService', 'CONSTANTS', '$q']; 

/**
 * Search on https://api.magicthegathering.io/ API factory.
 * @param  {Object} queryService QueryService instance
 * @param  {Object} CONSTANTS    Angular constants object
 * @param  {Object} $q           Angular promises helper
 * @return {Object}              searchMtgIO instance
 */
function searchMtgIO(queryService, CONSTANTS, $q) {
  this.cards = [];
  this.query = {};
  this.lastQuery = {};

  

  /**
   * Clear object to default settings
   * @return void
   */
  this.clear = function () {
    this.cards = [];
    this.query = {
      'name': '',
      'colorIdentity': [],
      'types': '',
      'page': '',
      'pageSize':'30'
    }; 
  }

  /**
   * search Magic cards on https://api.magicthegathering.io/ according to the query options 
   * @return {Promise} Promise with magic cards 
   */
  this.search = function(){
    var deferred = $q.defer();

    queryService.query('GET', CONSTANTS.MTG_API_URL + '/cards', this.query).then(
        function(data){
          this.cards = data.data.cards;
          return deferred.resolve(this.cards);
        },
        function (data) {
          return deferred.reject(data);
        }
    );


    return deferred.promise;
  }



  this.clear();
  return this;
}