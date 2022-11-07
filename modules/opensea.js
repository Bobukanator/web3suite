import axios from 'axios'
import bodyParser from 'body-parser'

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
      'api-key': ''
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
    const responseTest = await axios.get('https://testnets-api.opensea.io/api/v1/assets', { params });
    //const responseProd = await axios.get('https://api.opensea.io/api/v1/assets', { params });
    const responseProd = { data: null }

    const response = { "test": responseTest.data, "prod": responseProd.data }

    sendJSON(response, res);
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