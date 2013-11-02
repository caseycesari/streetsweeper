if (typeof window === 'undefined') {
  var expect = require('expect.js');
  var streetsweeper = require('../streetsweeper');
}

describe('streetsweeper', function() {

  describe('#sweep', function(){
    it('exists as a public function of streetsweeper', function(){
      expect(typeof streetsweeper.sweep).to.eql('function');
    });

    it('converts addresses to upper case', function() {
      expect(streetsweeper.sweep('123 main st')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123 Main St')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123 MAIN ST')).to.eql('123 MAIN ST');
    });

    it('removes trailing and leading spaces', function() {
      expect(streetsweeper.sweep(' 123  main  st ')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep(' 123      main  st ')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep(' 123    main   st ')).to.eql('123 MAIN ST');
    });

    it('removes extra (more than two spaces between words) spaces', function() {
      expect(streetsweeper.sweep('123  main  st')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123      main  st')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep(' 123    main   st')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('   123  main st   ')).to.eql('123 MAIN ST');
    });

    it('removes spaces between house numbers and hyphens', function() {
      expect(streetsweeper.sweep('123-25 main  st')).to.eql('123-25 MAIN ST');
      expect(streetsweeper.sweep('123 - 25  main  st')).to.eql('123-25 MAIN ST');
      expect(streetsweeper.sweep('123  -  25 main  st')).to.eql('123-25 MAIN ST');
    });

    it('removes commas', function() {
      expect(streetsweeper.sweep('123 Main St, ')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123 Main, St ')).to.eql('123 MAIN ST');
    });

    it('converts street directions to their abbreviated form', function() {
      expect(streetsweeper.sweep('123 north main st')).to.eql('123 N MAIN ST');
      expect(streetsweeper.sweep('123 south main st')).to.eql('123 S MAIN ST');
      expect(streetsweeper.sweep('123 east main st')).to.eql('123 E MAIN ST');
      expect(streetsweeper.sweep('123 west main st')).to.eql('123 W MAIN ST');
    });

    it('converts street types to their abbreviated form', function() {
      expect(streetsweeper.sweep('123 main street')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123 main boulevard')).to.eql('123 MAIN BLVD');
      expect(streetsweeper.sweep('123 main avenue')).to.eql('123 MAIN AVE');
    })

    it('removes characters from house numbers, except for s (subterranean) and r (rear)', function() {
      expect(streetsweeper.sweep('123r main street')).to.eql('123R MAIN ST');
      expect(streetsweeper.sweep('123s main street')).to.eql('123S MAIN ST');
      expect(streetsweeper.sweep('123a main street')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('123Z main street')).to.eql('123 MAIN ST');
      expect(streetsweeper.sweep('12Z main street')).to.eql('12 MAIN ST');
      expect(streetsweeper.sweep('1Z main street')).to.eql('1 MAIN ST');
      expect(streetsweeper.sweep('1R main street')).to.eql('1R MAIN ST');
    });
  });

});
