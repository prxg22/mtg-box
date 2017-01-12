  /**
   * mtgBox
   */

   angular
   .module('mtg-box')
   .factory('MtgBox', MtgBox);

   MtgBox.$inject = ['QueryService', 'CONSTANTS', '$q', 'Card'];



  /**
   * search on MTG_BOX_API factory.
   * @param  {Object} queryService QueryService instance
   * @param  {Object} CONSTANTS    Angular constants object
   * @param  {Object} $q           Angular promises helper
   * @return {Object}              searchMtgBox instance
   */
   function MtgBox(queryService, CONSTANTS, $q, Card) {
    var self = this;



    return self;
  }