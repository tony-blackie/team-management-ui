(function() {

    describe('awesome-app.search module', function() {
        var $controller,
            $scope,
            SearchService,
            $rootScope,
            controller;

        beforeEach(function() {
            module('awesome-app.search');

            inject(function(_$controller_, _SearchService_, _$rootScope_) {
                $controller = _$controller_;
                SearchService = _SearchService_;
                $rootScope = _$rootScope_;
            });

            $scope = $rootScope.$new();
            $scope.$on = function() {};
            controller = $controller('SearchCtrl', {$scope: $scope});
        });

        describe('search controller tests', function(){
           it('should call getTypeaheadData', function() {
               spyOn(SearchService, 'getTypeaheadData')
                   .and.returnValue({then: function() {}});

               $scope.getTypeaheadData();

               expect(SearchService.getTypeaheadData).toHaveBeenCalled();
           });

            it('should emit event with teamMembers', function() {
                spyOn($scope, '$emit');
                $scope.teamMembers = [];

                $scope.refreshTeamList();

                expect($scope.$emit).toHaveBeenCalledWith('saveTeamMembers', $scope.teamMembers);
            });

            it('should remove teamMember', function() {
                $scope.teamMembers = [
                    {
                        name: 'Ross Gellar'
                    },
                    {
                        name: 'Chandler Bing'
                    }
                ];

                $scope.removeTeamMember(0);

                expect($scope.teamMembers).toEqual([{name: 'Chandler Bing'}]);
            });
        });
    });
})();
