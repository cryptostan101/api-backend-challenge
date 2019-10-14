'use strict'

// define variable
const Twitter = require('twitter')
const Promise = require('promise')
require('dotenv').config()

const twQuery = (searchStr) => {
  const promises = []
  // if search string is empty, return blank data
  if (!searchStr) {
    return new Promise((resolve) => resolve([]))
  }

  // for each loop
  searchStr.forEach((searchStr, index) => {
    const project = searchStr
    const promise = new Promise((resolve, reject) => {
      // twitter api keys
      const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      })

      // define request data using twitter api documentation
      // @route   GET /search/tweets
      // @access  Public
      client.get('search/tweets', { q: project.full_name }, (err, tweets, response) => {
        // if error reject promise
        if (err) {
          reject(err)
        }

        project.tweets = tweets

        resolve(project)
      })
    })
    promises.push(promise)
  // }
  })

  // return promise
  return Promise.all(promises)
}

// export
module.exports = twQuery
