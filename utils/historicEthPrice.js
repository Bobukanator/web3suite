import { parse } from "csv-parse";
var fs = require('fs');

const DATE = 0;
const CLOSELASTPRICE = 1
const NOPRICEDATAMESSAGE = "No price data for that date!"

export function getEthPriceByDate(historicdata, date) {
  for (const record of historicdata) {
    if(record.date == date) return record.price
  }
  return NOPRICEDATAMESSAGE
}

export async function loadCSVData(csvfilelocation) {

  const result = [];
  const parser = fs.createReadStream(csvfilelocation).pipe(parse())
  for await( const record of parser) {
    result.push(
      {
        "date":record[DATE],
        "price":record[CLOSELASTPRICE]
      });
  }
  return result

}

export async function saveJSONtoFile(newFileNameWithPath,jsondata){
  let data = JSON.stringify(jsondata)
  fs.writeFileSync(newFileNameWithPath,data)
}