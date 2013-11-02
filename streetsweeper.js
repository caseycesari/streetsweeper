(function(streetsweeper) {
  streetsweeper.version = '0.0.1';

  streetsweeper.config = {
    "direction": {
      false: functions.removeStreetDirection,
      abbreviated: functions.abbreviateStreetDirection,
      full: functions.expandStreetDirections
    },
    "casing": {
      upper: functions.toUpperCase,
      lower: functions.toLowerCase,
      title: functions.toTitleCase,
    }
  }

  streetsweeper.sweep = function(addresses, params, callback) {
    var data;

    // TODO: - Read and validate format file
    //       - Dynamic add functions functionList based on format file

    // If only a single address was passed in, add it to an array
    if(typeof addresses === 'string') { addresses = [addresses]; }

    // List of functions to apply to each address
    functionList = [
      functions.removeExtraSpaces,
      functions.removeTrailingAndLeadingSpaces,
      functions.removeCommas,
      functions.toUpperCase,
      functions.removeHyphenSpaces,
      functions.abbreviateStreetSuffix,
      functions.abbreviateStreetDirection,
      functions.removeLettersNextToNumber
    ];

    for(var i=0; i < addresses.length; i++) {
      for(var x=0; x < functionList.length; x++) {
        addresses[i] = functionList[x](addresses[i]);
      }
    }
    
    if(typeof addresses === 'object') { addresses = addresses[0]; }

    return addresses;

    /*if (callback && typeof callback === 'function') {
      callback(data);
    } else {
      return data;
    }*/
  };

  var functions = {};

  functions.toUpperCase = function(address) {
    return address.toUpperCase();
  }

  functions.removeExtraSpaces = function(address) {
    return address.replace(/ +/g, ' ');
  }

  functions.removeCommas = function(address) {
    return address.replace(',','');
  }

  functions.removeTrailingAndLeadingSpaces = function(address) {
    return address.trim();
  }

  functions.removeHyphenSpaces = function(address) {
    return address.replace(/(\d) - (\d)/, '$1-$2');
  }

  functions.removeLettersNextToNumber = function(address) {
    return address.replace(/(\d+)([A-Q,T-Z,a-q,t-z])/, '$1'); // that regex string isn't going to fly for long
  }

  functions.abbreviateStreetSuffix = function(address) {
    var suffixMap = {
      'AVENUE': 'AVE',
      'STREET': 'ST',
      'BOULEVARD': 'BLVD',
      'PARKWAY': 'PKWY',
      'ROAD': 'RD'
    }

    address = address.replace(/AVENUE|STREET|BOULEVARD|PARKWAY|ROAD/gi, function(matched){
      return suffixMap[matched];
    });

    return address;
  }

  functions.abbreviateStreetDirection = function(address) {
    var directionMap = {
      'NORTH': 'N',
      'SOUTH': 'S',
      'EAST': 'E',
      'WEST': 'W'
    }

    address = address.replace(/NORTH|SOUTH|EAST|WEST/gi, function(matched){
      return directionMap[matched];
    });

    return address;
  }

  functions.noop = function() {}

}(typeof module == 'object' ? module.exports : window.streetsweeper = {}));