import { unWrap } from '~/utils/fetchUtils'

export default function (context, inject) {

  inject('dataApi', {
    getAssetsFromOpenSea
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
}
