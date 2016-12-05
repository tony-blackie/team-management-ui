(function() {

    describe('awesome-app.main module', function() {
        var $controller,
            $scope,
            SearchService,
            $rootScope,
            controller,
            $httpBackend,
            $location;

        beforeEach(function () {
            module('awesome-app.main');

            inject(function (_$controller_, _SearchService_, _$rootScope_, _$httpBackend_, _$location_) {
                $controller = _$controller_;
                SearchService = _SearchService_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $location = _$location_;
            });

            $scope = $rootScope.$new();
            $scope.$on = function () {
            };
            controller = $controller('MainCtrl', {$scope: $scope});
        });

        describe('main controller tests', function () {
            it('should set active tab depending on $location service', function () {
                var stub = sinon.stub($location, 'url').returns('/table-list');

                $scope.tabs = [
                    {
                        isActive: controller.determineCurrentTab('/search')
                    },
                    {
                        isActive: controller.determineCurrentTab('/table-list')
                    }
                ];

                expect($scope.tabs[0].isActive).toBe(false);
                expect($scope.tabs[1].isActive).toBe(true);
            });

            it('should call determineCurrentTab on initialize', function() {
                var spy = sinon.spy(controller, 'determineCurrentTab');

                controller.initialize();

                expect(spy.calledWith('/table-list')).toEqual(true);
                expect(spy.calledWith('/search')).toEqual(true);
            });

            it('should call initTabs when initialize is called', function() {
                var spy = sinon.spy(controller, 'initTabs');

                controller.initialize();

                expect(controller.initTabs.calledOnce).toBe(true);
            })
        });
    });
})();