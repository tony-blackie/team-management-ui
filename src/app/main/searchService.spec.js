(function() {

    describe('SearchService', function() {
        var SearchService,
            $location;

        beforeEach(function() {
            module('awesome-app.main');

            inject(function(_SearchService_,
                            _$location_) {
                SearchService = _SearchService_;
                $location = _$location_;
            });
        });

        it('should save workers', function() {
            SearchService.workers = [];
            var members = [{name: 'Ross Gellar'}];

            SearchService.setWorkers(members);

            expect(SearchService.workers).toEqual([{name: 'Ross Gellar'}]);
        });

        it('should return true if array already has the item', function() {
            var array = [{name: 'Yukihiro Matsumoto'}];
            var item = {name: 'Yukihiro Matsumoto'};

            expect(SearchService.findItemInArray(item, array)).toBe(true);
        });

        it('should return false if array does not contain the item', function() {
            var array = [{name: 'Douglas Crockford'}];
            var item = {name: 'Yukihiro Matsumoto'};

            expect(SearchService.findItemInArray(item, array)).toBe(false);
        });

        it('should get teams', function() {
            SearchService.teams = [{name: 'someteam1'},{name: 'someteam2'}];
            expect(SearchService.getTeams()).toEqual([{name: 'someteam1'},{name: 'someteam2'}])
        });

        it('should set teams', function() {
            SearchService.teams = [];
            SearchService.setTeams([{name: 'someteam1'},{name: 'someteam2'}]);
            expect(SearchService.teams).toEqual([{name: 'someteam1'},{name: 'someteam2'}]);
        });

        it('should get tabs', function() {
            SearchService.tabs = [{url: '/url'}, {url: '/anotherUrl'}];
            expect(SearchService.getTabs()).toEqual([{url: '/url'}, {url: '/anotherUrl'}]);
        });

        // it('should set active tab depending on $location service', function () {
        //     var stub = sinon.stub($location, 'url').returns('/table-list');
        //
        //     expect(SearchService.tabs[0].isActive).toBe(false);
        //     expect(SearchService.tabs[1].isActive).toBe(true);
        // });
    });

})();