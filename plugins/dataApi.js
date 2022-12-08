import { unWrap } from '~/utils/fetchUtils'

export default function (context, inject) {

  inject('dataApi', {
    getAssetsFromOpenSea, getEtherTransactions, getEtherBalance, getTokenBalance, getCurrentEthPrice, getHistoricEtherBalance, addToWaitList
  })

  async function getAssetsFromOpenSea(owner) {
    try {
      const response = await unWrap(await fetch(process.env.BASE_URL + "/api/getopenseaassets", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          owner
        })
      }))
      return response.json;

    } catch (error) {
      console.error(error)
    }
  }

  async function getEtherTransactions(owner) {
    try {
      const response = await unWrap(await fetch(process.env.BASE_URL + "/api/getethertransactions", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          owner
        })
      }))
      return response.json;

    } catch (error) {
      console.error(error)
    }
  }

  async function getEtherBalance(owner) {
    try {
      const response = await unWrap(await fetch(process.env.BASE_URL + "/api/getetherbalance", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          owner
        })
      }))
      return response.json;

    } catch (error) {
      console.error(error)
    }
  }

  async function getTokenBalance(owner, contractaddress) {
    try {
      const response = await unWrap(await fetch(process.env.BASE_URL + "/api/gettokenbalance", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          owner,
          contractaddress
        })
      }))
      return response.json;

    } catch (error) {
      console.error(error)
    }
  }

  async function getCurrentEthPrice() {
    try {
      const response = await unWrap(await fetch(process.env.BASE_URL + "/api/getcurrentethprice", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }))
      return response.json;

    } catch (error) {
      console.error(error)
    }
  }

  async function getHistoricEtherBalance(date) {
    try {
      const response = await unWrap(await fetch(process.env.BASE_URL + "/api/gethistoricethprice", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          date
        })
      }))
      return response.json;

    } catch (error) {
      console.error(error)
    }

  }

  async function addToWaitList(fname, lname, email, message) {
    try {
      const response = await unWrap(await fetch(process.env.BASE_URL + "/api/joinwaitlist", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          fname,
          lname,
          email,
          message
        })
      }))
      return response.json;

    } catch (error) {
      console.error(error)
    }
  }
}
