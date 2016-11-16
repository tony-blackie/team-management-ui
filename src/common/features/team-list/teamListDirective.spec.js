'use strict';

describe('teamListDirective tests', function() {
    var $compile,
        $rootScope,
        $templateCache,
        element;
    beforeEach(function() {
        module('awesome-app.common.features.team-list');

        inject(function(_$compile_, _$rootScope_, _$templateCache_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;
        });

        $templateCache.put('../common/features/team-list/team-list.tpl.html', '' +
            '<input class="team-input" ng-model="teamName" placeholder="Add new team" type="text">' +
            '<button class="team-add-button" ng-click="addTeam()">+</button>' +
                '<div class="team-wrapper" ng-repeat="team in teams">' +
            '<div class="team-name" ng-click="makeActive($index)"></div>' +
            '</div>');

        element = $compile("<team-list></team-list>")($rootScope);
        $rootScope.$digest();
    });

    it('should call makeActive when element is clicked', function() {
        spyOn(scope, 'makeActive');

        element.find('.team-name')[0].click();

        expect(scope.makeActive).toHaveBeenCalled();
    });

    it('should make element inactive after click if it was active previously', function() {
        scope.teams = [
            {
                name: 'team1',
                members: [],
                isActive: true
            }
        ];

        element.find('.team-name')[0].click();

        expect(scope.teams[0].isActive).toBeFalsy();
    });

    it('should make other teams inactive if new one is clicked', function() {
        scope.teams = [
            {
                name: 'team1',
                members: [],
                isActive: true
            },
            {
                name: 'team2',
                members: [],
                isActive: false
            },
            {
                name: 'team3',
                members: [],
                isActive: false
            }
        ];

        element.find('.team-name')[1].click();

        expect(scope.teams[0].isActive).toBeFalsy();
        expect(scope.teams[1].isActive).toBeTruthy();
        expect(scope.teams[2].isActive).toBeFalsy();
    });

    it('should call addTeam on click', function() {
        spyOn(scope, 'addTeam');

        element.find('.team-add-button').click();

        expect(scope.addTeam).toHaveBeenCalled();
    });

    it('should pass validation and add one team', function() {
        scope.teams = [
            {
                name: 'team1',
                members: [],
                isActive: true
            },
            {
                name: 'team2',
                members: [],
                isActive: false
            }
        ];

        scope.teamName = "1337";

        element.find('.team-add-button').click();

        expect(scope.teams.length).toBe(3);
    });

    it('should not add extra team if teamName is empty', function() {
        scope.teams = [
            {
                name: 'team1',
                members: [],
                isActive: true
            },
            {
                name: 'team2',
                members: [],
                isActive: false
            }
        ];

        scope.teamName = "";

        element.find('.team-add-button').click();

        expect(scope.teams.length).toBe(2);
    });
});

