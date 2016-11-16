(function() {

  describe('tableList Controller', function() {
    var $controller,
        $scope,
        controller,
        SearchServicex;

    beforeEach(function () {
      module('awesome-app.search');

      inject(function (_$controller_) {
        $controller = _$controller_;
      });

      $scope = {};
      $scope.$broadcast = function () {
      };
      $scope.$on = function () {
      };
      controller = $controller('TableListCtrl', {$scope: $scope});
    });

    it('should be defined', function() {
      expect(controller).toBeDefined();
    });
  });
})();
