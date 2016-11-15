(function() {

    describe('awesome-app.search module', function() {
        var $controller,
            $scope,
            SearchService;

        beforeEach(function() {
            module('awesome-app.search');

            inject(function(_$controller_, _SearchService_) {
                $controller = _$controller_;
                SearchService = _SearchService_;
            });

            $scope = {};
            $scope.$on = function() {};
            var controller = $controller('SearchCtrl', {$scope: $scope});
        });

        describe('search controller tests', function(){
           it('should call getTypeaheadData', function() {
               spyOn(SearchService, 'getTypeaheadData')
                   .and.returnValue({then: function() {}});

               $scope.getTypeaheadData();

               expect(SearchService.getTypeaheadData).toHaveBeenCalled();
           });
        });
    });
})();
