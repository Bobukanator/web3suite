import axios from 'axios'
import bodyParser from 'body-parser'

export default function () {

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.json());
    app.use('/api/getethertransactions', getEtherTransactions);
    app.use('/api/getetherbalance', getEtherBalance);
  })

  async function getEtherTransactions(req, res) {

    const body = req.body;
    if (!body || !body.owner) {
      return rejectHitBadRequest(res)
    }

    const owner = body.owner;

    var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*'
    }

    var params = {
      "module": "account",
      "action": "txlist",
      "address": owner,
      "startblock": 0,
      "endblock": 99999999,
      "page": 1,
      "offset": 10,
      "sort": "asc",
      "apikey": process.env.ETHERSCAN_APIKEY
    }

    callEtherTransactions(params, res);
  }

  async function getEtherBalance(req, res) {
    const body = req.body;
    if (!body || !body.owner) {
      return rejectHitBadRequest(res)
    }

    const owner = body.owner;

    var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*'
    }

    var params = {
      "module": "account",
      "action": "balance",
      "address": owner,
      "tag": "latest",
      "apikey": process.env.ETHERSCAN_APIKEY
    }

    callEtherTransactions(params, res);
  }

  async function callEtherTransactions(params, res) {


    console.log("Calling with the following params:" + JSON.stringify(params))
    const responseProd = await axios.get('https://api.etherscan.io/api', { params });

    const response = responseProd.data

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