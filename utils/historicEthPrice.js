import { parse } from "csv-parse";
var fs = require('fs');

const DATE = 0;
const CLOSELASTPRICE = 1

export function getEthPriceByDate(historicdata, date) {
  for (const record of historicdata) {
    if(record[DATE] == date) return record[CLOSELASTPRICE]
  }
  return false
}

export async function loadCSVData(csvfilelocation) {

  const result = [];
  const parser = fs.createReadStream(csvfilelocation).pipe(parse())
  for await( const record of parser) {
    result.push(record);
  }
  return result

}