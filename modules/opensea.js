import axios from 'axios'
import bodyParser from 'body-parser'
import url from 'url'

export default function () {

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.json());
    app.use('/api/getopenseaassets', getOpenSeaAssets);
  })

  async function getOpenSeaAssets(req, res) {

    const body = req.body;
    if (!body || !body.owner) {
      return rejectHitBadRequest(res)
    }

    const owner = body.owner;
    console.log("Owner is: " + owner)

    var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      /**'api-key': process.env.OPENSEAAPIKEY**/
    }

    var params = {
      "owner": owner,
      "order_direction": "desc",
      "offset": 0,
      "limit": 50
    }

    callOpenSeaTest(params, res);
  }

  async function callOpenSeaTest(params, res) {


    console.log("Calling with the following params:" + JSON.stringify(params))
    const response = await axios.get('https://testnets-api.opensea.io/api/v1/assets', { params });
    sendJSON(response.data, res);
  }

  function sendJSON(data, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  function rejectHitBadRequest(res) {
    res.statusCode = 400
    res.end()
  }
}