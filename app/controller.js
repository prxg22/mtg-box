/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('mtg-box')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope','LocalStorage', 'QueryService', 'searchMtgIO', 'MtgBox', 'Card'];


  function MainController($scope, LocalStorage, QueryService, searchMtgIO, MtgBox, Card) {
    $scope.addbox = true; // show add box if true
    $scope.searchFilters = true; // show filters on add box if true
    
    // addbox search filters
    $scope.types = [];
    $scope.rarities = ['Common', 'Uncommon', 'Rare', 'Mythic Rare', 'Special', 'Basic Land'];
    $scope.sets = [];
    $scope.colors = [ 'W', 'U', 'B', 'R', 'G'];
    $scope.colorCheckbox = [false, false, false, false];
    $scope.dualColorCheckbox = [false, false, false, false];
    $scope.dualColor = ['', '', '', '', ''];

    $scope.query = angular.copy(searchMtgIO.query);

    /**
     * Set filters to the start settings
     * @return {void} 
     */
    function init(){
      searchMtgIO.getTypes().then(function(types){
        $scope.types = types;
      });

      searchMtgIO.getSets().then(function(sets){
        $scope.sets = sets;
      });
    }

    /**
     * Add or remove color from query
     * @param  {String} color color to be added or removed from query
     * @return {void}
     */
    $scope.toggleColor = function(){
      var queryColors = $scope.query.colorIdentity;
      var colors = $scope.colors;
      var colorCheckbox = $scope.colorCheckbox;
      var dualColorCheckbox = $scope.dualColorCheckbox;
      var dualColor = $scope.dualColor;

      queryColors = [];

      for(var i=0, j=colorCheckbox.length; i < j; i++){
        if (colorCheckbox[i] === true){
          queryColors.push(colors[i]);
        }
      }
      

      for(var i=0, j=dualColorCheckbox.length; i < j; i++){
        if (dualColorCheckbox[i] === true){
          queryColors.push(colors[i] + ',' + dualColor[i]);
        }
      }


      $scope.query.colorIdentity = queryColors;

      $scope.search();
    }

    $scope.search = function(){
      searchMtgIO.query = angular.copy($scope.query);
      searchMtgIO.query.pageSize = 300;
      searchMtgIO.query.page = 2;

      searchMtgIO.search().then(function (cards) {
        $scope.cards = cards.length > 0 ? cards : [];

        var card1 = new Card(cards[0]);
      });
    }

    init();
  }


})();