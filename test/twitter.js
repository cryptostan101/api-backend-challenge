'use strict'

const twQuery = require('../twitter')
const chai = require('chai')
const expect = chai.expect // Using Expect style

describe('searching twitter', () => {
  it('returns empty array if no search criteria provided', async () => {
    await twQuery('')
      .then(res => {
        expect(res).to.be.an('array')
        expect(res).to.eql([])
      })
  })

  it('returns an array of ojects with the specified keys', async () => {
    await twQuery([{
      full_name: 'ffbstats',
      html_url: 'https://github.com/glassbeat/ffbstats',
      name: 'glassbeat/ffbstats'
    }])
      .then(res => {
        expect(res).to.be.an('array')
        expect(res[0]).to.have.keys(['name', 'html_url', 'full_name', 'tweets'])
      })
  })
})
