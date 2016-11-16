'use strict';

describe('awesome-app.list module', function() {
  var $scope = {};
  beforeEach(module('awesome-app.list'));

  describe('list controller', function(){
    it('should ....', inject(function($controller) {
      //spec body
      var aboutCtrl = $controller('ListCtrl', { $scope: $scope });
      expect(aboutCtrl).toBeDefined();
    }));
  });

});

