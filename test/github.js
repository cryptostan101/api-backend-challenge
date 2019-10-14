'use strict'

const gtQuery = require('../github')
const chai = require('chai')
const expect = chai.expect // Using Expect style

describe('searching github', () => {
  it('returns an array of ojects with the specified keys', async () => {
    await gtQuery('Football')
      .then((res) => {
        expect(res).to.be.an('array')

        expect(res[0]).to.have.keys(['name', 'html_url', 'full_name', 'description'])
      })
  })
})
