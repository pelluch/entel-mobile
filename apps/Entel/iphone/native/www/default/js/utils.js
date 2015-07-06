
/* JavaScript content from js/utils.js in folder common */

angular.module('starter.utils', []).
service('Utils', [ function() {
  this.getPrettyDate = function(utcDate) {
    if(_.isUndefined(utcDate) || _.isNull(utcDate))
      return "Fecha inválida";

    var date = new Date(utcDate);
    if(_.isNaN(date.getDay()))
      return "Fecha inválida";

    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  };

  this.getFormattedMoney = function(money) {
    if(_.isNumber(money) || _.isString(money)) {
      money = money + "";
      var formatted = "";
      var counter = 0;
      for(var i = money.length - 1; i >= 0; --i) {
        if(counter === 3) {
          formatted = "." + formatted;
          counter = 0;
        }
        formatted = money[i] + formatted;
        ++counter;
      }
      return "$" + formatted;
    }
    return "";
  };

  this.getRawMoney = function(formatted) {
    if(_.isString(formatted)) {
      return formatted.replace(/\D/g,'');
    }
    return "";
  };

}
]);
