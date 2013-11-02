# street-sweeper

Clean up street address data.

## Assumptions

`streetsweeper` assumes you have a list of U.S. addresses that are generally readable. It doesn't parse the components of an address, nor does it verify that the addresses are real USPS, certified addresses. It only cleans them up (removes extra spaces) and standardizes their format according to a specified format.

## Use Cases

- Joining two datasets by address. Note: Joining data by addresses is rarely a good idea (properties can have multiple addresses, addresses change, etc), but sometimes it's the only field you have to join two datasets.
- Consistently formatting addresses for display on a map, graphic, etc.

## Installation

For node, use npm: `$ npm install street-sweeper`

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

`$ grunt ` will run test.js, then lint and minify `street-sweeper.js`.
