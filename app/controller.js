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
    // 'controller as' syntax
    var self = this;
    $scope.query = angular.copy(searchMtgIO.query);

    $scope.search = function(){
      searchMtgIO.search().then(function (cards) {
        $scope.cards = cards;

        var card1 = new Card(cards[0]);
      });
    }
  }


})();