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
   * @return {Object} Promise with magic cards 
   */
  this.search = function(){
    var deferred = $q.defer();
    var colorId = "";


    // set color identity as a string
    if(this.query.colorIdentity && this.query.colorIdentity.length > 0){
        angular.forEach(this.query.colorIdentity, function(color){
          colorId += color  + "|";
        });

        colorId = colorId.substring(0, colorId.length - 1);
    }

    this.query.colorIdentity = colorId;


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

  /**
   * Get all types names
   * @return {Object} Promise with array of types names
   */
  this.getTypes = function(){
    var deferred = $q.defer();

    queryService.query('GET', CONSTANTS.MTG_API_URL + '/types').then(
        function(data){
          var types = data.data.types;
          return deferred.resolve(types);
        },
        function (data) {
          return deferred.reject(data);
        }
    );

    return deferred.promise;
  }

  /**
   * Get all sets codes
   * @return {Object} promise with array of set codes
   */
  this.getSets = function(){
    var deferred = $q.defer();

    queryService.query('GET', CONSTANTS.MTG_API_URL + '/sets').then(
        function(data){
          var sets = [];
          var recievedSets = data.data.sets;

          for(i = 0, j=recievedSets.length; i < j ; i++){
              var set = {
                "name": recievedSets[i].name,
                "code": recievedSets[i].code
              }

              sets.push(set);
          }

          return deferred.resolve(sets);
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