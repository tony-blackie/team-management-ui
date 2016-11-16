'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('awesome app', function() {

  browser.get('index.html');

  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });


  describe('home', function() {

    beforeEach(function() {
      browser.get('index.html#/home');
    });


    it('should render home when user navigates to /home', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Hello Awesome App.*/);
    });

  });


  describe('about', function() {

    beforeEach(function() {
      browser.get('index.html#/list');
    });


    it('should render list when user navigates to /list', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/About/);
    });

  });
});
