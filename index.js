'use strict'

// define variable
const gtQuery = require('./github')
const twQuery = require('./twitter')
const chalk = require('chalk')

// define constant variable
const filter = 'Football'

gtQuery(filter)
  .then(twQuery)
  .then(res => {
    // output data
    console.log(chalk.yellow(JSON.stringify(res, null, '  ')))
  })
  .catch(err => {
    // output error
    console.log(chalk.red('An error occured.', err))
  })
