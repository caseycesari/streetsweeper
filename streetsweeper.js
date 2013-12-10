(function(streetsweeper) {
  streetsweeper.version = '0.0.5';

  var functions = {};

  // Basic cleaning functions
  functions.removeExtraSpaces = function(address) {
    return address.replace(/ +/g, ' ');
  };

  functions.removeCommas = function(address) {
    return address.replace(',','');
  };

  functions.removeTrailingAndLeadingSpaces = function(address) {
    return address.trim();
  };

  functions.removeHyphenSpaces = function(address) {
    return address.replace(/(\d) - (\d)/, '$1-$2');
  };

  functions.removeLettersNextToNumber = function(address) {
    return address.replace(/(\d+)([A-Q,T-Z,a-q,t-z])/, '$1'); // that regex string isn't going to fly for long
  };

  // Street direction functions
  functions.abbreviateStreetDirection = function(address) {
    var directionMap = {
      'NORTH': 'N',
      'SOUTH': 'S',
      'EAST': 'E',
      'WEST': 'W'
    };

    address = address.replace(/\bNORTH\b|\bSOUTH\b|\bEAST\b|\bWEST\b/gi, function(matched){
      matched = matched.toUpperCase();
      return directionMap[matched];
    });

    return address;
  };

  functions.expandStreetDirection = function(address) {
    var directionMap = {
      'N': 'NORTH',
      'S': 'SOUTH',
      'E': 'EAST',
      'W': 'WEST'
    };

    address = address.replace(/\bN\b|\bS\b|\bE\b|\bW\b/gi, function(matched){
      matched = matched.toUpperCase();
      return directionMap[matched];
    });

    return address;
  };

  // Street type functions
  functions.abbreviateStreetType = function(address) {
    var suffixMap = {
      'AVENUE': 'AVE',
      'STREET': 'ST',
      'BOULEVARD': 'BLVD',
      'PARKWAY': 'PKWY',
      'ROAD': 'RD'
    };

    address = address.replace(/\bAVENUE\b|\bSTREET\b|\bBOULEVARD\b|\bPARKWAY\b|\bROAD\b/gi, function(matched){
      matched = matched.toUpperCase();
      return suffixMap[matched];
    });

    return address;
  };

  functions.expandStreetType = function(address) {
    var suffixMap = {
      'AVE': 'AVENUE',
      'ST': 'STREET',
      'BLVD': 'BOULEVARD',
      'PKWY': 'PARKWAY',
      'RD': 'ROAD'
    };

    address = address.replace(/\bAVE\b|\bST\b|\bBLVD\b|\bPKWY\b|\bRD\b/gi, function(matched){
      matched = matched.toUpperCase();
      return suffixMap[matched];
    });

    return address;
  };

  // Casing functions
  functions.toUpperCase = function(address) {
    return address.toUpperCase();
  };

  functions.toLowerCase = function(address) {
    return address.toLowerCase();
  };

  functions.toTitleCase = function(address) {
    // from http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    // probably going to need some work to clean edge cases
    return address.replace(/\w\S*/g, function(txt){ 
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  streetsweeper.functionMap = {
    direction: {
      abbreviated: functions.abbreviateStreetDirection,
      full: functions.expandStreetDirection
    },
    streetType: {
      abbreviated: functions.abbreviateStreetType,
      full: functions.expandStreetType
    },
    casing: {
      upper: functions.toUpperCase,
      lower: functions.toLowerCase,
      title: functions.toTitleCase,
    }
  };

  functions.generateFunctionList = function(options) {
    // We always run addresses through these basic cleaning functions
    var functionList = [
      functions.removeExtraSpaces,
      functions.removeTrailingAndLeadingSpaces,
      functions.removeCommas,
      functions.removeHyphenSpaces,
      functions.removeLettersNextToNumber
    ];

    // And then we add functions to the cleaning list depending on what
    // the user specified
    for(var option in options) {
      if (options.hasOwnProperty(option)) {
        functionList.push(streetsweeper.functionMap[option][options[option]]);
      }
    }

    return functionList;
  };

  // The main (and one and only public) function. 
  streetsweeper.sweep = function(addresses, options, callback) {
    // If only a single address was passed in, make it the first element of array of addresses
    if(typeof addresses === 'string') { addresses = [addresses]; }

    // List of functions to apply to each address
    var functionList = functions.generateFunctionList(options);

    // Apply each function in functionList to each address
    for(var i=0; i < addresses.length; i++) {
      for(var x=0; x < functionList.length; x++) {
        addresses[i] = functionList[x](addresses[i]);
      }
    }
    
    // If we only have one address, convert it back to a string
    if(addresses.length === 1) { addresses = addresses[0]; }

    // Call the callback or just return the cleaned addresses
    if (callback && typeof callback === 'function') {
      callback(addresses);
    } else {
      return addresses;
    }
  };

}(typeof module == 'object' ? module.exports : window.streetsweeper = {}));