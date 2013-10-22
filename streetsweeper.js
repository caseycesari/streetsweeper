(function(streetsweeper) {
  streetsweeper.version = '0.0.1';

  streetsweeper.sweep = function(addresses, params, callback) {
    var data;

    if(typeof addresses === 'string') { addresses = [addresses]; }

    for(var i=0; i < addresses.length; i++) {
      addresses[i] = toUpperCase(addresses[i]);
      addresses[i] = removeTrailingAndLeadingSpaces(addresses[i]);
      addresses[i] = removeExtraSpaces(addresses[i]);
      addresses[i] = removeHyphenSpaces(addresses[i]);
    }
    
    if(typeof addresses === 'object') { addresses = addresses[0]; }

    return addresses;

    /*if (callback && typeof callback === 'function') {
      callback(data);
    } else {
      return data;
    }*/
  };

  function toUpperCase(address) {
    return address.toUpperCase();
  }

  function removeExtraSpaces(address) {
    return address.replace(/ +/g, ' ');
  }

  function removeTrailingAndLeadingSpaces(address) {
    return address.trim();
  }

  function removeHyphenSpaces(address) {
    return address.replace(/(\d) - (\d)/, '$1-$2')
  }

}(typeof module == 'object' ? module.exports : window.streetsweeper = {}));