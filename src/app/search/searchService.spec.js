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
    });

})();