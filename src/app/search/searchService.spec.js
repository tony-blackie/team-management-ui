(function() {

    describe('SearchService', function() {
        var SearchService;
        beforeEach(function() {
            module('awesome-app.search');

            inject(function(_SearchService_) {
                SearchService = _SearchService_;
            });

        });

        it('should save workers', function() {
            SearchService.workers = [];
            var members = [{name: 'Ross Gellar'}];

            SearchService.setWorkers(2, members);

            expect(SearchService.workers).toEqual([{name: 'Ross Gellar'}]);
        });
    });

})();