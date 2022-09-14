import {getEthPriceByDate} from "../utils/historicEthPrice"
import { parse } from "csv-parse";

var fs = require('fs');
const parser = fs.createReadStream('static/HistoricalDataETHPRICE.csv').pipe(parse());

test('test getPriceFromCSVByDay', async () => {

  expect(await getEthPriceByDate(parser,"8/19/2022")).toBe("1625.17")
  expect(await getEthPriceByDate(parser,"6/21/2022")).toBe("1088.17")
  expect(await getEthPriceByDate(parser,"6/21/1980")).toBe(false)
})