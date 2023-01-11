import { parse } from "csv-parse";
var fs = require('fs');
import { getEthPriceByDate } from "../utils/historicEthPrice"
import HISTORICJSONDATA from "../utils/HistoricalDataETHPRICE.json"

const DATE = 0;
const CLOSELASTPRICE = 4;

test('test getEthPriceByDate', async () => {

  //This TEST should only be used once in a while to refresh the historical price of ETH
  //I do not pay for the PRO APIs to get this data so instead load it from JSON
  //Go here: https://finance.yahoo.com/quote/ETH-USD/history?
  //Download the CSV and use excel to update HistoricalDataETHPRICE.csv 
  //uncomment the saveJSON , run the test and then recomment. 
  //LAST run was January 11th, 2023

  const historicdata = await loadCSVData('static/HistoricalDataETHPRICE.csv')
  expect(getEthPriceByDate(historicdata, "8/19/2022")).toBe("1612.99")
  expect(getEthPriceByDate(historicdata, "6/21/2022")).toBe("1124.82")
  expect(getEthPriceByDate(historicdata, "11/9/2017")).toBe("320.88")
  expect(getEthPriceByDate(historicdata, "6/21/1980")).toBe("No price data for that date!")
  //   saveJSONtoFile('utils/HistoricalDataETHPRICE.json', historicdata) //ONLY USE THIS WHEN UPDATED HISTORIC JSON DATA

})

test('test getEthPriceByDataWJSONloadedfromimport', () => {

  expect(getEthPriceByDate(HISTORICJSONDATA, "8/19/2022")).toBe("1612.99")
  expect(getEthPriceByDate(HISTORICJSONDATA, "6/21/2022")).toBe("1124.82")
  expect(getEthPriceByDate(HISTORICJSONDATA, "11/9/2017")).toBe("320.88")
  expect(getEthPriceByDate(HISTORICJSONDATA, "6/21/1980")).toBe("No price data for that date!")
})

async function loadCSVData(csvfilelocation) {

  const result = [];
  const parser = fs.createReadStream(csvfilelocation).pipe(parse())
  for await (const record of parser) {
    result.push(
      {
        "date": record[DATE],
        "price": record[CLOSELASTPRICE]
      });
  }
  return result

}


async function saveJSONtoFile(newFileNameWithPath, jsondata) {
  let data = JSON.stringify(jsondata)
  fs.writeFileSync(newFileNameWithPath, data)
}

