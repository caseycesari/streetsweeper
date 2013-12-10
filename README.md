# street-sweeper

Clean up street address data.

## Assumptions

`streetsweeper` assumes you have a list of U.S. addresses that are generally readable. It doesn't parse the components of an address, nor does it verify that the addresses are real USPS, certified addresses. It only cleans them up (removes extra spaces) and standardizes their format according to user specified options.

## Use Cases

- Joining two datasets by address. Note: Joining data by addresses is rarely a good idea (properties can have multiple addresses, addresses change, etc), but sometimes it's the only field you have to join two datasets.
- Displaying addresses in a consistent format on a map, graphic, etc.

## Installation

For Node.js: `$ npm install street-sweeper`.

To use the command line tool, use npm with the global flag: `$ npm install -g street-sweeper`

In the browser, include `streetsweeper.min.js`.

## Getting Started

- CSV with address column
- Format specification file. See sample-format.json

## Example Usage

- Browser TK
- Node TK
- Command line TK

## Tests

For node, `$ npm test`.

For the browser, visit `test/test.html`.

## Building

`$ grunt` will run the tests, then lint and minify `streetsweeper.js` to produce `streetsweeper.min.js`.
