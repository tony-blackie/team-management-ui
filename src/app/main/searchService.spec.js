(function() {

    describe('SearchService', function() {
        var SearchService;
        beforeEach(function() {
            module('awesome-app.main');

            inject(function(_SearchService_) {
                SearchService = _SearchService_;
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
    });

})();