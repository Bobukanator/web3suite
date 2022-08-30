import { unWrap } from '~/utils/fetchUtils'

export default function (context, inject) {

  inject('dataApi', {
    getAssetsFromOpenSea, getEtherTransactions, getEtherBalance
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
}
