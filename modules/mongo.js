import axios from 'axios'
import bodyParser from 'body-parser'

export default function () {

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.json());
    app.use('/api/joinwaitlist', joinWaitList);
  })

  async function joinWaitList(req, res) {

    const body = req.body;
    if (!body || !body.fname || !body.lname || !body.email) {
      return rejectHitBadRequest(res)
    }

    var data = JSON.stringify({
      "collection": "EmailList",
      "database": "Web3SuiteDB",
      "dataSource": "BLawMongoCluster",
      "document": {
        "fname": body.fname,
        "lname": body.lname,
        "email": body.email,
        "message": body.message,
        "datesubmitted": new Date().toString()
      }
    })

    callTheDB(data, res);

  }

  async function callTheDB(data, res) {
    var url = 'https://data.mongodb-api.com/app/data-itrtd/endpoint/data/v1/action/insertOne';

    var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGOAPIKEY
    }

    const response = await axios.post(url, data, { headers });
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
