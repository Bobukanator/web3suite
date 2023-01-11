const NOPRICEDATAMESSAGE = "No price data for that date!"

export function getEthPriceByDate(historicdata, date) {
  for (const record of historicdata) {
    if (record.date == date) return record.price
  }
  return NOPRICEDATAMESSAGE
}