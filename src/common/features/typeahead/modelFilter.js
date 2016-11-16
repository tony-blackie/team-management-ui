(function() {
    "use strict";

    angular
        .module('awesome-app.search')
        .filter('model', model);

    function model() {
        return function(element, scope) {
            return //element.indexOf(scope.model) !== -1 ? element : false;
        }
    }
})();