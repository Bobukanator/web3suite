import {getEthPriceByDate,loadCSVData} from "../utils/historicEthPrice"

test('test getPriceFromCSVByDay', async () => {

  const historicdata = await loadCSVData('static/HistoricalDataETHPRICE.csv')
  expect( getEthPriceByDate(historicdata,"8/19/2022")).toBe("1625.17")
  expect( getEthPriceByDate(historicdata,"6/21/2022")).toBe("1088.17")
  expect( getEthPriceByDate(historicdata,"6/21/1980")).toBe(false)
})

