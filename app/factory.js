;(function() {

  angular
  .module('mtg-box')
  .factory('Card', [function () {
      return Card;
  }]);
  

  function Card(cardIO){
    if(typeof cardIO === "undefined")
      return false;

      this.name = cardIO.name;
      this.names = cardIO.names;
      this.manacost = cardIO.manacost;
      this.cmc = cardIO.cmc;
      this.colorIdentity = cardIO.colorIdentity;
      this.set = cardIO.set;
      this.types = cardIO.types;
      this.rarity = cardIO.rarity;
      this.text = cardIO.text;
      this.gameFormat = cardIO.gameFormat;
      this.power = cardIO.power;
      this.toughness = cardIO.toughness;
      this.multiverseid = cardIO.multiverseid;
      this.imageUrl = cardIO.imageUrl;
      this.originalText = cardIO.originalText;
      this.originalType = cardIO.originalType;
      this.mgtio_id = cardIO.id;
  }


  Card.prototype.isCreature = function(){
    return this.types.indexOf('Creature') > -1;
  };


})();
