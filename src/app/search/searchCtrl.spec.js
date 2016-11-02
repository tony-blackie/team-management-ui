(function() {

    describe('awesome-app.search module', function() {
        var $controller,
            $scope;

        beforeEach(function() {
            module('awesome-app.search');

            inject(function(_$controller_) {
                $controller = _$controller_;
            });

            $scope = {};
            var controller = $controller('SearchCtrl', {$scope: $scope});

            $scope.tabs = [
                {
                    text: 'Search',
                    isActive: true
                },
                {
                    text: 'List',
                    isActive: false
                }
            ]
        });

        describe('search controller tests', function(){

            it('should call deactivateAllTabs when activateTab is called', function() {
                spyOn($scope, 'deactivateAllTabs');

                $scope.activateTab(1);

               expect($scope.deactivateAllTabs).toHaveBeenCalled();
            });

            it('should deactivate all tabs when deactivateAllTabs is called', function() {
                $scope.deactivateAllTabs();

                expect($scope.tabs[0].isActive).toBe(false);
                expect($scope.tabs[1].isActive).toBe(false);
            });

            it('should activate tab on click', function() {
                $scope.activateTab(1);
                expect($scope.tabs).toEqual([{text: 'Search', isActive: false}, {text: 'List', isActive: true}]);
            });
        });

    });
})();
