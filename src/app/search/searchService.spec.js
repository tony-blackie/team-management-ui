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

            SearchService.setWorkers(members);

            expect(SearchService.workers).toEqual([{name: 'Ross Gellar'}]);
        });

        it('should clear workers array if content is same as previous', function() {
            SearchService.setWorkers([{name: 'Ross Gellar'}]);

            expect(SearchService.workers).toEqual([{name: 'Ross Gellar'}]);

            SearchService.setWorkers([{name: 'Ross Gellar'}]);

            expect(SearchService.workers).toEqual([]);
        });

        it ('should get workers', function() {

        });
    });

})();