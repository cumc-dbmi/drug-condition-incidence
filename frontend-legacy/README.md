# Client

HTML5 front-end for incidence rate project

## Requirements (for development and build)
 * [node](https://nodejs.org/en/download/)
 * Grunt command line interface
		
		npm install -g grunt-cli

## Deployment
 * Install project dependencies (this will download and setup dependencies such as angular into a `node_modules` directory) 
		
		npm install

 * Create a file `config.json` (see `_config.json` for reference)

 * Create distributable (this bundles all static assets together in the `dist` directory)

        grunt dist

   _Note: this also starts an express server and watches for changes_

## Development
### Adding new dependencies
* Find the package you wish to install in the [node package manager](https://www.npmjs.com/), then run:
  `npm install <package> --save`
