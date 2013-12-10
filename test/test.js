if (typeof window === 'undefined') {
  var expect = require('expect.js');
  var streetsweeper = require('../streetsweeper');
}

describe('streetsweeper', function() {

  describe('#sweep', function(){
    var sampleOptions = {
      direction: "abbreviated",
      casing: "upper",
      streetType: "abbreviated",
    };

    it('exists as a public function of streetsweeper', function(){
      expect(typeof streetsweeper.sweep).to.eql('function');
    });

    // First, test basic cleaning functions
    it('removes trailing and leading spaces', function() {
      expect(streetsweeper.sweep(' 123  main  st ', sampleOptions)).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep(' 123      main  st ', sampleOptions)).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep(' 123    main   st ', sampleOptions)).to.eql('123 MAIN ST');
    });

    it('removes extra (more than two spaces between words) spaces', function() {
      expect(streetsweeper.sweep('123  main  st', sampleOptions)).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123      main  st', sampleOptions)).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep(' 123    main   st', sampleOptions)).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('   123  main st   ', sampleOptions)).to.eql('123 MAIN ST');
    });

    it('removes spaces between house numbers and hyphens', function() {
      expect(streetsweeper.sweep('123-25 main  st', sampleOptions)).to.eql('123-25 MAIN ST');
      expect(streetsweeper.sweep('123 - 25  main  st', sampleOptions)).to.eql('123-25 MAIN ST');
      expect(streetsweeper.sweep('123  -  25 main  st', sampleOptions)).to.eql('123-25 MAIN ST');
    });

    it('removes commas', function() {
      expect(streetsweeper.sweep('123 Main St, ', sampleOptions)).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123 Main, St ', sampleOptions)).to.eql('123 MAIN ST');
    });

    it('removes characters from house numbers, except for s (subterranean) and r (rear)', function() {
      expect(streetsweeper.sweep('123r main street', sampleOptions)).to.eql('123R MAIN ST');
      expect(streetsweeper.sweep('123s main street', sampleOptions)).to.eql('123S MAIN ST');
      expect(streetsweeper.sweep('123a main street', sampleOptions)).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123Z main street', sampleOptions)).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('12Z main street', sampleOptions)).to.eql('12 MAIN ST');
      expect(streetsweeper.sweep('1Z main street', sampleOptions)).to.eql('1 MAIN ST');
      expect(streetsweeper.sweep('1R main street', sampleOptions)).to.eql('1R MAIN ST');
    });

    // Test casing functions
    it('converts addresses to the specified case', function() {
      var upperOptions = {
        direction: "abbreviated",
        casing: "upper",
        streetType: "abbreviated",
      };

      expect(streetsweeper.sweep('123 test st', upperOptions)).to.eql('123 TEST ST');
      expect(streetsweeper.sweep('123 Main Main St', upperOptions)).to.eql('123 MAIN MAIN ST');
      expect(streetsweeper.sweep('123 MAIN ST', upperOptions)).to.eql('123 MAIN ST');

      var lowerOptions = {
        direction: "abbreviated",
        casing: "lower",
        streetType: "abbreviated",
      };

      expect(streetsweeper.sweep('123 main st', lowerOptions)).to.eql('123 main st');
      expect(streetsweeper.sweep('123 Main St', lowerOptions)).to.eql('123 main st');
      expect(streetsweeper.sweep('123 John smith ST', lowerOptions)).to.eql('123 john smith st');

      var titleOptions = {
        direction: "abbreviated",
        streetType: "abbreviated",
        casing: "title"
      };

      expect(streetsweeper.sweep('123 main st', titleOptions)).to.eql('123 Main St');
      expect(streetsweeper.sweep('123 Main St', titleOptions)).to.eql('123 Main St');
      expect(streetsweeper.sweep('123 john henry ST', titleOptions)).to.eql('123 John Henry St');
    });

    // Test street type functions
    it('converts street types to the specified form', function() {
      var abbreviatedOptions =  {
        direction: "abbreviated",
        streetType: "abbreviated",
        casing: "upper"
      };

      expect(streetsweeper.sweep('123 test street', abbreviatedOptions)).to.eql('123 TEST ST');
      expect(streetsweeper.sweep('123 main boulevard', abbreviatedOptions)).to.eql('123 MAIN BLVD');
      expect(streetsweeper.sweep('123 main avenue', abbreviatedOptions)).to.eql('123 MAIN AVE');

      var expandOptions =  {
        direction: "abbreviated",
        streetType: "full",
        casing: "title"
      };

      expect(streetsweeper.sweep('123 main street', expandOptions)).to.eql('123 Main Street');
      expect(streetsweeper.sweep('123 main blvd', expandOptions)).to.eql('123 Main Boulevard');
      expect(streetsweeper.sweep('123 main ave', expandOptions)).to.eql('123 Main Avenue');
    });

    // Test street direction functions
    it('converts street directions to their abbreviated form', function() {
      expect(streetsweeper.sweep('123 north main st', sampleOptions)).to.eql('123 N MAIN ST');
      expect(streetsweeper.sweep('123 south main st', sampleOptions)).to.eql('123 S MAIN ST');
      expect(streetsweeper.sweep('123 east main st', sampleOptions)).to.eql('123 E MAIN ST');
      expect(streetsweeper.sweep('123 west main st', sampleOptions)).to.eql('123 W MAIN ST');
    });

    // test callback
    // test command line
  });
});