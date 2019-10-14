'use strict'
// define variables
const request = require('request')
const Promise = require('promise')
require('dotenv').config()
// set number of result to 10 to avoid rate limiting
const numRow = process.env.NUMBER_OF_RESULTS

// define function
const gtQuery = (searchStr) => {
  if (!searchStr) {
    return new Promise((resolve) => resolve([]))
  }

  // initialise promise
  const promise = new Promise((resolve, reject) => {
    // define request data using github api documentation
    // @route   GET /search/repositories
    // @asc    GET All
    // @access  Public
    const options = {
      method: 'GET',
      url: 'https://api.github.com/search/repositories',
      qs: {
        q: searchStr,
        sort: 'stars',
        order: 'asc'
      },
      headers:
        {
          'User-Agent': 'custom',
          'cache-control': 'no-cache'
        }
    }

    // create request
    request(options, (err, res, body) => {
      if (err) {
        reject(err)
      }

      // returns the selected elements in an array, as a new array object and limit to 10 rows
      const searchResults = JSON.parse(body).items.slice(0, numRow) || []
      // create a map object
      const results = searchResults.map((project) => {
        // return json object {name, full_name, html_url, description}
        return {
          name: project.name,
          full_name: project.full_name,
          html_url: project.html_url,
          description: project.description
        }
      })

      resolve(results)
    })
  })

  // return promise
  return promise
}

// export
module.exports = gtQuery
