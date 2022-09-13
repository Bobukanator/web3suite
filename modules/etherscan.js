import axios from 'axios'
import bodyParser from 'body-parser'

export default function () {

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.json());
    app.use('/api/getethertransactions', getEtherTransactions);
    app.use('/api/getetherbalance', getEtherBalance);
    app.use('/api/gettokenbalance', getTokenBalance);
    app.use('/api/getcurrentethprice', getCurrentEtherPrice);
  })

  async function getEtherTransactions(req, res) {

    const body = req.body;
    if (!body || !body.owner) {
      return rejectHitBadRequest(res)
    }

    var params = {
      "module": "account",
      "action": "txlist",
      "address":  body.owner,
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

    var params = {
      "module": "account",
      "action": "balance",
      "address": body.owner,
      "tag": "latest",
      "apikey": process.env.ETHERSCAN_APIKEY
    }

    callEtherTransactions(params, res);
  }

  async function getTokenBalance(req, res) {
    const body = req.body;
    if (!body || !body.owner || !body.contractaddress) {
      return rejectHitBadRequest(res)
    }

    var params = {
      "module": "account",
      "action": "tokenbalance",
      "contractaddress": body.contractaddress,
      "address": body.owner,
      "tag": "latest",
      "apikey": process.env.ETHERSCAN_APIKEY
    }

    callEtherTransactions(params, res);
  }

  async function getCurrentEtherPrice(req, res) {

    var params = {
      "module": "stats",
      "action": "ethprice",
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