import bodyParser from 'body-parser'

export default function () {

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.json());
    app.use('/api/test', testAPI);
  })

  async function testAPI(params, res) {

    console.log("TEST CALLED");

    const response = { "test": "SUCCESS" }

    sendJSON(response, res);
  }

  function sendJSON(data, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }
}