const DATE = 0;
const CLOSELASTPRICE = 1

export async function getEthPriceByDate(csvparser, date) {
  for await (const record of csvparser) {
    if(record[DATE] == date) return record[CLOSELASTPRICE]
  }
  return false
}